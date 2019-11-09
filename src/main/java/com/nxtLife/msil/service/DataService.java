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
import java.util.*;

@Service
public class DataService {

    @Autowired
    private TripRepository tripRepository;

    public TripMetrics getTripsMetrics(int year, int month) {
        //TODO- check for year and month

        TripMetrics metrics = null;
        List<Trips> tripsList = new ArrayList<>();
        try {
            tripsList.addAll(tripRepository.getOpenTrips());
            tripsList.addAll(tripRepository.getClosedTrips());
            tripsList.addAll(tripRepository.getDelayedTrips());
            tripsList.addAll(tripRepository.getTotalTrips());

            tripsList.sort(Comparator.comparing(Trips::getMonth).thenComparing(Trips::getTripType));

            metrics = makeViewForTripsMetrics(tripsList, 2019);
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

            firstDay.set(year, month - 1, 1);
            lastDay.set(year, month - 1, firstDay.getActualMaximum(Calendar.DATE));
            lastDay.add(Calendar.DATE, 1);
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


    public List<ViolationsCount> getAllViolations(List<ViolationsCount> violations,int limit,Violations name, Duration type)
                {
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





}
