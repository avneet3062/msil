
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




CREATE OR REPLACE
PROCEDURE msil_transporter
  (
    c OUT SYS_REFCURSOR )
AS
BEGIN
  OPEN c FOR SELECT ecm_customer_id, ecm_customer_name FROM etrk_customer_mst WHERE ecm_customer_type='Transporter' order by ecm_customer_name;
END msil_transporter;
^;
create or replace PROCEDURE MSIL_CONTIDRIVE3_VIOLATIONS
(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE   IN DATE,
    P_WISE IN VARCHAR2,
    CUSTOMER_ID IN VARCHAR2)
AS


sql_stmt VARCHAR2(3000);
BEGIN


SQL_STMT:= '    SELECT EXTRACT('||P_WISE||' FROM cont_drive_msg) "'||P_WISE||'",
                COUNT(*) CNT
                FROM msil_continious_driving_data
                WHERE cont_drive_msg >= '''||p_from_date ||'''
                AND cont_drive_msg    <= '''||p_to_date||'''
                AND cust_id='''||CUSTOMER_ID||'''

                GROUP BY EXTRACT('||P_WISE||' FROM cont_drive_msg)

                  ORDER BY "'||P_WISE||'"';

DBMS_OUTPUT.put_line(SQL_STMT);
OPEN C FOR SQL_STMT;
DBMS_OUTPUT.put_line(SQL_STMT);


END MSIL_CONTIDRIVE3_VIOLATIONS;

^;
create or replace PROCEDURE MSIL_FREERUN3_VIOLATIONS
(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE   IN DATE,
    P_WISE IN VARCHAR2,
    CUSTOMER_ID IN VARCHAR2)
AS


sql_stmt VARCHAR2(3000);
BEGIN
SQL_STMT:= '    with
                        T1 AS(
                        select a.*,b.evm_customer_id from msil_free_wheeling_log a
                        inner join etrk_vehicle_mst b on a.regn_no=b.evm_regn_no
                        )
                        select EXTRACT('||P_WISE||' FROM ert) "'||P_WISE||'",
                        count(*) count from T1 a
                        where ert>= '''||p_from_date ||''' AND ert <= '''||p_to_date||'''
                        AND a.evm_customer_id='''||CUSTOMER_ID||'''
                        group by EXTRACT('||P_WISE||' FROM ert)
                        order by "'||P_WISE||'"';

                        DBMS_OUTPUT.put_line(SQL_STMT);
                        OPEN C FOR SQL_STMT;
DBMS_OUTPUT.put_line(SQL_STMT);

END MSIL_FREERUN3_VIOLATIONS;

^;
create or replace PROCEDURE MSIL_HARSHBRAKING3_VIOLATIONS
(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE   IN DATE,
    P_WISE IN VARCHAR2,
    CUSTOMER_ID IN VARCHAR2
    )

AS
sql_stmt VARCHAR2(3000);
BEGIN
SQL_STMT:= '    SELECT EXTRACT('||P_WISE||' FROM mam_message_created_time) "'||P_WISE||'",
                COUNT(*) CNT
                FROM msil_alert_messages
                WHERE mam_message_created_time >= '''||p_from_date ||'''
                AND mam_message_created_time    <= '''||p_to_date||'''
                AND mam_alert_type = 2
                AND mam_customer_id='''||CUSTOMER_ID||'''

                GROUP BY EXTRACT('||P_WISE||' FROM mam_message_created_time)

                  ORDER BY "'||P_WISE||'"';

DBMS_OUTPUT.put_line(SQL_STMT);
OPEN C FOR SQL_STMT;
DBMS_OUTPUT.put_line(SQL_STMT);



END MSIL_HARSHBRAKING3_VIOLATIONS;

^;
create or replace PROCEDURE MSIL_NIGHTDRIVE3_VIOLATIONS
(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE   IN DATE,
    P_WISE IN VARCHAR2,
    CUSTOMER_ID IN VARCHAR2)
AS

sql_stmt VARCHAR2(3000);
BEGIN
SQL_STMT:= '    SELECT EXTRACT('||P_WISE||' FROM start_time) "'||P_WISE||'",
                COUNT(*) CNT
                FROM day_night_quick_rpt
                WHERE start_time >= '''||p_from_date ||'''
                AND start_time  <= '''||p_to_date||'''
                AND cust_id='''||CUSTOMER_ID||'''

                GROUP BY EXTRACT('||P_WISE||' FROM start_time)

                  ORDER BY "'||P_WISE||'"';

DBMS_OUTPUT.put_line(SQL_STMT);
OPEN C FOR SQL_STMT;
DBMS_OUTPUT.put_line(SQL_STMT);


END MSIL_NIGHTDRIVE3_VIOLATIONS;
^;

create or replace PROCEDURE MSIL_OVERSPEED3_VIOLATIONS
(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE   IN DATE,
    P_WISE IN VARCHAR2,
    CUSTOMER_ID IN VARCHAR2)

AS


sql_stmt VARCHAR2(3000);
BEGIN
SQL_STMT:= '    SELECT EXTRACT('||P_WISE||' FROM overspeed_start_time) "'||P_WISE||'",
                COUNT(*) CNT
                FROM temp_msil_overspeed_data
                WHERE overspeed_start_time >= '''||p_from_date ||'''
                AND overspeed_start_time    <= '''||p_to_date||'''
                AND cust_id='''||CUSTOMER_ID||'''
                GROUP BY EXTRACT('||P_WISE||' FROM overspeed_start_time)

                  ORDER BY "'||P_WISE||'"';

DBMS_OUTPUT.put_line(SQL_STMT);
OPEN C FOR SQL_STMT;
DBMS_OUTPUT.put_line(SQL_STMT);

    END MSIL_OVERSPEED3_VIOLATIONS;

    ^;
    create or replace PROCEDURE MSIL_RAPIDACC3_VIOLATIONS
    (
        C OUT SYS_REFCURSOR,
        P_FROM_DATE IN DATE,
        P_TO_DATE   IN DATE,
        P_WISE IN VARCHAR2,
        CUSTOMER_ID IN VARCHAR2
        )

    AS

    sql_stmt VARCHAR2(3000);
    BEGIN
    SQL_STMT:= '    SELECT EXTRACT('||P_WISE||' FROM mam_message_created_time) "'||P_WISE||'",
                    COUNT(*) CNT
                    FROM msil_alert_messages
                    WHERE mam_message_created_time >= '''||p_from_date ||'''
                    AND mam_message_created_time    <= '''||p_to_date||'''
                    AND mam_alert_type = 8
                    AND mam_customer_id='''||CUSTOMER_ID||'''
                    GROUP BY EXTRACT('||P_WISE||' FROM mam_message_created_time)

                      ORDER BY "'||P_WISE||'"';

    DBMS_OUTPUT.put_line(SQL_STMT);
    OPEN C FOR SQL_STMT;
    DBMS_OUTPUT.put_line(SQL_STMT);


    END MSIL_RAPIDACC3_VIOLATIONS;
    ^;
    create or replace PROCEDURE MSIL_STOPPAGE3_VIOLATIONS
    (
        C OUT SYS_REFCURSOR,
        P_FROM_DATE IN DATE,
        P_TO_DATE   IN DATE,
        P_WISE IN VARCHAR2,
        CUSTOMER_ID IN VARCHAR2)

    AS

    sql_stmt VARCHAR2(3000);
    BEGIN
    SQL_STMT:= '    SELECT EXTRACT('||P_WISE||' FROM tmp_ert) "'||P_WISE||'",
                    COUNT(*) CNT
                    FROM msil_stoppage_rpt
                    WHERE tmp_ert >= '''||p_from_date ||'''
                    AND tmp_ert    <= '''||p_to_date||'''
                    AND tmp_customer_id='''||CUSTOMER_ID||'''
                    GROUP BY EXTRACT('||P_WISE||' FROM tmp_ert)

                      ORDER BY "'||P_WISE||'"';

    DBMS_OUTPUT.put_line(SQL_STMT);
    OPEN C FOR SQL_STMT;
    DBMS_OUTPUT.put_line(SQL_STMT);


    END MSIL_STOPPAGE3_VIOLATIONS;
    ^;
 create or replace PROCEDURE msil_fleet_utilization2
 (
     c           OUT SYS_REFCURSOR,
     p_to_date     IN DATE,
     customer_id   IN VARCHAR2
 )
 AS
     from_date   VARCHAR2(20) := TO_CHAR(p_to_date,'dd-MM-YY');

     end_date   VARCHAR2(20) := TO_CHAR(p_to_date,'dd-MM-YY')
                                     || '11:59:59 PM';


 BEGIN
     OPEN c FOR WITH t1 AS (
                    SELECT
                        COUNT(evm_regn_no) AS total_vehicles
                    FROM
                        etrk_vehicle_mst
                    WHERE
                        evm_device_installed_on <= TO_DATE(end_date,'DD-MM-YY HH:MI:SS PM')
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
                            trip_inv_date  <=  TO_DATE(end_date,'DD-MM-YY HH:MI:SS PM') and
                            trip_std_tt_date  >=  TO_DATE(from_date,'DD-MM-YY HH24:MI:SS')
                            UNION
                            SELECT DISTINCT
                                trip_regn_no
                            FROM
                                etrk_mul_newtrip_hist
                            WHERE
                               trip_inv_date  <=  TO_DATE(end_date,'DD-MM-YY HH:MI:SS PM') and
                                trip_std_tt_date  >=  TO_DATE(from_date,'DD-MM-YY HH24:MI:SS')
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
 ^;
 CREATE OR REPLACE PROCEDURE msil_fleet_utilization5 (
     c             OUT SYS_REFCURSOR,
     p_from_date   IN DATE,
     p_to_date     IN DATE,
     customer_id   IN VARCHAR2
 ) AS

     from_date    VARCHAR2(20) := TO_CHAR(p_from_date,'dd-MM-YY');
     end_date     VARCHAR2(20) := TO_CHAR(p_to_date,'dd-MM-YY');
     first_day    NUMBER(20) := extract ( DAY FROM p_from_date );
     last_day     NUMBER(20) := extract ( DAY FROM p_to_date );
 BEGIN
     OPEN c FOR WITH t1 AS (
                    SELECT
                        x.trip_regn_no,
                        x.trip_inv_date,
                        x.trip_std_tt_date,
                        x."DIFF"
                    FROM
                        (
                            SELECT DISTINCT
                                trip_regn_no,
                                trip_inv_date,
                                trip_std_tt_date,
                                CASE
                                    WHEN trip_std_tt_date <= TO_DATE(end_date,'DD-MM-YY')
                                         AND trip_inv_date >= TO_DATE(from_date,'DD-MM-YY') THEN trunc(trip_std_tt_date - trip_inv_date
                                         + 1,0)
                                    WHEN trip_std_tt_date > TO_DATE(end_date,'DD-MM-YY')   THEN trunc(TO_DATE(end_date,'DD-MM-YY ') -
                                    trip_inv_date + 1,0)
                                    WHEN trip_inv_date < TO_DATE(from_date,'DD-MM-YY')
                                         AND trip_std_tt_date >= TO_DATE(from_date,'DD-MM-YY') THEN trunc(trip_std_tt_date - TO_DATE
                                         (from_date,'DD-MM-YY ') + 1,0)
                                END "DIFF"
                            FROM
                                etrk_mul_newtrip
                            WHERE
                                TO_DATE(from_date,'DD-MM-YY') > trip_inv_date
                                AND TO_DATE(from_date,'DD-MM-YY') <= trip_std_tt_date
                                OR trip_inv_date >= TO_DATE(from_date,'DD-MM-YY')
                                AND trip_inv_date <= TO_DATE(end_date,'DD-MM-YY')
                            GROUP BY
                                trip_regn_no,
                                trip_inv_date,
                                trip_std_tt_date
                            UNION
                            SELECT DISTINCT
                                trip_regn_no,
                                trip_inv_date,
                                trip_std_tt_date,
                                CASE
                                    WHEN trip_std_tt_date <= TO_DATE(end_date,'DD-MM-YY')
                                         AND trip_inv_date >= TO_DATE(from_date,'DD-MM-YY') THEN trunc(trip_std_tt_date - trip_inv_date
                                         + 1,0)
                                    WHEN trip_std_tt_date > TO_DATE(end_date,'DD-MM-YY ')   THEN trunc(TO_DATE(end_date,'DD-MM-YY') -
                                    trip_inv_date + 1,0)
                                    WHEN trip_inv_date < TO_DATE(from_date,'DD-MM-YY')
                                         AND trip_std_tt_date >= TO_DATE(from_date,'DD-MM-YY') THEN trunc(trip_std_tt_date - TO_DATE
                                         (from_date,'DD-MM-YY') + 1,0)
                                END "DIFF"
                            FROM
                                etrk_mul_newtrip_hist
                            WHERE
                                TO_DATE(from_date,'DD-MM-YY') > trip_inv_date
                                AND TO_DATE(from_date,'DD-MM-YY') <= trip_std_tt_date
                                OR trip_inv_date >= TO_DATE(from_date,'DD-MM-YY')
                                AND trip_inv_date <= TO_DATE(end_date,'DD-MM-YY')
                            GROUP BY
                                trip_regn_no,
                                trip_inv_date,
                                trip_std_tt_date
                        ) x
                ),t2 AS (
                    SELECT
                        a.*
                    FROM
                        t1 a
                        INNER JOIN etrk_vehicle_mst b ON a.trip_regn_no = b.evm_regn_no
                    WHERE
                        b.evm_customer_id = customer_id
                ),t3 AS (
                    SELECT
                        trip_regn_no,
                        trip_inv_date,
                        MAX(diff) AS difference
                    FROM
                        t2
                    GROUP BY
                        trip_regn_no,
                        trip_inv_date
                ),t4 AS (
                    SELECT
                        a.trip_regn_no,
                        a.difference
                    FROM
                        t3 a
                    GROUP BY
                        a.trip_regn_no,
                        a.difference
                ),t5 AS (
                    SELECT
                        SUM(difference) AS utilized
                    FROM
                        t4
                ),t6 AS (
                    SELECT
                        evm_regn_no,
                        evm_device_installed_on,
                        CASE
                            WHEN evm_device_installed_on < TO_DATE(from_date,'DD-MM-YY')   THEN TO_DATE(end_date,'DD-MM-YY') -
                            TO_DATE(from_date,'DD-MM-YY') + 1
                            ELSE TO_DATE(end_date,'DD-MM-YY') - evm_device_installed_on + 1
                        END "DIFFERENCE"
                    FROM
                        etrk_vehicle_mst
                    WHERE
                        evm_customer_id = CUSTOMER_ID AND evm_device_installed_on <= TO_DATE(end_date,'DD-MM-YY')
                    GROUP BY
                        evm_regn_no,
                        evm_device_installed_on,
                         CASE
                            WHEN evm_device_installed_on < TO_DATE(from_date,'DD-MM-YY')   THEN TO_DATE(end_date,'DD-MM-YY') -
                            TO_DATE(from_date,'DD-MM-YY') + 1
                            ELSE TO_DATE(end_date,'DD-MM-YY') - evm_device_installed_on + 1
                        END
                ),t7 AS (
                    SELECT
                        SUM(difference) AS all_days
                    FROM
                        t6
                )
                SELECT
                    a.all_days   "TOTAL",
                    CASE
                        WHEN b.utilized IS NULL THEN 0
                        ELSE b.utilized
                    END "UTILIZED_COUNT",
                    DECODE(a.all_days,0,0,round(CASE
                        WHEN b.utilized IS NULL THEN 0
                        ELSE b.utilized
                    END / a.all_days * 100,2)) "Percentage"
                FROM
                    t7 a
                    CROSS JOIN t5 b;

 END msil_fleet_utilization5;

 ^;
 create or replace
 PROCEDURE MSIL_CLOSEDTRIPS6
 (
     C OUT SYS_REFCURSOR,
     P_FROM_DATE IN DATE,
     P_TO_DATE   IN DATE,
     P_WISE VARCHAR2)
 AS

 sql_stmt VARCHAR2(3000);

 --P_FROM_DATE DATE :=TO_DATE( TO_CHAR(FIRST_DATE,'dd-MM-YY ') || '12:00:00 AM','DD-MM-YY HH12:MI:SS AM');
 --P_TO_DATE DATE := TO_DATE(TO_CHAR(SECOND_DATE,'dd-MM-YY ') || '11:59:59 PM','DD-MM-YY HH12:MI:SS PM');

 BEGIN
 DBMS_OUTPUT.PUT_LINE(P_FROM_DATE);
 DBMS_OUTPUT.PUT_LINE(P_TO_DATE);

 SQL_STMT:= 'SELECT SUM(X.CNT) CNT ,"'||P_WISE||'"
             FROM (SELECT EXTRACT('||P_WISE||' FROM coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)) "'||P_WISE||'",
                         COUNT(*) CNT
                 FROM ETRK_MUL_NEWTRIP
                 WHERE COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)>=  '''||P_FROM_DATE  ||'''
                 AND  COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)   <= '''||P_TO_DATE  ||'''
                GROUP BY EXTRACT('||P_WISE||' FROM coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE))

                 UNION
                 SELECT EXTRACT('||P_WISE||' FROM COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)) "'||P_WISE||'",
                         COUNT(*) CNT
                 FROM ETRK_MUL_NEWTRIP_HIST
                 WHERE COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE) >= '''||P_FROM_DATE  ||'''
                 AND COALESCE(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE)    <= '''||P_TO_DATE ||'''
                 GROUP BY EXTRACT('||P_WISE||' FROM coalesce(TRIP_ONWD_COMP_DATE, PROXY_CLOSURE_DATE, TRIP_COMPLETED_DATE, TRIP_AUTO_CLOSURE_DATE))
                 )X
                 GROUP BY "'||P_WISE||'"
                ORDER BY "'||P_WISE||'"';


                 DBMS_OUTPUT.put_line(SQL_STMT);
 OPEN C FOR SQL_STMT;
 DBMS_OUTPUT.put_line(SQL_STMT);




 END MSIL_CLOSEDTRIPS6;

 ^;
 create or replace
 PROCEDURE MSIL_DELAYTRIPS6

 (
     C OUT SYS_REFCURSOR,
     P_FROM_DATE IN DATE,
     P_TO_DATE   IN DATE,
     P_WISE VARCHAR2)
 AS
 sql_stmt VARCHAR2(3000);
 BEGIN


 SQL_STMT:= 'SELECT SUM(X.CNT) CNT, "'||P_WISE||'"
             FROM (SELECT EXTRACT('||P_WISE||' FROM TRIP_INV_DATE) "'||P_WISE||'",
                         COUNT(*) CNT
                 FROM ETRK_MUL_NEWTRIP
                 WHERE TRIP_INV_DATE >= '''||P_FROM_DATE ||'''
                 AND TRIP_INV_DATE    <= '''||P_TO_DATE||'''
                 AND TRIP_ETA_STATUS LIKE ''DELAY%''
                 GROUP BY EXTRACT('||P_WISE||' FROM TRIP_INV_DATE)
                 UNION
                 SELECT EXTRACT('||P_WISE||' FROM TRIP_INV_DATE) "'||P_WISE||'",
                         COUNT(*) CNT
                 FROM ETRK_MUL_NEWTRIP_HIST
                 WHERE TRIP_INV_DATE >= '''||P_FROM_DATE  ||'''
                 AND TRIP_INV_DATE    <= '''||P_TO_DATE ||'''
                 AND TRIP_ETA_STATUS LIKE ''DELAY%''
                 GROUP BY EXTRACT('||P_WISE||' FROM TRIP_INV_DATE)) X
         GROUP BY "'||P_WISE||'"
         ORDER BY "'||P_WISE||'"';

 DBMS_OUTPUT.put_line(SQL_STMT);
 OPEN C FOR SQL_STMT;
 DBMS_OUTPUT.put_line(SQL_STMT);
  --  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY')
  --  AND TRIP_INV_DATE    >= TO_DATE('01-01-17','DD-MM-YY') -- HARD CODED (Since data before the date is not accurate)


 END MSIL_DELAYTRIPS6;

^;

create or replace
PROCEDURE MSIL_OPENTRIPS6
(
    c              OUT SYS_REFCURSOR,
    p_end_date           IN DATE,
    present_past   VARCHAR2
) AS
end_date DATE:=p_end_date+1;
p_date VARCHAR2(20):=  TO_CHAR(end_date,'dd-MM-YY');

BEGIN
    IF present_past = 'PRESENT' THEN
        OPEN c FOR SELECT
                       COUNT(*) cnt
                   FROM
                       etrk_mul_newtrip
                   WHERE
                       trip_inv_date >= TO_DATE('01-01-17','DD-MM-YY')
                       AND trip_status = 1
                       AND trip_onwd_comp_date IS NULL;

    ELSE
    OPEN c FOR
    SELECT
           SUM(X.COUNT) "COUNT"
      FROM
           (Select count(trip_regn_no) "COUNT"  from   (SELECT
                   distinct trip_regn_no
               FROM
                   etrk_mul_newtrip
               WHERE
                   trip_inv_date < TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')

                   AND ( trip_auto_closure_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR trip_auto_closure_date IS NULL )
                   AND ( trip_completed_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR trip_completed_date IS NULL )
                   AND (( trip_onwd_comp_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR trip_onwd_comp_date IS NULL ) OR (trip_onwd_comp_date<=TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')) AND
                         TRIP_STATUS=3)
                   AND ( proxy_closure_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR proxy_closure_date IS NULL )
                   AND trip_inv_date >= TO_DATE('01-01-17','DD-MM-YY')
                   )

               UNION
               Select count(trip_regn_no) "COUNT"  from   (SELECT
                   distinct trip_regn_no
               FROM
                   etrk_mul_newtrip_hist
               WHERE
                   trip_inv_date < TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')

                   AND ( trip_auto_closure_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR trip_auto_closure_date IS NULL )
                   AND ( trip_completed_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR trip_completed_date IS NULL )
                   AND (( trip_onwd_comp_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR trip_onwd_comp_date IS NULL ) OR (trip_onwd_comp_date<=TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')) AND
                         TRIP_STATUS=3)
                   AND ( proxy_closure_date > TO_DATE(p_date,'DD-MM-YY HH24:MI:SS')
                         OR proxy_closure_date IS NULL )
                   AND trip_inv_date >= TO_DATE('01-01-17','DD-MM-YY')
                   )
                   )X;
    END IF;

END MSIL_OPENTRIPS6;

^;

create or replace
PROCEDURE MSIL_TOTALTRIPS6
(
    C OUT SYS_REFCURSOR,
    P_FROM_DATE IN DATE,
    P_TO_DATE   IN DATE,
    P_WISE VARCHAR2)
AS
sql_stmt VARCHAR2(3000);
BEGIN


SQL_STMT:=' SELECT "'||P_WISE||'",SUM(X.COUNT)"COUNT" FROM
  (SELECT extract('||P_WISE||' from COALESCE(TRIP_INV_DATE,TRIP_ONWD_COMP_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE)) "'||P_WISE||'",count(*) "COUNT"
  from etrk_mul_newtrip
  where COALESCE(TRIP_INV_DATE,TRIP_ONWD_COMP_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE) BETWEEN  '''||P_FROM_DATE||'''
  AND '''||P_TO_DATE||'''
  GROUP BY extract('||P_WISE||' from COALESCE(TRIP_INV_DATE,TRIP_ONWD_COMP_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE))

  UNION

 SELECT extract('||P_WISE||' from COALESCE(TRIP_INV_DATE,TRIP_ONWD_COMP_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE)) "'||P_WISE||'",count(*) "COUNT"
  from etrk_mul_newtrip
  where COALESCE(TRIP_INV_DATE,TRIP_ONWD_COMP_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE) BETWEEN  '''||P_FROM_DATE||'''
  AND '''||P_TO_DATE||'''
  GROUP BY extract('||P_WISE||' from COALESCE(TRIP_INV_DATE,TRIP_ONWD_COMP_DATE,TRIP_COMPLETED_DATE,TRIP_AUTO_CLOSURE_DATE))


  ) X
  GROUP BY "'||P_WISE||'"
  ORDER BY "'||P_WISE||'"';


DBMS_OUTPUT.put_line(SQL_STMT);
OPEN C FOR SQL_STMT;
DBMS_OUTPUT.put_line(SQL_STMT);
END MSIL_TOTALTRIPS6;

