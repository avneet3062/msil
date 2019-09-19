package com.nxtLife.msil.service;

import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.TripMetrics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DataService {

    @Autowired
    private TripRepository tripRepository;

    public List<TripMetrics> getTripsMetrics(int year, int month){
        //TODO- check for year and month
        int count_opentrips=tripRepository.getOpenTrips();
        System.out.println(count_opentrips);
        return new ArrayList<>();
    }
}
