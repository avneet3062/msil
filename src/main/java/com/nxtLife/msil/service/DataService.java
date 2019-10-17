package com.nxtLife.msil.service;

import com.nxtLife.msil.enums.TripTypes;
import com.nxtLife.msil.enums.Violations;
import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.*;

@Service
public class DataService {

    @Autowired
    private TripRepository tripRepository;

    public TripMetrics getTripsMetrics(int year, int month){
        //TODO- check for year and month

        TripMetrics metrics= null;
        List<Trips> tripsList = new ArrayList<>();
        try{
            tripsList.addAll(tripRepository.getOpenTrips());
            tripsList.addAll(tripRepository.getClosedTrips());
            tripsList.addAll(tripRepository.getDelayedTrips());
            tripsList.addAll(tripRepository.getTotalTrips());

            tripsList.sort(Comparator.comparing(Trips::getMonth).thenComparing(Trips::getTripType));

            metrics=makeViewForTripsMetrics(tripsList,2019);
        }catch (SQLException e){
            e.printStackTrace();
        }
        return metrics;
    }

    public TripMetrics makeViewForTripsMetrics(List<Trips> trips, int year){
        TripMetrics metrics = null;
        int prevMonth=0;
        Trips tripData= null;
        TripMonthly tripsMonthly = null;
        List<Trips> tripInMonth = null;
        List<TripMonthly> finalList= new ArrayList<>();

        metrics = new TripMetrics(2019);
        for(Trips t : trips){
            if(t.getMonth() == prevMonth){
                tripInMonth.add(new Trips(t.getTripType(),t.getCount()));
                tripsMonthly.setTrips(tripInMonth);

            }else{
                if( tripsMonthly!= null && tripsMonthly.getTrips().size() < 4 ){
                    tripsMonthly.setTrips(getAllTrips(tripsMonthly.getTrips()));
                }
                tripsMonthly= new TripMonthly();
                tripInMonth= new ArrayList<>();

                tripsMonthly.setMonth(t.getMonth());
                tripInMonth.add(new Trips(t.getTripType(),t.getCount()));
                tripsMonthly.setTrips(tripInMonth);

                finalList.add(tripsMonthly);
                metrics.setTripMonthlyList(finalList);

                prevMonth= t.getMonth();
            }
        }

        if( tripsMonthly!= null && tripsMonthly.getTrips().size() < 4 ){
            tripsMonthly.setTrips(getAllTrips(tripsMonthly.getTrips()));
        }
        return metrics;
    }

    public List<Trips> getAllTrips(List<Trips> trips){
        boolean notExits= false;
        for(TripTypes t :TripTypes.values()){
            notExits = trips.stream().noneMatch(trip-> trip.getTripType().equals(t.name()) )  ;

            if(notExits)
             trips.add(new Trips(t.name(),0l));
        }
        return trips;            
    }

    public List<VehicleAvaliabiltyMetrics> getAllVehicleAvalable(String code){

        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics = tripRepository.getVehiclesAvailable(code);
        return vehicleAvaliabiltyMetrics;
    }

    public List<Locations> getLocations(){
        return tripRepository.getLocations();
    }

    public List<TripMetrics> getAlltripsYearly(){
        List<Trips> tripsList = new ArrayList<>();
        List<TripMetrics> tripMetrics= null;
        try{
            tripsList.addAll(tripRepository.getOpenTripsYearly());
            tripsList.addAll(tripRepository.getClosedTripsYearly());
            tripsList.addAll(tripRepository.getDelayedTripsYearly());
            tripsList.addAll(tripRepository.getTotaltripsYearly());

            tripsList.sort(Comparator.comparing(Trips::getYear).thenComparing(Trips::getTripType));

            tripMetrics = makeViewForTripsMetrics(tripsList);


        }catch (SQLException e){
            e.printStackTrace();
        }


        return tripMetrics;
    }

    public List<TripMetrics> makeViewForTripsMetrics(List<Trips> trips){
        int prevYear=0;
        TripMetrics metrics = new TripMetrics();
        List<Trips> tripsList = null;
        List<TripMetrics> finalTripList= new ArrayList<>();

        for(Trips t:trips){
            if(t.getYear() == prevYear){
                    tripsList.add(new Trips(t.getTripType(),t.getCount()));
            }else {
                    if(tripsList!= null && tripsList.size()< 4 )
                        getAllTrips(tripsList);

                    metrics = new TripMetrics();
                    tripsList = new ArrayList<>();

                    metrics.setYear(t.getYear());
                    tripsList.add(new Trips(t.getTripType(),t.getCount()));
                    metrics.setTripsList(tripsList);
                    finalTripList.add(metrics);

                    prevYear= t.getYear();
            }
        }
        return finalTripList;
    }

    public List<Transporters> getTransporters(){
        return tripRepository.getTransporters();
    }

    public List<ViolationsMetrics> getViolationsOfCust(){


        List<ViolationsCount> violationsCounts = new ArrayList<>();
        violationsCounts.addAll(tripRepository.getContinousDrivingViolations());
        violationsCounts.addAll(tripRepository.getFreeWheelingViolations());
        violationsCounts.addAll(tripRepository.getHarshBreakViolations());
        violationsCounts.addAll(tripRepository.getNightDrivingViolations());
        violationsCounts.addAll(tripRepository.getRapidAccelerationViolations());
        violationsCounts.addAll(tripRepository.getStoppageViolations());
        violationsCounts.addAll(tripRepository.getOverspeedViolations());

        violationsCounts.sort(Comparator.comparing(ViolationsCount::getCustId).thenComparing(ViolationsCount::getName));

        String prevCust= "";
        ViolationsMetrics metrics=null;
        List<ViolationsMetrics> finalList= new ArrayList<>();
        ViolationsCount count=null;
        List<ViolationsCount> countList= new ArrayList<>();
        for(ViolationsCount v : violationsCounts){
            if(prevCust.equals(v.getCustId())){
                count = new ViolationsCount(v.getName(),v.getCount());
                countList.add(count);

            }else{
                metrics= new ViolationsMetrics();
                metrics.setCustId(v.getCustId());
                count = new ViolationsCount(v.getName(),v.getCount());
                countList.add(count);
                metrics.setViolations(countList);
                finalList.add(metrics);
            }
            prevCust = v.getCustId();
        }
        return finalList;
    }
}
