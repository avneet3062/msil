package com.nxtLife.msil.service;

import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DataService {

    @Autowired
    private TripRepository tripRepository;

    public TripMetrics getTripsMetrics(int year, int month){
        //TODO- check for year and month

        TripMetrics metrics=new TripMetrics();
        try {
            List<Trips> openTrips = tripRepository.getOpenTrips();
            List<Trips> closedTrips= tripRepository.getClosedTrips();
            List<Trips> delayedTrips= tripRepository.getDelayedTrips();
            List<Trips> totalTrips= tripRepository.getTotalTrips();

            List<Trips> tripsList = new ArrayList<>();
            tripsList.addAll(openTrips);
            tripsList.addAll(closedTrips);
            tripsList.addAll(delayedTrips);
            tripsList.addAll(totalTrips);

            Collections.sort(tripsList, new Comparator<Trips>() {
                @Override
                public int compare(Trips o1, Trips o2) {
                    return o1.getMonth()-o2.getMonth();
                }
            });

            tripsList.sort(Comparator.comparing(Trips::getMonth).thenComparing(Trips::getTripType));


           List<Trips> tripsList1 = tripsList.stream().filter(t-> t.getMonth()==6).collect(Collectors.toList());
            List<Trips> tripsList2 = tripsList.stream().filter(t-> t.getMonth()==7).collect(Collectors.toList());
            List<Trips> tripsList3 = tripsList.stream().filter(t-> t.getMonth()==8).collect(Collectors.toList());
            List<Trips> tripsList4 = tripsList.stream().filter(t-> t.getMonth()==9).collect(Collectors.toList());

            List<TripMonthly> monthlyList= new ArrayList<>();
            monthlyList.add(new TripMonthly(6,tripsList1));
            monthlyList.add(new TripMonthly(7,tripsList2));
            monthlyList.add(new TripMonthly(8,tripsList3));
            monthlyList.add(new TripMonthly(9,tripsList4));

            metrics = new TripMetrics(year,monthlyList);

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
