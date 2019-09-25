package com.nxtLife.msil.service;

import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.TripMetrics;
import com.nxtLife.msil.views.TripTypes;
import com.nxtLife.msil.views.Trips;
import com.nxtLife.msil.views.VehicleAvaliabiltyMetrics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DataService {

    @Autowired
    private TripRepository tripRepository;

    public TripMetrics getTripsMetrics(int year, int month){
        //TODO- check for year and month

        TripMetrics metrics=new TripMetrics();
        try {
            Long openTrips = tripRepository.getOpenTrips();
            Long closedTrips= tripRepository.getClosedTrips();
            Long delayedTrips= tripRepository.getDelayedTrips();
            Long totalTrips= tripRepository.getTotalTrips();

            List<Trips> tripsList = new ArrayList<>();
            tripsList.add(new Trips(TripTypes.Open.name(),openTrips));
            tripsList.add(new Trips(TripTypes.Closed.name(),closedTrips));
            tripsList.add(new Trips(TripTypes.Delayed.name(),delayedTrips));
            tripsList.add(new Trips(TripTypes.Total.name(),totalTrips));

            metrics = new TripMetrics(year,month,tripsList,Date.valueOf(LocalDate.now().minusDays(13)));


        }catch (SQLException e){
            e.printStackTrace();
        }

        return metrics;
    }

    public List<VehicleAvaliabiltyMetrics> getAllVehicleAvalable(){

        List<VehicleAvaliabiltyMetrics> vehicleAvaliabiltyMetrics = tripRepository.getVehiclesAvailable();
        return vehicleAvaliabiltyMetrics;
    }
}
