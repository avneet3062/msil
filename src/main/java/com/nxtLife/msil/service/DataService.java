package com.nxtLife.msil.service;

import com.nxtLife.msil.enums.Duration;
import com.nxtLife.msil.enums.TripTypes;
import com.nxtLife.msil.enums.Violations;
import com.nxtLife.msil.ex.NotFoundException;
import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class DataService {

    @Value("${minYear}")
    private int minYear;

    @Autowired
    private TripRepository tripRepository;

    private static Logger logger = Logger.getLogger(DataService.class.getName());

    public List<TripMetrics> getTripsMetrics(Integer year, Integer month) {
        //TODO- check for year and month

        TripMetrics metrics = null;
        List<Trips> tripsList = new ArrayList<>();
        List<TripMetrics> finalList= new ArrayList<>();

        List<Trips> openTripsList = new ArrayList<>();
        List<Trips> closedTripsList = new ArrayList<>();
        List<Trips> totalTripsList = new ArrayList<>();

        if(year == null && month == null)
            finalList = getAlltripsYearly();


        if(year != null && month!=null)
            finalList = getTrips(year,month);

        if( year!= null && month == null){
            try {
                openTripsList = tripRepository.getOpenTrips(year,minYear);
                openTripsList.sort(Comparator.comparing(Trips::getMonth));
                closedTripsList = tripRepository.getClosedTrips(year,minYear);
                closedTripsList.sort(Comparator.comparing(Trips::getMonth));
//                tripsList.addAll(tripRepository.getClosedTrips(year));
                tripsList.addAll(tripRepository.getDelayedTrips(year,minYear));
//                tripsList.addAll(tripRepository.getTotalTrips(year, minYear));
//                tripsList.addAll(tripRepository.getOpenTrips(year));
                tripsList.addAll(openTripsList);
                tripsList.addAll(closedTripsList);
                totalTripsList = tripRepository.getTotalTrips(year, minYear);
                logger.info(openTripsList.size() + " "+closedTripsList.size()+" " + totalTripsList.size());
                logger.info(totalTripsList.toString());
                List<Trips> totalTrips =getTotalTrips(openTripsList, closedTripsList,totalTripsList);

                tripsList.addAll(totalTrips);
//                logger.info(tripsList.toString());
                tripsList.sort(Comparator.comparing(Trips::getMonth).thenComparing(Trips::getTripType));
//                logger.info(tripsList.size());
                finalList = makeViewForTripsMetrics(tripsList, year);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        return finalList;
    }

    public List<Trips> getTotalTrips(List<Trips> openTrips, List<Trips> closedTrips, List<Trips> total){
       int sizeOfOpenTrips = openTrips != null && !openTrips.isEmpty() ? openTrips.size() : 0;
       int sizeOfCLosedTrips = closedTrips != null && !closedTrips.isEmpty() ? closedTrips.size() : 0;
       int i = 0 , j = 0;
       List<Trips> totalTrips = new ArrayList<>();
        int month = LocalDate.now().getYear() == 2019 ? LocalDate.now().getMonth().getValue() : 12;
       for(int k =0; k<month ; k++){
           total.get(k).setCount(openTrips.get(k).getCount() + closedTrips.get(k).getCount());
       }
       return total;
    }

    public List<TripMetrics> makeViewForTripsMetrics(List<Trips> trips, int year) {
        TripMetrics metrics = null;
        int prevMonth = 0;
        List<Trips> tripInMonth = null;

        List<TripMetrics> finalList = new ArrayList<>();
        List<TripMetrics> list = null;
        TripMetrics trip = null;

        for(Trips t1 :trips){
            logger.info(t1.getMonth() +" "+t1.getTripType());
            if(prevMonth == t1.getMonth()){
                if(t1.getTripType().equals(TripTypes.Total.name()))
                    trip.setCount(trip.getCount() + t1.getCount());
                else tripInMonth.add(new Trips(t1.getTripType(),t1.getCount()));


            }
            else{
                if(tripInMonth != null && tripInMonth.size() < 3){
                    tripInMonth=getAllTrips(tripInMonth);
                }

                trip= new TripMetrics();
                trip.setMonth(t1.getMonth());
                trip.setCount(0L);
                tripInMonth = new ArrayList<>();
                if(t1.getTripType().equals(TripTypes.Total.name()))
                    trip.setCount(trip.getCount() + t1.getCount());
                else tripInMonth.add(new Trips(t1.getTripType(),t1.getCount()));
                trip.setTripsList(tripInMonth);

                prevMonth = t1.getMonth();
                finalList.add(trip);
            }
        }

        if(tripInMonth != null && tripInMonth.size() < 3){
            tripInMonth.addAll(getAllTrips(tripInMonth));
        }

        finalList.sort(Comparator.comparing(TripMetrics::getMonth));
//        if(year == LocalDate.now().getYear())
//            finalList = finalList;
//        else
//        finalList = finalList.size() < 12 ? getMonthsList(finalList,year) : finalList;
        return finalList;
    }

    public List<TripMetrics> getMonthsList(List<TripMetrics> metricsList, Integer year){
        TripMetrics trip= null ;
        List<Trips> tripsList= null;
        List<TripMetrics> finalList = new ArrayList<>();
        Integer month= LocalDate.now().getYear() == year.intValue() ? LocalDate.now().getMonthValue() : 12;

        if(metricsList != null && !metricsList.isEmpty())
        for(int j=1, i=0; j<=month; ){
            if(metricsList.get(i).getMonth().intValue() == j && i < metricsList.size()){
                i++;
                j++;
            }else{
                trip = new TripMetrics();
                trip.setMonth(j);
                trip.setCount(0L);
                tripsList = new ArrayList<>();
                tripsList = getAllTrips(null);
                trip.setTripsList(tripsList);
                metricsList.add(trip);

                j++;
            }
        }

     metricsList.sort(Comparator.comparing(TripMetrics::getMonth));
     return metricsList;
    }

    public List<Trips> getAllTrips(List<Trips> trips) {
        boolean notExits = false;
        if(trips == null){
            trips = new ArrayList<>();
            trips.add(new Trips(TripTypes.Open.name(),0L));
        }

        List<TripTypes> tripTypes = Arrays.asList(TripTypes.values()).stream().filter(t->!t.equals(TripTypes.Total)).collect(Collectors.toList());
        for (TripTypes t : tripTypes) {
            notExits = trips.stream().noneMatch(trip -> trip.getTripType().equals(t.name()));
            if (notExits)
                trips.add(new Trips(t.name(), 0l));
        }
        trips.sort(Comparator.comparing(Trips::getTripType));
        return trips;
    }

    public List<VehicleAvaliabiltyMetrics> getAllVehicleAvalable(String code) {

        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics = tripRepository.getVehiclesAvailable(code);
        return vehicleAvaliabiltyMetrics;
    }

    public List<Locations> getLocations() {
        return tripRepository.getLocations();
    }


    public List<TripMetrics> getAlltripsYearly() {
        List<Trips> tripsList = new ArrayList<>();
        List<TripMetrics> tripMetrics = null;
        List<Trips> openTripsList=new ArrayList<>();
        List<Trips> closedTripsList=new ArrayList<>();

        int minyear;
        try {
            openTripsList=tripRepository.getOpenTrips(minYear);
            tripsList.addAll(openTripsList);
            closedTripsList=tripRepository.getClosedTrips(minYear);
            tripsList.addAll(closedTripsList);
            tripsList.addAll(tripRepository.getDelayedTrips(minYear));
          //  tripsList.addAll(tripRepository.getTotaltrips(minYear));
            tripsList.addAll(this.getTotalTripsYearly(openTripsList,closedTripsList,minYear));

            tripsList.sort(Comparator.comparing(Trips::getYear).thenComparing(Trips::getTripType));

            tripMetrics = makeViewForTripsMetrics(tripsList);


        } catch (SQLException e) {
            e.printStackTrace();
        }


        return tripMetrics;
    }

    private List<Trips> getTotalTripsYearly(List<Trips> openTripsList, List<Trips> closedTripsList, int minYear) {
        openTripsList.sort(Comparator.comparing(Trips::getYear));
        closedTripsList.sort(Comparator.comparing(Trips::getYear));
        Trips t1=null;
        List<Trips> totalTrips=new ArrayList<>();
        int i =0, j=0;
        int sizeOfOpenList = openTripsList.size();
        int sizeOfClosedList = closedTripsList.size();
        if(sizeOfClosedList!=0 || sizeOfOpenList!=0)
        while( i<sizeOfOpenList || j < sizeOfClosedList){
            if( i<sizeOfOpenList && j<sizeOfClosedList && openTripsList.get(i).getYear() == closedTripsList.get(j).getYear()){
                totalTrips.add(new Trips(openTripsList.get(i).getYear(),TripTypes.Total.name(),openTripsList.get(i).getCount()+closedTripsList.get(i).getCount()));
                i++;
                j++;
            }else if(j == sizeOfClosedList  && i<sizeOfOpenList || openTripsList.get(i).getYear() < closedTripsList.get(j).getYear()){
                totalTrips.add(new Trips(openTripsList.get(i).getYear(),TripTypes.Total.name(), openTripsList.get(i).getCount()));
                i++;
            }else{
                totalTrips.add(new Trips(closedTripsList.get(j).getYear(),TripTypes.Total.name(), closedTripsList.get(j).getCount()));
                j++;
            }

        }

        return totalTrips;


    }

    public List<TripMetrics> makeViewForTripsMetrics(List<Trips> trips) {
        int prevYear = 0;
        TripMetrics metrics = new TripMetrics();
        List<Trips> tripsList = null;
        List<TripMetrics> finalTripList = new ArrayList<>();

        for (Trips t : trips) {
            if (t.getYear() == prevYear) {
                if(t.getTripType().equals(TripTypes.Total.name())){
                    metrics.setCount(metrics.getCount() + t.getCount());
                }
               else tripsList.add(new Trips(t.getTripType(), t.getCount()));
               logger.info("Added:"+ t.getTripType() +" "+ t.getCount());
            } else {
                if (tripsList != null && tripsList.size() < 3)
                    getAllTrips(tripsList);

                metrics = new TripMetrics();
                tripsList = new ArrayList<>();

                metrics.setYear(t.getYear());
                metrics.setCount(0L);
                if(t.getTripType().equals(TripTypes.Total.name()))
                    metrics.setCount(metrics.getCount() + t.getCount());
               else tripsList.add(new Trips(t.getTripType(), t.getCount()));
                metrics.setTripsList(tripsList);
                finalTripList.add(metrics);

                prevYear = t.getYear();
            }
        }
        return finalTripList;
    }

    public List<Transporters> getTransporters() {
        return tripRepository.getTransporters();
    }

    public List<ViolationsMetrics> getViolationsOfCust() {


        List<ViolationsCount> violationsCounts = new ArrayList<>();

        violationsCounts.addAll(tripRepository.getContinousDrivingViolations());
        violationsCounts.addAll(tripRepository.getFreeWheelingViolations());
        violationsCounts.addAll(tripRepository.getHarshBreakViolations());
        violationsCounts.addAll(tripRepository.getNightDrivingViolations());
        violationsCounts.addAll(tripRepository.getRapidAccelerationViolations());
        violationsCounts.addAll(tripRepository.getStoppageViolations());
        violationsCounts.addAll(tripRepository.getOverspeedViolations());

        violationsCounts.sort(Comparator.comparing(ViolationsCount::getCustId).thenComparing(ViolationsCount::getName));

        String prevCust = "";
        ViolationsMetrics metrics = null;
        List<ViolationsMetrics> finalList = new ArrayList<>();
        ViolationsCount count = null;
        List<ViolationsCount> countList = new ArrayList<>();
        for (ViolationsCount v : violationsCounts) {
            if (prevCust.equals(v.getCustId())) {
                count = new ViolationsCount(v.getName(), v.getCount());
                countList.add(count);

            } else {
                metrics = new ViolationsMetrics();
                metrics.setCustId(v.getCustId());
                count = new ViolationsCount(v.getName(), v.getCount());
                countList.add(count);
                metrics.setViolations(countList);
                finalList.add(metrics);
            }
            prevCust = v.getCustId();
        }
        return finalList;
    }


    public ViolationsMetrics getViolationsOfCust(String custId, Integer year, Integer month) {
        ViolationsMetrics metrics = new ViolationsMetrics(custId);
        Set<Integer> exist=new HashSet<>();

        String order = null;
        Calendar firstDay = Calendar.getInstance();
        Calendar lastDay = Calendar.getInstance();
        Date today = Calendar.getInstance().getTime();

        Duration type=null;
        int limit=0;
        if(year==null)
        { order = "year";
            Integer minYear=tripRepository.getMinimumYear();
            firstDay.set(2017, 0, 1);
            lastDay.setTime(today);
        }

       else if (year !=null&&month == null) {
            order = "month";
            firstDay.set(year, 0, 1);
            lastDay.set(year, 11, 31);
            metrics.setYear(year);
            if (lastDay.getTime().after(today)) {
                lastDay.setTime(today);
            }
       } else if (year!=null&&month!=null){
            order = "day";
            firstDay.set(year, month - 1, 1);
            lastDay.set(year, month - 1, firstDay.getActualMaximum(Calendar.DATE));
            metrics.setYear(year);
            metrics.setMonth(month);
            if (lastDay.getTime().after(today)) {
                lastDay.setTime(today);
            }
       }
       else
        {
            throw new NotFoundException("Year is not specified");
        }

        List<ViolationsCount> violationsCounts = new ArrayList<>();
        Date fromDate, toDate;
        fromDate = firstDay.getTime();
        toDate = lastDay.getTime();
        List<ViolationsCount> allViolations=new ArrayList<>();

        if(year!=null&&month!=null){
            limit=lastDay.get(Calendar.DATE);
            type=Duration.day;}
        else if(year==null){
            limit=lastDay.get(Calendar.YEAR);
             type=Duration.year;}
        else if(year!=null&&month==null)
        { limit=lastDay.get(Calendar.MONTH)+1;
            type=Duration.month;}
        violationsCounts=tripRepository.getContinousDrivingViolations2(custId, fromDate, toDate, order);
        allViolations.addAll(this.getAllViolations(violationsCounts,limit,Violations.ContinuousDriving,type));

        violationsCounts=tripRepository.getFreeWheelingViolations2(custId, fromDate, toDate, order);
        allViolations.addAll(this.getAllViolations(violationsCounts,limit,Violations.Freewheeling,type));
        violationsCounts=tripRepository.getHarshBreakViolations2(custId, fromDate, toDate, order);
        allViolations.addAll(this.getAllViolations(violationsCounts,limit,Violations.HarshBreaking,type));
        violationsCounts=tripRepository.getNightDrivingViolations2(custId, fromDate, toDate, order);
        allViolations.addAll(this.getAllViolations(violationsCounts,limit,Violations.NightDriving,type));
        violationsCounts=tripRepository.getRapidAccelerationViolations2(custId, fromDate, toDate, order);
        allViolations.addAll(this.getAllViolations(violationsCounts,limit,Violations.RapidAcceleration,type));
        violationsCounts=tripRepository.getStoppageViolations2(custId, fromDate, toDate, order);
        allViolations.addAll(this.getAllViolations(violationsCounts,limit,Violations.Stoppage,type));
        violationsCounts=tripRepository.getOverspeedViolations2(custId, fromDate, toDate, order);
        allViolations.addAll(this.getAllViolations(violationsCounts,limit,Violations.Overspeed,type));
        List<ViolationsMetrics> violationsMetricsList = null;
        List<ViolationsMetrics> finalList = new ArrayList<>();
        ViolationsCount violationsCount = null;
        List<ViolationsCount> violationsCountList = null;
        allViolations.sort(Comparator.comparing(ViolationsCount::getType));
            int prev = 0;
            ViolationsMetrics typewise = null;
            for (ViolationsCount violations : allViolations) {
                if (prev == violations.getType()) {
                    violationsCount = new ViolationsCount(violations.getName(), violations.getCount());
                    violationsCountList.add(violationsCount);
                } else {
                    typewise=new ViolationsMetrics();
                 if(type.equals(Duration.year))
                     typewise.setYear(violations.getType());
                   else if(type.equals(Duration.month)){
                       typewise.setMonth(violations.getType()); }
                   else {
                     typewise.setDay(violations.getType());
                   typewise.setDate(Date.from(LocalDate.of(year,month,violations.getType()).atStartOfDay(ZoneId.systemDefault()).toInstant()));
                   }
                   violationsCount = new ViolationsCount(violations.getName(), violations.getCount());
                    violationsCountList = new ArrayList<>();
                    violationsCountList.add(violationsCount);
                    typewise.setViolations(violationsCountList);
                    finalList.add(typewise);
                    metrics.setMetricsList(finalList);
                }
                prev = violations.getType();
            }



        return metrics;
    }

    public FleetUtilizedMetrics getFleetUtilization(Integer year, Integer month, String custId) {
        FleetUtilizedMetrics metrics = new FleetUtilizedMetrics(custId);
        Integer day=0;
        if(year!=null&&month!=null) {
            List<FleetUtilized> list = new ArrayList<>();
            Calendar firstDay = Calendar.getInstance();
            Calendar lastDay = Calendar.getInstance();
            Date today = Calendar.getInstance().getTime();
            firstDay.set(year, month - 1, 1);
            lastDay.set(year, month - 1, firstDay.getActualMaximum(Calendar.DATE));
            lastDay.add(Calendar.DATE, 1);
            if(today.before(lastDay.getTime()))
                lastDay.setTime(today);
            Date d;
            while (firstDay.before(lastDay)) {
                d = firstDay.getTime();
                day=firstDay.get(Calendar.DATE);

                list.add(tripRepository.getFleetUtilization(d, day,custId));
                firstDay.add(Calendar.DATE, 1);
            }
            list.sort(Comparator.comparing(FleetUtilized::getDate));

            metrics.setYear(year);
            metrics.setMonth(month);
            metrics.setList(list);
        }
        else{
            metrics=this.getFleetUtilization(year,custId);
        }
        return metrics;
    }



    public FleetUtilizedMetrics getFleetUtilization(Integer year, String custId) {
        FleetUtilizedMetrics metrics = new FleetUtilizedMetrics(custId);
        List<FleetUtilized> list = new ArrayList<>();
        Date today = Calendar.getInstance().getTime();
        Integer currentYear = Calendar.getInstance().get(Calendar.YEAR);
        Calendar firstDay = Calendar.getInstance();
        Calendar lastDay = Calendar.getInstance();
        int limit=0;
        if(year==null)
        {
            Integer minYear=tripRepository.getMinimumYear();
            firstDay.set(2017, 0, 1);
            lastDay.setTime(today);
            limit=lastDay.get(Calendar.YEAR);
            for(int i=2017;i<=limit;i++) {
                firstDay.set(i,1,1,0,0,0);
                lastDay.set(i,12,31,0,0,0);
                list.add(tripRepository.getFleetUtilization(i,firstDay.getTime(),lastDay.getTime(), custId,Duration.year));
            }
        }
        else {
            if (currentYear.equals(year))
                limit = Calendar.getInstance().get(Calendar.MONTH) + 1;
            else {
                limit = 12;
            }
            for (int i = 1; i <= limit; i++) {
                firstDay.set(year, i-1, 1, 0, 0, 0);
                lastDay.set(year, i-1, firstDay.getActualMaximum(Calendar.DATE), 0, 0, 0);
                list.add(tripRepository.getFleetUtilization(i, firstDay.getTime(), lastDay.getTime(), custId,Duration.month));

            }
            list.sort(Comparator.comparing(FleetUtilized::getMonth));
            metrics.setYear(year);
        }
        metrics.setList(list);

        return metrics;


    }


    public List<ViolationsCount> getAllViolations(List<ViolationsCount> violations,int limit,Violations name, Duration type) {
        int i=1;
      //  Integer minYear=tripRepository.getMinimumYear();
        if(type.equals(Duration.year))
           i=2017;
        ViolationsCount violationsCount = null;
        for( int j= 0; i<=limit;  ){
            if(!violations.isEmpty() && j< violations.size()) {
                violationsCount = violations.get(j);
                if ((type.equals(Duration.year) ||type.equals(Duration.month)||type.equals(Duration.day))&& violationsCount.getType() == i) {
                    i++;
                    j++;
                } else {
                    violations.add(new ViolationsCount(name, 0, i));
                    i++;
                }
            }else{
                violations.add(new ViolationsCount(name,0,i));
                i++;
            }
        }
        return violations;
    }

    public List<TripMetrics> getTrips(Integer year,Integer month){

        List<Trips> tripsList = new ArrayList<>();
        int limit;
        List<TripMetrics> tripMetrics = new ArrayList<>();
        List<Trips> openTripsList=new ArrayList<>();
        List<Trips> closedTripsList=new ArrayList<>();

        LocalDate first = LocalDate.of(year,month,1);
        LocalDate end = first.with(TemporalAdjusters.lastDayOfMonth());
        limit=end.getDayOfMonth();
        if(LocalDateTime.now().getMonth().getValue()==month.intValue())
            limit=LocalDateTime.now().getDayOfMonth();
        if(year == null || month== null)
            throw new NotFoundException("Year and Month are Mandatory");
        List<Trips> allTrips=new ArrayList<>();

            openTripsList=tripRepository.getOpenTrips(year,month,minYear);
         //   openTripsList=(addDays(openTripsList,limit,TripTypes.Open));
            allTrips.addAll(openTripsList);
            closedTripsList=tripRepository.getClosedTrips(year, month,minYear);
         //   closedTripsList=(addDays(tripsList,limit,TripTypes.Closed));
            allTrips.addAll(closedTripsList);
            tripsList=this.getTotalTripsDaily(openTripsList,closedTripsList,limit);
            allTrips.addAll(tripsList);
            tripsList=tripRepository.getDelayedTrips(year,month,minYear);
      //      allTrips.addAll(addDays(tripsList,limit,TripTypes.Delayed));
        allTrips.addAll(tripsList);


            allTrips.sort(Comparator.comparing(Trips::getDay).thenComparing(Trips::getTripType));

        Integer prev = 0;
        List<TripMetrics> finalMetricsList = new ArrayList<>();
        TripMetrics metrics = null;
        List<Trips> trips= null;
        for(Trips t :allTrips){
            if(prev.equals(t.getDay())){
                if(t.getTripType().equals(TripTypes.Total.name()))
                    metrics.setCount(t.getCount());
                    else trips.add(new Trips(t.getTripType(),t.getCount()));
            }else{
                metrics = new TripMetrics(Date.from(LocalDate.of(year,month,t.getDay()).atStartOfDay(ZoneId.systemDefault()).toInstant()));
                metrics.setDay(t.getDay());
                trips = new ArrayList<>();
                if(t.getTripType().equals(TripTypes.Total.name()))
                    metrics.setCount(metrics.getCount() + t.getCount());
               else trips.add(new Trips(t.getTripType(),t.getCount()));
                metrics.setTripsList(trips);

                finalMetricsList.add(metrics);
                prev = t.getDay();
            }
        }

            return finalMetricsList;
        }

        public List<Trips> addDays(List<Trips> trips,int limit,TripTypes tripTypes) {
            Trips trip = null;
            for (int i = 1, j = 0; i <= limit; ) {
                if (!trips.isEmpty() && j < trips.size()) {
                    trip = trips.get(j);
                    if (trip.getDay() == i) {
                        i++;
                        j++;
                    } else {
                        trips.add(new Trips(tripTypes.name(), i, 0L));
                        i++;
                    }
                } else {
                    trips.add(new Trips(tripTypes.name(), i, 0L));
                    i++;
                }
            }
            return trips;

        }


//    public List<Trips> getOpenTripsDaily(Integer year,Integer month)
//    {
//        Calendar firstDay=Calendar.getInstance();
//        Calendar lastDay=Calendar.getInstance();
//        Integer day=0;
//        Date today=Calendar.getInstance().getTime();
//
//        List<Trips> openTrips=new ArrayList<>();
//        firstDay.set(year, month - 1, 1);
//        lastDay.set(year, month - 1, firstDay.getActualMaximum(Calendar.DATE));
//
//
//        if(today.before(lastDay.getTime()))
//            lastDay.setTime(today);
//        lastDay.add(Calendar.DATE, 1);
//        Date d;
//        while (firstDay.before(lastDay)) {
//            d = firstDay.getTime();
//            day=firstDay.get(Calendar.DATE);
//            openTrips.add(tripRepository.getOpenTrips(d, day));
//            firstDay.add(Calendar.DATE, 1);
//        }
//
//        return openTrips;
//
//    }

    public List<Trips> getTotalTripsDaily(List<Trips> openTripsList,List<Trips> closedTripsList,int limit)
    {
        List<Trips> totalTripsList=new ArrayList<>();
        openTripsList.sort(Comparator.comparing(Trips::getDay));
        closedTripsList.sort(Comparator.comparing(Trips::getDay));
        for(int i=0;i<limit;i++)
        {
            if(openTripsList.get(i).getDay()==closedTripsList.get(i).getDay())
            {
               totalTripsList.add(new Trips(TripTypes.Total.name(),i+1,openTripsList.get(i).getCount()+closedTripsList.get(i).getCount())) ;
            }
        }
        return  totalTripsList;



    }



}






