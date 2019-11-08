package com.nxtLife.msil.service;

import com.nxtLife.msil.enums.TripTypes;
import com.nxtLife.msil.enums.Violations;
import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
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
        int lastMonth=12;

        if (month == null) {
            order = "month";
            firstDay.set(year, 0, 1);
            lastDay.set(year, 11, 31);
            metrics.setYear(year);


        } else {
            order = "day";
            firstDay.set(year, month - 1, 1);
            lastDay.set(year, month - 1, firstDay.getActualMaximum(Calendar.DATE));
            metrics.setYear(year);
            metrics.setMonth(month);
        }
        if (lastDay.getTime().after(today)) {
            lastDay.setTime(today);
            lastMonth = lastDay.get(Calendar.DATE);
        }
        List<ViolationsCount> violationsCounts = new ArrayList<>();
        Date fromDate, toDate;
        fromDate = firstDay.getTime();
        toDate = lastDay.getTime();
        List<ViolationsCount> allViolations=new ArrayList<>();

        violationsCounts=tripRepository.getContinousDrivingViolations2(custId, fromDate, toDate, order);
        if(month==null)
        allViolations.addAll(this.getAllViolationsMonthwise(violationsCounts,lastMonth,Violations.ContinuousDriving));
        else {
            allViolations.addAll(this.getAllViolationsDaywise(violationsCounts, lastDay.get(Calendar.DATE), Violations.ContinuousDriving));
        }
        violationsCounts=tripRepository.getFreeWheelingViolations2(custId, fromDate, toDate, order);
        if(month==null)
            allViolations.addAll(this.getAllViolationsMonthwise(violationsCounts,lastMonth,Violations.Freewheeling));
        else {
            allViolations.addAll(this.getAllViolationsDaywise(violationsCounts, lastDay.get(Calendar.DATE), Violations.Freewheeling));
        }
        violationsCounts=tripRepository.getHarshBreakViolations2(custId, fromDate, toDate, order);
        if(month==null)
            allViolations.addAll(this.getAllViolationsMonthwise(violationsCounts,lastMonth,Violations.HarshBreaking));
        else {
            allViolations.addAll(this.getAllViolationsDaywise(violationsCounts, lastDay.get(Calendar.DATE), Violations.HarshBreaking));
        }
        violationsCounts=tripRepository.getNightDrivingViolations2(custId, fromDate, toDate, order);
        if(month==null)
            allViolations.addAll(this.getAllViolationsMonthwise(violationsCounts,lastMonth,Violations.NightDriving));
        else {
            allViolations.addAll(this.getAllViolationsDaywise(violationsCounts, lastDay.get(Calendar.DATE), Violations.NightDriving));
        }
        violationsCounts=tripRepository.getRapidAccelerationViolations2(custId, fromDate, toDate, order);
        if(month==null)
            allViolations.addAll(this.getAllViolationsMonthwise(violationsCounts,lastMonth,Violations.RapidAcceleration));
        else {
            allViolations.addAll(this.getAllViolationsDaywise(violationsCounts, lastDay.get(Calendar.DATE), Violations.RapidAcceleration));
        }
        violationsCounts=tripRepository.getStoppageViolations2(custId, fromDate, toDate, order);
        if(month==null)
            allViolations.addAll(this.getAllViolationsMonthwise(violationsCounts,lastMonth,Violations.Stoppage));
        else {
            allViolations.addAll(this.getAllViolationsDaywise(violationsCounts, lastDay.get(Calendar.DATE), Violations.Stoppage));
        }
        violationsCounts=tripRepository.getOverspeedViolations2(custId, fromDate, toDate, order);
        if(month==null)
            allViolations.addAll(this.getAllViolationsMonthwise(violationsCounts,lastMonth,Violations.Overspeed));
        else {
            allViolations.addAll(this.getAllViolationsDaywise(violationsCounts, lastDay.get(Calendar.DATE), Violations.Overspeed));
        }

        List<ViolationsMetrics> violationsMetricsList = null;
        List<ViolationsMetrics> finalList = new ArrayList<>();
        ViolationsCount violationsCount = null;
        List<ViolationsCount> violationsCountList = null;
        if(month==null){
        allViolations.sort(Comparator.comparing(ViolationsCount::getMonth));
            int prevMonth = 0;
            ViolationsMetrics monthwise = null;
            for (ViolationsCount violations : allViolations) {
                if (prevMonth == violations.getMonth()) {
                    violationsCount = new ViolationsCount(violations.getName(), violations.getCount());
                    violationsCountList.add(violationsCount);
                } else {

                    monthwise = new ViolationsMetrics(violations.getMonth());
                    violationsCount = new ViolationsCount(violations.getName(), violations.getCount());
                    violationsCountList = new ArrayList<>();
                    violationsCountList.add(violationsCount);
                    monthwise.setViolations(violationsCountList);
                    finalList.add(monthwise);
                    metrics.setMetricsList(finalList);
                }
                prevMonth = violations.getMonth();
            }
        }
        else {

            allViolations.sort(Comparator.comparing(ViolationsCount::getDay));
            int prevDay = 0;
            ViolationsMetrics daywise = null;
            for (ViolationsCount violations : allViolations) {
                if (prevDay == violations.getDay()) {
                    violationsCount = new ViolationsCount(violations.getName(), violations.getCount());
                    violationsCountList.add(violationsCount);
                } else {
                    daywise = new ViolationsMetrics();
                    daywise.setDay(violations.getDay());
                    violationsCount = new ViolationsCount(violations.getName(), violations.getCount());
                    violationsCountList = new ArrayList<>();
                    violationsCountList.add(violationsCount);
                    daywise.setViolations(violationsCountList);
                    finalList.add(daywise);
                    metrics.setMetricsList(finalList);
                }
                prevDay = violations.getDay();
            }
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
    public List<ViolationsCount> getAllViolationsDaywise(List<ViolationsCount> violations,int lastDay,Violations name)
    {
        ViolationsCount violationsCount = null;
        for(int i= 1,j= 0; i<=lastDay;  ){
            if(!violations.isEmpty() && j< violations.size()) {
                violationsCount = violations.get(j);
                if (violationsCount.getDay() == i) {
                    i++;
                    j++;
                } else {
                    violations.add(new ViolationsCount( 0,name, i));
                    i++;
                }
            }else{
                violations.add(new ViolationsCount(0,name,i));
                i++;
            }

        }
        return violations;


    }

    public List<ViolationsCount> getAllViolationsMonthwise(List<ViolationsCount> violations,int lastMonth,Violations name)
                {
                    ViolationsCount violationsCount = null;
                    for(int i= 1,j= 0; i<=lastMonth;  ){
                        if(!violations.isEmpty() && j< violations.size()) {
                            violationsCount = violations.get(j);
                            if (violationsCount.getMonth() == i) {
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
