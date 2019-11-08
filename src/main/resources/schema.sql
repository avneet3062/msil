
^;
create or replace PROCEDURE MSIL_VEH_AVAILABILITY(
    C OUT SYS_REFCURSOR,
    lcode IN VARCHAR2)
    AS
BEGIN
OPEN C FOR   
WITH T1 AS
  (SELECT EIM_REGN_NO,
    EIM_MESSAGE_RECIEVED_TIME,
    EIM_LATITUDE,
    EIM_LONGITUDE,
    eim_message_created_time,
    ROW_NUMBER() OVER (PARTITION BY EIM_REGN_NO ORDER BY eim_message_created_time DESC) RN
  FROM ETRK_IN_MSGS_TRANS
  WHERE EXISTS
    (SELECT 1
    FROM ETRK_MUL_NEWTRIP
    WHERE TRIP_REGN_NO = EIM_REGN_NO
    AND TRIP_STATUS    > 2
    ) -- changed here
     
  )
  ,
  T2 AS
  (
  SELECT T.*,L.LATITUDE,L.LONGITUDE,
    DISTANCE_CALCULATOR(EIM_LONGITUDE,EIM_LATITUDE,L.LONGITUDE, L.LATITUDE) as DIST ,-- added distance calculator function
    ROW_NUMBER() OVER (PARTITION BY EIM_REGN_NO,DISTANCE_CALCULATOR(EIM_LONGITUDE,EIM_LATITUDE,L.LONGITUDE, L.LATITUDE) 
                      ORDER BY EIM_REGN_NO ASC ,DISTANCE_CALCULATOR(EIM_LONGITUDE,EIM_LATITUDE,L.LONGITUDE, L.LATITUDE) ASC,
                      EIM_MESSAGE_CREATED_TIME DESC) R
  FROM T1 T
  CROSS JOIN MSIL_OEM_LOC_CODE_MST_L2_GJ L
  WHERE CODE=lcode
  )
  SELECT COUNT(*),
  CASE
     WHEN DIST<=30 AND DIST >=0
    THEN '0 TO 30'
    WHEN DIST<=60 AND DIST  >30
    THEN '30.1 TO 60'
    WHEN DIST<=150 AND DIST  >60
    THEN '60.1 TO 150'
    ELSE '>150'
  END "DISTANCE"
FROM T2 t
WHERE t.R=1 
GROUP BY
  CASE
    WHEN DIST<=30 AND DIST >=0
    THEN '0 TO 30'
    WHEN DIST<=60 AND DIST  >30
    THEN '30.1 TO 60'
    WHEN DIST<=150 AND DIST  >60
    THEN '60.1 TO 150'
    ELSE '>150'
  END
ORDER BY
  CASE
     WHEN DIST<=30 AND DIST >=0
    THEN '0 TO 30'
    WHEN DIST<=60 AND DIST  >30
    THEN '30.1 TO 60'
    WHEN DIST<=150 AND DIST  >60
    THEN '60.1 TO 150'
    ELSE '>150'
  END  ;
  
END MSIL_VEH_AVAILABILITY;

^; 
create or replace FUNCTION DISTANCE_CALCULATOR1
(nLastMsgLongitude1 in Float,nLastMsgLatitude1  in Float,NEW_EIM_LONGITUDE1  in Float,NEW_EIM_LATITUDE1 in Float)
RETURN FLOAT 
IS

    X1 Float;
    Y1 Float;
    Z1 Float;
    X2 Float;
    Y2 Float;
    Z2 Float;
    D  Float;
    THETA  Float;
    ER Float  := 6366.707;
    nLastMsgLatitude FLOAT;
    nLastMsgLongitude FLOAT;
    NEW_EIM_LATITUDE FLOAT;
    NEW_EIM_LONGITUDE FLOAT;

BEGIN

    NEW_EIM_LONGITUDE:= NEW_EIM_LONGITUDE1;
    NEW_EIM_LATITUDE:=  NEW_EIM_LATITUDE1;
    
    nLastMsgLatitude:=  nLastMsgLatitude1;
    nLastMsgLongitude :=nLastMsgLongitude1;
    nLastMsgLatitude:=(((22/7)*nLastMsgLatitude)/180);
    nLastMsgLongitude:=(((22/7)*nLastMsgLongitude)/180);
    
    NEW_EIM_LATITUDE:=(((22/7)*NEW_EIM_LATITUDE)/180);
    NEW_EIM_LONGITUDE:=(((22/7)*NEW_EIM_LONGITUDE)/180);
    nLastMsgLatitude:=((22/7)/2)-nLastMsgLatitude;
    NEW_EIM_LATITUDE:=((22/7)/2)-NEW_EIM_LATITUDE;
    
    X1:= ER*COS(nLastMsgLongitude)*SIN(nLastMsgLatitude);
    Y1:= ER*SIN(nLastMsgLatitude)*SIN(nLastMsgLongitude);
    Z1:= ER*COS(nLastMsgLatitude);
    
    X2:= ER*COS(NEW_EIM_LONGITUDE)*SIN(NEW_EIM_LATITUDE);
    Y2:= ER*SIN(NEW_EIM_LATITUDE)*SIN(NEW_EIM_LONGITUDE);
    Z2:= ER*COS(NEW_EIM_LATITUDE);
    
    D:=SQRT((X1-X2)*(X1-X2)+(Y1-Y2)*(Y1-Y2)+(Z1-Z2)*(Z1-Z2));
    
    THETA:=ACOS( ((ER*ER)+(ER*ER)-(D*D)) /(2*ER*ER)) ;

RETURN(ROUND((THETA*ER),3));

END DISTANCE_CALCULATOR;

^; 

create or replace PROCEDURE MSIL_TOTALTRIPS3 
( 
    C OUT SYS_REFCURSOR, 
    P_FROM_DATE IN DATE, 
    P_TO_DATE   IN DATE) 
AS  
BEGIN 
  OPEN C FOR SELECT SUM(X.CNT),"MONTH" FROM
  (SELECT EXTRACT(MONTH FROM TRIP_INV_DATE) "MONTH",COUNT(*) CNT 
  FROM ETRK_MUL_NEWTRIP 
  WHERE (TRIP_INV_DATE >= P_FROM_DATE 
  AND TRIP_INV_DATE    <= P_TO_DATE) 
  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') 
  GROUP BY EXTRACT(MONTH FROM TRIP_INV_DATE)  
  UNION 
  SELECT EXTRACT(MONTH FROM TRIP_INV_DATE) "MONTH",COUNT(*) CNT 
  FROM ETRK_MUL_NEWTRIP_HIST 
  WHERE (TRIP_INV_DATE >= P_FROM_DATE 
  AND TRIP_INV_DATE    <= P_TO_DATE) 
  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate) 
  GROUP BY EXTRACT(MONTH FROM TRIP_INV_DATE) 
  ) X GROUP BY "MONTH" ORDER BY "MONTH";
   
END MSIL_TOTALTRIPS3; 
 
^;
create or replace PROCEDURE MSIL_OPENTRIPS3  
( 
    C OUT SYS_REFCURSOR, 
    P_FROM IN DATE, 
    P_TO IN DATE, 
    PRESENT_PAST VARCHAR2) 
AS 
from_date VARCHAR2(20) := to_char(P_FROM,'dd-MM-YY') || '00:00:00'; 
end_date VARCHAR2(20) := to_char(P_TO,'dd-MM-YY') || '23:59:59'; 
BEGIN 
  IF PRESENT_PAST = 'PRESENT' THEN 
    OPEN C FOR SELECT COUNT(*) CNT FROM ETRK_MUL_NEWTRIP WHERE TRIP_INV_DATE >= TO_DATE('01-01-17','DD-MM-YY') AND 
TRIP_STATUS = 1 AND TRIP_ONWD_COMP_DATE IS NULL; --ahead cases 
  ELSE 
    OPEN C FOR SELECT SUM(X.CNT),"MONTH" FROM
    (SELECT COUNT(*) CNT, EXTRACT(MONTH FROM TRIP_INV_DATE) "MONTH" 
    FROM ETRK_MUL_NEWTRIP 
    WHERE TRIP_INV_DATE BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY 
HH24:MI:SS') 
    AND (TRIP_AUTO_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_AUTO_CLOSURE_DATE IS NULL) 
    AND (TRIP_COMPLETED_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_COMPLETED_DATE IS NULL) 
    AND (TRIP_ONWD_COMP_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_ONWD_COMP_DATE IS NULL) 
    AND (PROXY_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR PROXY_CLOSURE_DATE IS NULL) 
    AND TRIP_INV_DATE >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate) 
    GROUP BY EXTRACT(MONTH FROM TRIP_INV_DATE) 
    UNION 
     
    SELECT COUNT(*) CNT,EXTRACT(MONTH FROM TRIP_INV_DATE) "MONTH" 
    FROM ETRK_MUL_NEWTRIP_HIST 
    WHERE TRIP_INV_DATE BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY      
HH24:MI:SS') 
    AND (TRIP_AUTO_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_AUTO_CLOSURE_DATE IS NULL) 
    AND (TRIP_COMPLETED_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_COMPLETED_DATE IS NULL) 
    AND (TRIP_ONWD_COMP_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_ONWD_COMP_DATE IS NULL) 
    AND (PROXY_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR PROXY_CLOSURE_DATE IS NULL) 
    AND TRIP_INV_DATE >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate) 
    GROUP BY EXTRACT(MONTH FROM TRIP_INV_DATE) 
    ) X GROUP BY "MONTH" ORDER BY "MONTH";
  END IF; 
 
END MSIL_OPENTRIPS3; 

^; 
Create or replace PROCEDURE MSIL_CLOSEDTRIPS3 
( 
C OUT SYS_REFCURSOR, 
P_FROM_DATE IN DATE, 
P_TO_DATE IN DATE 
) 
AS 
BEGIN 
OPEN C FOR 
Select SUM(X.CNT), "Month" from (
SELECT COUNT(*) CNT,extract(month from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, 
TRIP_COMPLETED_DATE,     TRIP_AUTO_CLOSURE_DATE)) "Month" 
FROM ETRK_MUL_NEWTRIP 
WHERE 
COALESCE(TRIP_ONWD_COMP_DATE,PROXY_CLOSURE_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE)>=P_FROM_DATE AND 
COALESCE(TRIP_ONWD_COMP_DATE,PROXY_CLOSURE_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE)<=P_TO_DATE 
AND TRIP_INV_DATE >= TO_DATE('01-01-19','DD-MM-YY') 
Group by extract(month from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, 
TRIP_AUTO_CLOSURE_DATE)) 
UNION 
SELECT COUNT(*) CNT,extract(month from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, 
TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)) "Month" 
FROM ETRK_MUL_NEWTRIP_HIST 
WHERE 
COALESCE(TRIP_ONWD_COMP_DATE,PROXY_CLOSURE_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE)>=P_FROM_DATE 
AND 
COALESCE(TRIP_ONWD_COMP_DATE,PROXY_CLOSURE_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE)<=P_TO_DATE 
AND TRIP_INV_DATE >= TO_DATE('01-01-19','DD-MM-YY') 
Group by extract(month from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, 
TRIP_AUTO_CLOSURE_DATE)) 
 
 
)X GROUP BY "Month" order by "Month";
 
 END MSIL_CLOSEDTRIPS3; 

^; 
create or replace PROCEDURE MSIL_DELAYTRIPS3 
( 
    C OUT SYS_REFCURSOR, 
    P_FROM_DATE IN DATE, 
    P_TO_DATE IN DATE 
    )  
  AS  
 BEGIN 
  OPEN C FOR SELECT SUM(X.CNT),"MONTH" FROM
  (SELECT EXTRACT(MONTH FROM TRIP_INV_DATE) "MONTH",COUNT(*) CNT 
  FROM ETRK_MUL_NEWTRIP 
  WHERE (TRIP_INV_DATE >= P_FROM_DATE 
  AND TRIP_INV_DATE    <= P_TO_DATE) 
  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate) 
  AND TRIP_ETA_STATUS LIKE 'DELAY%' 
  GROUP BY EXTRACT(MONTH FROM TRIP_INV_DATE) 
  UNION 
   SELECT EXTRACT(MONTH FROM TRIP_INV_DATE) "MONTH",COUNT(*) CNT 
  FROM ETRK_MUL_NEWTRIP_HIST 
  WHERE (TRIP_INV_DATE >= P_FROM_DATE 
  AND TRIP_INV_DATE    <= P_TO_DATE) 
  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate) 
  AND TRIP_ETA_STATUS LIKE 'DELAY%' 
  GROUP BY EXTRACT(MONTH FROM TRIP_INV_DATE) 
  ) X  GROUP BY "MONTH" ORDER BY "MONTH";
   
   
END MSIL_DELAYTRIPS3; 

^; 
create or replace PROCEDURE MSIL_TOTALTRIPS4 
(  
    C OUT SYS_REFCURSOR,  
    P_FROM_DATE IN DATE,  
    P_TO_DATE   IN DATE)  
AS   
BEGIN  
  OPEN C FOR SELECT SUM(X.CNT),"YEAR" FROM
  (SELECT EXTRACT(YEAR FROM TRIP_INV_DATE) "YEAR",COUNT(*) CNT  
  FROM ETRK_MUL_NEWTRIP  
  WHERE (TRIP_INV_DATE >= P_FROM_DATE  
  AND TRIP_INV_DATE    <= P_TO_DATE)  
--  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY')  
  GROUP BY EXTRACT(YEAR FROM TRIP_INV_DATE)   
  UNION  
  SELECT EXTRACT(YEAR FROM TRIP_INV_DATE) "YEAR",COUNT(*) CNT  
  FROM ETRK_MUL_NEWTRIP_HIST  
  WHERE (TRIP_INV_DATE >= P_FROM_DATE  
  AND TRIP_INV_DATE    <= P_TO_DATE)  
--  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate)  
  GROUP BY EXTRACT(YEAR FROM TRIP_INV_DATE)  
  ) X GROUP BY "YEAR" ORDER BY "YEAR";
    
END MSIL_TOTALTRIPS4;

^; 


create or replace PROCEDURE MSIL_OPENTRIPS4 
(
    C OUT SYS_REFCURSOR,
    P_FROM IN DATE,
    P_TO IN DATE,
    PRESENT_PAST VARCHAR2)
AS
from_date VARCHAR2(20) := to_char(P_FROM,'dd-MM-YY') || '00:00:00';
end_date VARCHAR2(20) := to_char(P_TO,'dd-MM-YY') || '23:59:59';
BEGIN
  IF PRESENT_PAST = 'PRESENT' THEN
    OPEN C FOR SELECT COUNT(*) CNT FROM ETRK_MUL_NEWTRIP WHERE TRIP_INV_DATE >= TO_DATE('01-01-17','DD-MM-YY') AND TRIP_STATUS = 1 AND TRIP_ONWD_COMP_DATE IS NULL; --ahead cases
  ELSE
    OPEN C FOR SELECT SUM(X.CNT),"YEAR" FROM
    (SELECT COUNT(*) CNT, EXTRACT(YEAR FROM TRIP_INV_DATE) "YEAR"
    FROM ETRK_MUL_NEWTRIP
    WHERE TRIP_INV_DATE BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY HH24:MI:SS')
    AND (TRIP_AUTO_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_AUTO_CLOSURE_DATE IS NULL)
    AND (TRIP_COMPLETED_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_COMPLETED_DATE IS NULL)
    AND (TRIP_ONWD_COMP_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_ONWD_COMP_DATE IS NULL)
    AND (PROXY_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR PROXY_CLOSURE_DATE IS NULL)
   -- AND TRIP_INV_DATE >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate)
    GROUP BY EXTRACT(YEAR FROM TRIP_INV_DATE)
    UNION
    
    SELECT COUNT(*) CNT,EXTRACT(YEAR FROM TRIP_INV_DATE) "YEAR"
    FROM ETRK_MUL_NEWTRIP_HIST
    WHERE TRIP_INV_DATE BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY HH24:MI:SS')
    AND (TRIP_AUTO_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_AUTO_CLOSURE_DATE IS NULL)
    AND (TRIP_COMPLETED_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_COMPLETED_DATE IS NULL)
    AND (TRIP_ONWD_COMP_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR TRIP_ONWD_COMP_DATE IS NULL)
    AND (PROXY_CLOSURE_DATE > TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') OR PROXY_CLOSURE_DATE IS NULL)
   -- AND TRIP_INV_DATE >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate)
    GROUP BY EXTRACT(YEAR FROM TRIP_INV_DATE)
    ) X GROUP BY "YEAR" ORDER BY "YEAR";
  END IF;

  
  
END MSIL_OPENTRIPS4;


^; 
create or replace PROCEDURE MSIL_CLOSEDTRIPS4
(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE IN DATE
    ) 
AS 
BEGIN
 OPEN C FOR 
  Select SUM(X.CNT), "YEAR" from (
  SELECT COUNT(*) CNT,extract(YEAR from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)) "YEAR"
  FROM ETRK_MUL_NEWTRIP
  WHERE COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)>=P_FROM_DATE
  AND COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)<=P_TO_DATE
 -- AND TRIP_INV_DATE >= TO_DATE('01-01-19','DD-MM-YY')
  group by extract(YEAR from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE))
  
 
  UNION

  SELECT COUNT(*) CNT,extract(YEAR from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)) "YEAR" 
  FROM ETRK_MUL_NEWTRIP_HIST
  WHERE COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)>=P_FROM_DATE
  AND COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)<=P_TO_DATE
  --AND TRIP_INV_DATE >= TO_DATE('01-01-19','DD-MM-YY')
  group by extract(YEAR from coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE))
 

  )X GROUP BY "YEAR" order by "YEAR";
  
  END MSIL_CLOSEDTRIPS4;

  ^; 
  create or replace PROCEDURE MSIL_DELAYTRIPS4 

(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE IN DATE
    ) 
AS 
BEGIN
  OPEN C FOR SELECT SUM(X.CNT),"YEAR" FROM
  (SELECT EXTRACT(YEAR FROM TRIP_INV_DATE) "YEAR",COUNT(*) CNT
  FROM ETRK_MUL_NEWTRIP
  WHERE (TRIP_INV_DATE >= P_FROM_DATE
  AND TRIP_INV_DATE    <= P_TO_DATE)
 -- AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate)
  AND TRIP_ETA_STATUS LIKE 'DELAY%'
  GROUP BY EXTRACT(YEAR FROM TRIP_INV_DATE)
  
  UNION
  
  SELECT EXTRACT(YEAR FROM TRIP_INV_DATE) "YEAR",COUNT(*) CNT
  FROM ETRK_MUL_NEWTRIP_HIST
  WHERE (TRIP_INV_DATE >= P_FROM_DATE
  AND TRIP_INV_DATE    <= P_TO_DATE)
 -- AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate)
  AND TRIP_ETA_STATUS LIKE 'DELAY%'
  GROUP BY EXTRACT(YEAR FROM TRIP_INV_DATE)
  ) X GROUP BY "YEAR" ORDER BY "YEAR";
  
  

END MSIL_DELAYTRIPS4;

^;
create or replace PROCEDURE MSIL_LOCATIONS(C OUT SYS_REFCURSOR)
AS
BEGIN
 OPEN C FOR
 Select location,code from msil_oem_loc_code_mst_l2_gj;
END MSIL_LOCATIONS;

^;
create or replace
PROCEDURE MSIL_CONTIDRIVE_VIOLATIONS
(c OUT SYS_REFCURSOR, today IN DATE)
AS
from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';

BEGIN
OPEN c For
select count(*) count,cust_id
from msil_continious_driving_data
where cont_drive_msg BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY
HH24:MI:SS')
group by cust_id
order by cust_id;


END MSIL_CONTIDRIVE_VIOLATIONS;

^;

create or replace
PROCEDURE MSIL_FREEWHEELING_VIOLATIONS
(c OUT SYS_REFCURSOR, today IN DATE)
AS
from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
OPEN c FOR
with
T1 AS(
select a.*,b.cust_id,b.cust_name from msil_free_wheeling_log a
inner join msil_tavlalloem_rst_l2_gj b on a.regn_no=b.veh_no
)
select count(*) count,a.CUST_ID
from T1 a
where ert BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY
HH24:MI:SS')
group by a.cust_id
order by a.cust_id;


END MSIL_FREEWHEELING_VIOLATIONS;

^;


create or replace
PROCEDURE MSIL_HARSHBRAKING_VIOLATIONS
(c OUT SYS_REFCURSOR, today IN DATE)
AS
from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';

BEGIN
OPEN c FOR
select count(*) count,mam_customer_id
from msil_alert_messages
where mam_message_created_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY
HH24:MI:SS')
and mam_alert_type=2
group by mam_customer_id
order by mam_customer_id;
END MSIL_HARSHBRAKING_VIOLATIONS;

^;

create or replace
PROCEDURE MSIL_NIGHTDRIVE_VIOLATIONS
(c OUT SYS_REFCURSOR, today IN DATE)
AS
from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '03:59:59';

BEGIN
OPEN c FOR
select count(*) count,CUST_ID
from day_night_quick_rpt
where start_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY HH24:MI:SS')
group by cust_id
order by cust_id;


END MSIL_NIGHTDRIVE_VIOLATIONS;
^;
create or replace
PROCEDURE MSIL_OVERSPEED_VIOLATIONS
(c OUT SYS_REFCURSOR, today IN DATE)
AS
from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
OPEN c FOR
select count(*) count,cust_id
from temp_msil_overspeed_data
where overspeed_start_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY
HH24:MI:SS')
group by cust_id
order by cust_id;
END MSIL_OVERSPEED_VIOLATIONS;

^;
create or replace
PROCEDURE MSIL_RAPIDACC_VIOLATIONS
(c OUT SYS_REFCURSOR, today IN DATE)
AS
from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
OPEN c FOR
select count(*) count,mam_customer_id
from msil_alert_messages
where mam_message_created_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY
HH24:MI:SS')
and mam_alert_type=8
group by mam_customer_id
order by mam_customer_id;


END MSIL_RAPIDACC_VIOLATIONS;

^;

create or replace
PROCEDURE MSIL_STOPPAGE_VIOLATIONS
(c OUT SYS_REFCURSOR, today IN DATE)
AS
from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';

BEGIN
OPEN c FOR
select count(*) count,tmp_customer_id
from MSIL_STOPPAGE_RPT
where tmp_ert BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY
HH24:MI:SS')
and tmp_idle_time_hrs>=6 and tmp_idle_time_mins>=0 and tmp_idle_time_secs>0
group by tmp_customer_id
order by tmp_customer_id ;
END MSIL_STOPPAGE_VIOLATIONS;

^;
create or replace PROCEDURE msil_transporter (
    c OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN c FOR
    SELECT
        ecm_customer_id,
                   ecm_customer_name
               FROM
                   etrk_customer_mst
                   where ecm_customer_type='Transporter';

END msil_transporter;

^;
create or replace PROCEDURE MSIL_FLEET_UTILIZATION2
(
    c   OUT SYS_REFCURSOR,
    p_to_date     IN DATE,
    CUSTOMER_ID IN VARCHAR2
)
AS

   end_date    VARCHAR2(20) := TO_CHAR(p_to_date,'dd-MM-YY');

BEGIN
OPEN c FOR
With T1 AS(
select  count(evm_regn_no) as Total_Vehicles
from etrk_vehicle_mst
where evm_device_installed_on<=TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') and evm_customer_id=CUSTOMER_ID

),
T2 AS(
SELECT(X.trip_regn_no) FROM (
Select distinct trip_regn_no from etrk_mul_newtrip
    where TO_DATE(end_date,'DD-MM-YY HH24:MI:SS')
    between TRIP_INV_DATE AND TRIP_STD_TT_DATE AND TRIP_AUTO_CLOSURE_DATE IS NULL

    UNION
    Select distinct trip_regn_no from etrk_mul_newtrip_hist
    where TO_DATE(end_date,'DD-MM-YY HH24:MI:SS')
    between TRIP_INV_DATE AND TRIP_STD_TT_DATE AND TRIP_AUTO_CLOSURE_DATE IS NULL)X

) ,
T3 as(
Select count(t.trip_regn_no) as Utilized_Vehicles  from T2 t
inner join etrk_vehicle_mst v on t.trip_regn_no= v.evm_regn_no
where v.evm_customer_id=customer_id
)
select a.*,b.*,DECODE(A.total_vehicles,0,0,,round((b.utilized_vehicles/a.total_vehicles)*100,2)) "Percentage" from T1 a cross join T3 b ;

END MSIL_FLEET_UTILIZATION2;



^;
CREATE OR REPLACE
PROCEDURE msil_transporter
  (
    c OUT SYS_REFCURSOR )
AS
BEGIN
  OPEN c FOR SELECT ecm_customer_id, ecm_customer_name FROM etrk_customer_mst WHERE ecm_customer_type='Transporter' order by ecm_customer_name;
END msil_transporter;
^;
CREATE OR REPLACE
PROCEDURE MSIL_CONTIDRIVE2_VIOLATIONS
  (
    c OUT SYS_REFCURSOR,
    today       IN DATE,
    CUSTOMER_ID IN VARCHAR2)
AS
  from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
  OPEN c FOR SELECT COUNT(*) COUNT FROM msil_continious_driving_data WHERE cont_drive_msg BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY HH24:MI:SS') AND cust_id=CUSTOMER_ID;
END MSIL_CONTIDRIVE2_VIOLATIONS;
^;
CREATE OR REPLACE
PROCEDURE msil_freerun2_violations
  (
    c OUT SYS_REFCURSOR,
    today IN DATE,
    customer_id VARCHAR2 )
AS
  from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
  OPEN c FOR
WITH t1 AS
  (SELECT a.*,
    b.evm_customer_id
  FROM msil_free_wheeling_log a
  INNER JOIN etrk_vehicle_mst b
  ON a.regn_no=b.evm_regn_no
  )
SELECT COUNT(*) COUNT
FROM t1 a
WHERE ert BETWEEN TO_DATE(from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE(end_date,'DD-MM-YY HH24:MI:SS')
AND a.evm_customer_id = customer_id;
END msil_freerun2_violations;
^;
CREATE OR REPLACE
PROCEDURE MSIL_HARSHBRAKING2_VIOLATIONS
  (
    c OUT SYS_REFCURSOR,
    today IN DATE,
    CUSTOMER_ID VARCHAR2)
AS
  from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
  OPEN c FOR SELECT COUNT(*) COUNT FROM msil_alert_messages WHERE mam_message_created_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY

HH24:MI:SS') AND mam_alert_type=2 AND mam_customer_id=CUSTOMER_ID;
END MSIL_HARSHBRAKING2_VIOLATIONS;
^;
CREATE OR REPLACE
PROCEDURE MSIL_NIGHTDRIVE2_VIOLATIONS
  (
    c OUT SYS_REFCURSOR,
    today IN DATE,
    CUSTOMER_ID VARCHAR2)
AS
  from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '03:59:59';
BEGIN
  OPEN c FOR SELECT COUNT(*) COUNT FROM day_night_quick_rpt WHERE start_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY HH24:MI:SS') AND cust_id=CUSTOMER_ID;
END MSIL_NIGHTDRIVE2_VIOLATIONS;
^;
CREATE OR REPLACE
PROCEDURE MSIL_OVERSPEED2_VIOLATIONS
  (
    c OUT SYS_REFCURSOR,
    today IN DATE,
    CUSTOMER_ID VARCHAR2)
AS
  from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
  OPEN c FOR SELECT COUNT(*) COUNT FROM temp_msil_overspeed_data WHERE overspeed_start_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY HH24:MI:SS') AND cust_id=CUSTOMER_ID;
END MSIL_OVERSPEED2_VIOLATIONS;
^;
CREATE OR REPLACE
PROCEDURE MSIL_RAPIDACC2_VIOLATIONS
  (
    c OUT SYS_REFCURSOR,
    today IN DATE,
    CUSTOMER_ID VARCHAR2)
AS
  from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
  OPEN c FOR SELECT COUNT(*) COUNT FROM msil_alert_messages
  WHERE mam_message_created_time BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY

HH24:MI:SS') AND mam_alert_type=8 AND mam_customer_id=CUSTOMER_ID;
END MSIL_RAPIDACC2_VIOLATIONS;
^;
CREATE OR REPLACE
PROCEDURE MSIL_STOPPAGE2_VIOLATIONS
  (
    c OUT SYS_REFCURSOR,
    today IN DATE,
    CUSTOMER_ID VARCHAR2)
AS
  from_date VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '00:00:00';
  end_date  VARCHAR2(20) := TO_CHAR(today,'dd-MM-YY') || '23:59:59';
BEGIN
  OPEN c FOR SELECT COUNT(*) COUNT FROM MSIL_STOPPAGE_RPT WHERE tmp_ert BETWEEN TO_DATE( from_date,'DD-MM-YY HH24:MI:SS') AND TO_DATE( end_date,'DD-MM-YY

HH24:MI:SS') AND tmp_idle_time_hrs>=6 AND tmp_idle_time_mins>=0 AND tmp_idle_time_secs>0 AND tmp_customer_id=CUSTOMER_ID;
END MSIL_STOPPAGE2_VIOLATIONS;
^;

CREATE OR REPLACE PROCEDURE msil_fleet_utilization2 (
    c             OUT SYS_REFCURSOR,
    p_to_date     IN DATE,
    customer_id   IN VARCHAR2
) AS
    end_date   VARCHAR2(20) := TO_CHAR(p_to_date,'dd-MM-YY');
BEGIN
    OPEN c FOR WITH t1 AS (
                   SELECT
                       COUNT(evm_regn_no) AS total_vehicles
                   FROM
                       etrk_vehicle_mst
                   WHERE
                       evm_device_installed_on <= TO_DATE(end_date,'DD-MM-YY HH24:MI:SS')
                       AND evm_customer_id = customer_id
               ),t2 AS (
                   SELECT
                       ( x.trip_regn_no )
                   FROM
                       (
                           SELECT DISTINCT
                               trip_regn_no
                           FROM
                               etrk_mul_newtrip
                           WHERE
                               TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') >= trip_inv_date AND TO_DATE(end_date,'DD-MM-YY HH24:MI:SS')<=trip_std_tt_date

                           UNION
                           SELECT DISTINCT
                               trip_regn_no
                           FROM
                               etrk_mul_newtrip_hist
                           WHERE
                               TO_DATE(end_date,'DD-MM-YY HH24:MI:SS') >= trip_inv_date AND TO_DATE(end_date,'DD-MM-YY HH24:MI:SS')<=trip_std_tt_date

                       ) x
               ),t3 AS (
                   SELECT
                       COUNT(t.trip_regn_no) AS utilized_vehicles
                   FROM
                       t2 t
                       INNER JOIN etrk_vehicle_mst v ON t.trip_regn_no = v.evm_regn_no
                   WHERE
                       v.evm_customer_id = customer_id
               )
               SELECT
                   a.*,
                   b.*,
                   DECODE(a.total_vehicles,0,0,round( (b.utilized_vehicles / a.total_vehicles) * 100,2) ) "Percentage"
               FROM
                   t1 a
                   CROSS JOIN t3 b;

END msil_fleet_utilization2;



