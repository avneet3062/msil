package com.nxtLife.msil.service;

import com.nxtLife.msil.repository.TripRepository;
import com.nxtLife.msil.views.TripMetrics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class DataService {

    @Autowired
    private TripRepository tripRepository;

    public List<TripMetrics> getTripsMetrics(int year, int month){
        //TODO- check for year and month
        try {
            Long count_opentrips = tripRepository.getOpenTrips();
            System.out.println(count_opentrips);
        }catch (SQLException e){
            e.printStackTrace();
        }

        return new ArrayList<>();
    }
}
