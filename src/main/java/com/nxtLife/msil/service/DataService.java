package com.nxtLife.msil.service;

import com.nxtLife.msil.enums.Duration;
import com.nxtLife.msil.enums.TripTypes;
import com.nxtLife.msil.enums.Violations;
import com.nxtLife.msil.ex.NotFoundException;
import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

@Service
public class DataService {

    @Autowired
    private TripRepository tripRepository;

    public TripMetrics getTripsMetrics(Integer year, Integer month) {
        //TODO- check for year and month

        TripMetrics metrics = null;
        List<Trips> tripsList = new ArrayList<>();

        try {
            tripsList.addAll(tripRepository.getClosedTrips());
            tripsList.addAll(tripRepository.getDelayedTrips());
            tripsList.addAll(tripRepository.getTotalTrips());
            tripsList.addAll(tripRepository.getOpenTrips());

            tripsList.sort(Comparator.comparing(Trips::getMonth).thenComparing(Trips::getTripType));

            metrics = makeViewForTripsMetrics(tripsList, year);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return metrics;
    }

    public TripMetrics makeViewForTripsMetrics(List<Trips> trips, int year) {
        TripMetrics metrics = null;
        int prevMonth = 0;
        Trips tripData = null;
        TripMonthly tripsMonthly = null;
        List<Trips> tripInMonth = null;
        List<TripMonthly> finalList = new ArrayList<>();

        metrics = new TripMetrics(2019);
        for (Trips t : trips) {
            if (t.getMonth() == prevMonth) {
                tripInMonth.add(new Trips(t.getTripType(), t.getCount()));
                tripsMonthly.setTrips(tripInMonth);

            } else {
                if (tripsMonthly != null && tripsMonthly.getTrips().size() < 4) {
                    tripsMonthly.setTrips(getAllTrips(tripsMonthly.getTrips()));
                }
                tripsMonthly = new TripMonthly();
                tripInMonth = new ArrayList<>();

                tripsMonthly.setMonth(t.getMonth());
                tripInMonth.add(new Trips(t.getTripType(), t.getCount()));
                tripsMonthly.setTrips(tripInMonth);

                finalList.add(tripsMonthly);
                metrics.setTripMonthlyList(finalList);

                prevMonth = t.getMonth();
            }
        }

        if (tripsMonthly != null && tripsMonthly.getTrips().size() < 4) {
            tripsMonthly.setTrips(getAllTrips(tripsMonthly.getTrips()));
        }
        return metrics;
    }

    public List<Trips> getAllTrips(List<Trips> trips) {
        boolean notExits = false;
        for (TripTypes t : TripTypes.values()) {
            notExits = trips.stream().noneMatch(trip -> trip.getTripType().equals(t.name()));

            if (notExits)
                trips.add(new Trips(t.name(), 0l));
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

    public List<TripMetrics> getAlltripsYearly() {
        List<Trips> tripsList = new ArrayList<>();
        List<TripMetrics> tripMetrics = null;
        try {
            tripsList.addAll(tripRepository.getOpenTripsYearly());
            tripsList.addAll(tripRepository.getClosedTripsYearly());
            tripsList.addAll(tripRepository.getDelayedTripsYearly());
            tripsList.addAll(tripRepository.getTotaltripsYearly());

            tripsList.sort(Comparator.comparing(Trips::getYear).thenComparing(Trips::getTripType));

            tripMetrics = makeViewForTripsMetrics(tripsList);


        } catch (SQLException e) {
            e.printStackTrace();
        }


        return tripMetrics;
    }

    public List<TripMetrics> makeViewForTripsMetrics(List<Trips> trips) {
        int prevYear = 0;
        TripMetrics metrics = new TripMetrics();
        List<Trips> tripsList = null;
        List<TripMetrics> finalTripList = new ArrayList<>();

        for (Trips t : trips) {
            if (t.getYear() == prevYear) {
                tripsList.add(new Trips(t.getTripType(), t.getCount()));
            } else {
                if (tripsList != null && tripsList.size() < 4)
                    getAllTrips(tripsList);

                metrics = new TripMetrics();
                tripsList = new ArrayList<>();

                metrics.setYear(t.getYear());
                tripsList.add(new Trips(t.getTripType(), t.getCount()));
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


    public FleetUtilizedMetrics getFleetUtilization(Integer month, Integer year, String custId) {
        List<FleetUtilized> list = new ArrayList<>();
        Calendar firstDay = Calendar.getInstance();
        Calendar lastDay = Calendar.getInstance();

        firstDay.set(year, month - 1, 1);
        lastDay.set(year, month - 1, firstDay.getActualMaximum(Calendar.DATE));
        lastDay.add(Calendar.DATE, 1);
        Date d;
        while (firstDay.before(lastDay)) {
            d = firstDay.getTime();
//            System.out.println(d);
            list.add(tripRepository.getFleetUtilization(d, custId));
            firstDay.add(Calendar.DATE, 1);
        }
        list.sort(Comparator.comparing(FleetUtilized::getDate));
        FleetUtilizedMetrics metrics = new FleetUtilizedMetrics(custId);
        metrics.setYear(year);
        metrics.setMonth(month);
        metrics.setList(list);
        return metrics;
    }

    public ViolationsMetrics getViolationsOfCust(String custId, Integer year, Integer month) {
        ViolationsMetrics metrics = new ViolationsMetrics(custId);
        Set<Integer> exist=new HashSet<>();

        String order = null;
        Calendar firstDay = Calendar.getInstance();
        Calendar lastDay = Calendar.getInstance();
        Date today = Calendar.getInstance().getTime();

        Duration type=null;
        int lastMonth=12;
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
        { limit=lastDay.get(Calendar.MONTH);
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


    public FleetUtilizedMetrics getFleetUtilization(Integer year, String custId) {
        FleetUtilizedMetrics metrics = new FleetUtilizedMetrics(custId);

        try {
            List<FleetUtilized> list = new ArrayList<>();
            Calendar firstDay = Calendar.getInstance();
            Calendar lastDay = Calendar.getInstance();

        Integer currentMonth=12;
       Integer currentYear = Calendar.getInstance().get(Calendar.YEAR);
        if(currentYear.equals(year))
           currentMonth = Calendar.getInstance().get(Calendar.MONTH);

          for(int i=0;i<=currentMonth-1;i++) {
                   firstDay.set(year,i,1,0,0,0);
                  lastDay.set(year,i,firstDay.getActualMaximum(Calendar.DATE),0,0,0);
              list.add(tripRepository.getFleetUtilization(i + 1,firstDay.getTime(),lastDay.getTime(), custId));

           }
          list.sort(Comparator.comparing(FleetUtilized::getMonth));

            metrics.setYear(year);
            metrics.setList(list);

        } catch (Exception e) {
            e.printStackTrace();
        }


        return metrics;


    }
//    public List<ViolationsCount> getAllViolationsDaywise(List<ViolationsCount> violations,int lastDay,Violations name)
//    {
//        ViolationsCount violationsCount = null;
//        for(int i= 1,j= 0; i<=lastDay;  ){
//            if(!violations.isEmpty() && j< violations.size()) {
//                violationsCount = violations.get(j);
//                if (violationsCount.getDay() == i) {
//                    i++;
//                    j++;
//                } else {
//                    violations.add(new ViolationsCount( 0,name, i));
//                    i++;
//                }
//            }else{
//                violations.add(new ViolationsCount(0,name,i));
//                i++;
//            }
//
//        }
//        return violations;
//
//
//    }

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
        List<TripMetrics> tripMetrics = new ArrayList<>();
        LocalDate first = LocalDate.of(year,month,1);
        LocalDate end = first.with(TemporalAdjusters.lastDayOfMonth());
        if(year == null || month== null)
            throw new NotFoundException("Year and Month are Mandatory");

            tripsList.addAll(addDays(tripRepository.getOpenTrips(year,month),first,end,TripTypes.Open));
            tripsList.addAll(addDays(tripRepository.getClosedTrips(year, month),first,end,TripTypes.Closed ));
            tripsList.addAll(addDays(tripRepository.getDelayedTrips(year,month),first,end,TripTypes.Delayed ));
            tripsList.addAll(addDays(tripRepository.getTotalTrips(year,month),first,end,TripTypes.Total));

            tripsList.sort(Comparator.comparing(Trips::getMonth).thenComparing(Trips::getTripType));

//            tripMetrics = makeViewForTripsMetrics(tripsList);

        Integer prev = 0;
        List<TripMetrics> finalMetricsList = new ArrayList<>();
        TripMetrics metrics = null;
        List<Trips> trips= null;
        for(Trips t :tripsList){
            if(prev.equals(t.getMonth())){
                trips.add(new Trips(t.getTripType(),t.getCount()));
            }else{
                metrics = new TripMetrics(Date.from(LocalDate.of(year,month,t.getMonth()).atStartOfDay(ZoneId.systemDefault()).toInstant()));
                trips = new ArrayList<>();
                trips.add(new Trips(t.getTripType(),t.getCount()));
                metrics.setTripsList(trips);

                finalMetricsList.add(metrics);
                prev = t.getMonth();
            }
        }

            return finalMetricsList;
        }

    public List<Trips> addDays(List<Trips> tripsList,LocalDate first,LocalDate end, TripTypes tripTypes){

        tripsList.sort(Comparator.comparing(Trips::getMonth));
        Trips trip= null;
        for( int i=0; first.isBefore(end);){
            if( i < tripsList.size())
                trip = tripsList.get(i);
            if(!trip.getMonth().equals(first.getDayOfMonth())){
                tripsList.add(new Trips(tripTypes.name(),0L,first.getDayOfMonth()));
                first =first.plusDays(1);
            }else{
                i++;
                first = first.plusDays(1);
            }

        }
        if(!tripsList.get(tripsList.size()-1).getMonth().equals(first.getDayOfMonth()))
            tripsList.add(new Trips(tripTypes.name(),0L,first.getDayOfMonth()));
        return tripsList;
    }


}






