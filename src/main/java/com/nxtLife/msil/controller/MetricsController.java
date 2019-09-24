package com.nxtLife.msil.controller;

import com.nxtLife.msil.ex.NotFoundException;
import com.nxtLife.msil.service.DataService;
import com.nxtLife.msil.views.TripMetrics;
import com.nxtLife.msil.views.VehicleAvaliabiltyMetrics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/metrics")
public class MetricsController {

    @Autowired
    private DataService dataService;

    @GetMapping("trips")
    public ResponseEntity<TripMetrics> getAllTripsMetric(@RequestParam(value = "year",required = false) int year,
                                                        @RequestParam(value = "month",required = false) int month){

        TripMetrics tripMetricsList= dataService.getTripsMetrics(year,month);

        if(tripMetricsList == null )
            throw new NotFoundException("Data not found!");
        else
            return new ResponseEntity<TripMetrics>(tripMetricsList, HttpStatus.OK);
    }


    @GetMapping("vehicleAvailability")
    public ResponseEntity<List<VehicleAvaliabiltyMetrics>> getAllVehicleAvalable(){
      List<VehicleAvaliabiltyMetrics> vehicleAvailable=dataService.getAllVehicleAvalable();
      return new ResponseEntity<List<VehicleAvaliabiltyMetrics>>(vehicleAvailable,HttpStatus.OK);
    }
}
