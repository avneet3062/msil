package com.nxtLife.msil.repository;

import com.nxtLife.msil.enums.Duration;
import com.nxtLife.msil.enums.Violations;
import com.nxtLife.msil.views.*;

import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public interface TripRepository {

    List<Trips> getOpenTrips(int minYear, Date fromDate,Date toDate,Date today,String order);

    List<Trips> getClosedTrips(int minYear,Date fromDate,Date toDate, String order);

    List<Trips> getDelayedTrips(int minYear,Date fromDate,Date toDate, String order);

    List<VehicleAvaliabiltyMetrics> getVehiclesAvailable(String code);

    List<Locations> getLocations();

    List<Transporters> getTransporters();

    List<ViolationsCount> getContinousDrivingViolations();

    List<ViolationsCount> getFreeWheelingViolations();

    List<ViolationsCount> getHarshBreakViolations();

    List<ViolationsCount> getRapidAccelerationViolations();

    List<ViolationsCount> getStoppageViolations();

    List<ViolationsCount> getNightDrivingViolations();

    List<ViolationsCount> getOverspeedViolations();

    FleetUtilized getFleetUtilization(Date date,Integer day, String custId);

    List<ViolationsCount> getContinousDrivingViolations2(String custId,Date firstDay,Date lastDay,String order);

    List<ViolationsCount> getFreeWheelingViolations2(String custId,Date firstDay,Date lastDay,String order);

    List<ViolationsCount> getHarshBreakViolations2(String custId,Date firstDay,Date lastDay,String order);

    List<ViolationsCount> getRapidAccelerationViolations2(String custId,Date firstDay,Date lastDay,String order);

    List<ViolationsCount> getStoppageViolations2(String custId,Date firstDay,Date lastDay,String order);

    List<ViolationsCount> getNightDrivingViolations2(String custId,Date firstDay,Date lastDay,String order);

    List<ViolationsCount> getOverspeedViolations2(String custId,Date firstDay,Date lastDay,String order);


    FleetUtilized getFleetUtilization(Integer month, Date firstDate, Date lastDay, String custId, Duration duration);

    int getMinimumYear();


}
