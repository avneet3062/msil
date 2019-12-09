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

    private  final List<Long> yearlyCounts=new ArrayList<Long>();

    private static Logger logger = Logger.getLogger(DataService.class.getName());

    public TripMetrics getTripsMetrics(Integer year, Integer month){
        TripMetrics metrics = new TripMetrics();

        String order = null;
        Calendar firstDay = Calendar.getInstance();
        Calendar lastDay = Calendar.getInstance();
        Date today = Calendar.getInstance().getTime();
        List<Trips> trips = new ArrayList<>();
        Date fromDate, toDate;
        List<Trips> allTrips=new ArrayList<>();
        Long sum=0L;
        Duration type=null;
        int limit=0;
        if(year==null)
        { order = "year";

            firstDay.set(minYear, 0, 1);
            lastDay.setTime(today);


        }
        else if (year !=null&&month == null) {
            order = "month";
            sum= this.getOpenTripsCount(year);
            firstDay.set(year, 0, 1);
            lastDay.set(year, 11, 31);
            metrics.setYear(year);
            if (lastDay.getTime().after(today)) {
                lastDay.setTime(today);
            }


        } else if (year!=null&&month!=null){
            sum=this.getOpenTripsCount(year-1);
            List<Trips> openTrips=null;
            firstDay.set(year, 0, 1);
            if(month>1) {
                lastDay.set(year, month - 2, firstDay.getActualMaximum(Calendar.DATE));
                 openTrips = tripRepository.getOpenTrips(minYear, firstDay.getTime(), lastDay.getTime(), today, "year");
                if(!openTrips.isEmpty()&&openTrips!=null)
                    sum=sum+openTrips.get(0).getCount();
            }

            order = "day";
            firstDay.set(year, month - 1, 1);
            lastDay.set(year, month - 1, firstDay.getActualMaximum(Calendar.DATE));
            metrics.setYear(year);
            metrics.setMonth(month);
            if (lastDay.getTime().after(today)) {
                lastDay.setTime(today);
            }
        }
        else {
            throw new NotFoundException("Year is not specified");
        }



        if(year!=null&&month!=null){
            limit=lastDay.get(Calendar.DATE);
            type=Duration.day;}
        else if(year==null){
            limit=lastDay.get(Calendar.YEAR);
            type=Duration.year;}

        else if(year!=null&&month==null)
        { limit=lastDay.get(Calendar.MONTH)+1;
            type=Duration.month;}
        List<TripMetrics> tripMetricsList = null;
        List<TripMetrics> finalList = new ArrayList<>();
        List<Trips> openTripsList=new ArrayList<>();
        List<Trips> closedTripsList=new ArrayList<>();
        Trips trip = null;
        List<Trips> tripsList = null;
        fromDate = firstDay.getTime();
        toDate = lastDay.getTime();
        trips=tripRepository.getOpenTrips(minYear, fromDate, toDate,today, order);
        openTripsList=this.getAllTrips(sum,trips,limit,TripTypes.Open,type);
        allTrips.addAll(openTripsList);
        trips=tripRepository.getClosedTrips(minYear, fromDate, toDate, order);
        closedTripsList=this.getAllTrips(0L,trips,limit,TripTypes.Closed,type);
       allTrips.addAll(closedTripsList);
       trips=tripRepository.getDelayedTrips(minYear, fromDate, toDate, order);
        allTrips.addAll(this.getAllTrips(0L,trips,limit,TripTypes.Delayed,type));
       trips=this.getTotalTrips( openTripsList,closedTripsList,limit, type);
       allTrips.addAll(trips);

        allTrips.sort(Comparator.comparing(Trips::getName).thenComparing(Trips::getTripType));
        int prev = 0;
        TripMetrics typewise = null;
        for (Trips t : allTrips) {
            if (prev == t.getName()) {
                if(t.getTripType().equals(TripTypes.Total))
                { typewise.setCount(t.getCount());
                }
                else{
                 trip = new Trips(t.getTripType(), t.getCount());
                tripsList.add(trip);}
            } else {
                typewise=new TripMetrics();
                if(type.equals(Duration.year))
                    typewise.setYear(t.getName());
                else if(type.equals(Duration.month)){
                    typewise.setMonth(t.getName()); }
                else {
                    typewise.setDay(t.getName());
                    typewise.setDate(Date.from(LocalDate.of(year,month,t.getName()).atStartOfDay(ZoneId.systemDefault()).toInstant()));
                }
                if(t.getTripType().equals(TripTypes.Total))
                { typewise.setCount(t.getCount());
                }
                else {trip = new Trips(t.getTripType(), t.getCount());
                tripsList = new ArrayList<>();
                tripsList.add(trip);}
                typewise.setTripsList(tripsList);

                finalList.add(typewise);
                metrics.setTripMetricsList(finalList);
            }
            prev = t.getName();
        }


     if(year==null && month==null && yearlyCounts.isEmpty())
     {
         Long count=0L;

         for(int i=0; i<=limit-minYear;i++)
         {
             count=metrics.getTripMetricsList().get(i).getTripsList().get(2).getCount();
             yearlyCounts.add(count);
         }

     }
        return metrics;



    }

    public Long getOpenTripsCount(Integer year)
    {
        Long sum=0L;
        for(int i=0;i<=year-minYear;i++)
        {
            if(i==year-minYear)
                return sum;
            else if(i<year-minYear)
            {
                sum=sum+yearlyCounts.get(i);
            }
        }
        return sum;
    }

    public List<Trips> getAllTrips(Long count,List<Trips> trips,int limit,TripTypes name, Duration type) {
        int i=1;
        if(type.equals(Duration.year))
            i=minYear;
        Trips trip = null;
        for( int j= 0; i<=limit;  ){
            if(!trips.isEmpty() && j< trips.size()) {
                trip = trips.get(j);
                if ((type.equals(Duration.year) ||type.equals(Duration.month)||type.equals(Duration.day))&& trip.getName() == i) {
                    if(name.equals(TripTypes.Open)) {
                        count = count + trip.getCount();
                        trip.setCount(count);
                    }
                    i++;
                    j++;
                } else {
                    trips.add(new Trips(name, 0L+count, i));
                    i++;
                }
            }else{
                trips.add(new Trips(name,0L+count,i));
                i++;
            }
        }
        return trips;
    }


    public List<VehicleAvaliabiltyMetrics> getAllVehicleAvalable(String code) {

        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics = tripRepository.getVehiclesAvailable(code);
        return vehicleAvaliabiltyMetrics;
    }

    public List<Locations> getLocations() {
        return tripRepository.getLocations();
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

            firstDay.set(minYear, 0, 1);
            lastDay.setTime(today);
            limit=lastDay.get(Calendar.YEAR);
            for(int i=minYear;i<=limit;i++) {
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

        if(type.equals(Duration.year))
           i=minYear;
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



    public List<Trips> getTotalTrips(List<Trips> openTripsList,List<Trips> closedTripsList,int limit,Duration duration)
   {
        List<Trips> totalTripsList=new ArrayList<>();
        openTripsList.sort(Comparator.comparing(Trips::getName));
        closedTripsList.sort(Comparator.comparing(Trips::getName));
        if(duration.equals(Duration.year))
            limit=limit-minYear+1;
       for(int i=0;i<limit;i++)
        {
            if(openTripsList.get(i).getName().equals(closedTripsList.get(i).getName()))
           {
               totalTripsList.add(new Trips(TripTypes.Total,openTripsList.get(i).getCount()+closedTripsList.get(i).getCount(),openTripsList.get(i).getName())) ;
            }
        }
        return  totalTripsList;

   }



}






