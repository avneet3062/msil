package com.nxtLife.msil.controller;

import com.nxtLife.msil.ex.NotFoundException;
import com.nxtLife.msil.service.DataService;
import com.nxtLife.msil.views.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/metrics")
public class MetricsController {

    @Autowired
    private DataService dataService;

    @GetMapping("trips")
    public ResponseEntity<TripMetrics> getAllTripsMetricMonthly(@RequestParam(value = "year" , required = false) Integer year,
                                                        @RequestParam(value = "month",required = false) Integer month){

        TripMetrics tripMetrics= dataService.getTripsMetrics(year,month);

        if(tripMetrics == null)
            throw new NotFoundException("Couldn't find data");
        return new ResponseEntity<TripMetrics>(tripMetrics,HttpStatus.OK);
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


    @GetMapping("transporters")
    public ResponseEntity<List<Transporters>> getTrannsporters(){
        List<Transporters> transporters = dataService.getTransporters();
        if(transporters.isEmpty() || transporters == null)
            throw new NotFoundException("Can't find your transporters");
        return new ResponseEntity<List<Transporters>>(transporters,HttpStatus.OK);
    }

    @GetMapping("violations")
    public ResponseEntity<List<ViolationsMetrics>> getViolationsByCust(){
        List<ViolationsMetrics> violationsMetrics = dataService.getViolationsOfCust();
        if(violationsMetrics.isEmpty() || violationsMetrics == null)
            throw new NotFoundException("Couldn't find data");
        return new ResponseEntity<List<ViolationsMetrics>>(violationsMetrics,HttpStatus.OK);
    }



    @GetMapping("violations/{custId}")
  public ResponseEntity<ViolationsMetrics> getViolationsByCust(@PathVariable("custId") String custId,@RequestParam(value = "year",required=false) Integer year,
                                                                @RequestParam(value = "month",required = false) Integer month){
        ViolationsMetrics violationsMetrics = dataService.getViolationsOfCust(custId,year,month);
        if(violationsMetrics == null)
            throw new NotFoundException("Couldn't find data");
        return new ResponseEntity<ViolationsMetrics>(violationsMetrics,HttpStatus.OK);
    }


    @GetMapping("fleetUtilization")
    public ResponseEntity<FleetUtilizedMetrics> getFleetUtilization(@RequestParam(value="year",required=false) Integer year ,@RequestParam(value="month",required=false) Integer month, @RequestParam(value="custId") String custId ){

        FleetUtilizedMetrics metrics = dataService.getFleetUtilization(year,month,custId);
        return new ResponseEntity<FleetUtilizedMetrics>(metrics,HttpStatus.OK);

    }


}
