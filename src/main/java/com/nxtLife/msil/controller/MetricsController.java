package com.nxtLife.msil.controller;

import com.nxtLife.msil.ex.NotFoundException;
import com.nxtLife.msil.service.DataService;
import com.nxtLife.msil.views.Locations;
import com.nxtLife.msil.views.TripMetrics;
import com.nxtLife.msil.views.VehicleAvaliabiltyMetrics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/metrics")
public class MetricsController {

    @Autowired
    private DataService dataService;

    @GetMapping("tripsMonthly")
    public ResponseEntity<TripMetrics> getAllTripsMetricMonthly(@RequestParam(value = "year") int year,
                                                        @RequestParam(value = "month",required = false) int month){

        TripMetrics tripMetricsList= dataService.getTripsMetrics(year,month);

        if(tripMetricsList == null )
            throw new NotFoundException("Data not found!");
        else
            return new ResponseEntity<TripMetrics>(tripMetricsList, HttpStatus.OK);
    }


    @GetMapping("vehicleAvailability/{code}")
    public ResponseEntity<List<VehicleAvaliabiltyMetrics>> getAllVehicleAvalable(@PathVariable("code") String code){
      List<VehicleAvaliabiltyMetrics> vehicleAvailable=dataService.getAllVehicleAvalable(code);
      if(vehicleAvailable.isEmpty())
          throw new NotFoundException("Data not found!!");
      return new ResponseEntity<List<VehicleAvaliabiltyMetrics>>(vehicleAvailable,HttpStatus.OK);
    }

    @GetMapping("locations")
    public ResponseEntity<List<Locations>> getAllLocations() {
        List<Locations> locations = dataService.getLocations();
        if(locations.isEmpty() || locations == null)
            throw new NotFoundException("Can't find your locations.");

        return new ResponseEntity<List<Locations>>(locations,HttpStatus.OK);
    }

    @GetMapping("tripsYearly")
    public List<TripMetrics> getTripsYearly(){
        List<TripMetrics> metricsList = dataService.getAlltripsYearly();
        if(metricsList == null || metricsList.isEmpty())
            throw new NotFoundException("Couldn't find your data");
        return metricsList;
    }
}
