package com.nxtLife.msil.repository;

import com.nxtLife.msil.enums.Violations;
import com.nxtLife.msil.views.*;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;

public interface TripRepository {

    List<Trips> getOpenTrips() throws SQLException;

    List<Trips> getClosedTrips() throws SQLException;

    List<Trips> getDelayedTrips() throws SQLException;

    List<Trips> getTotalTrips() throws SQLException;

    List<VehicleAvaliabiltyMetrics> getVehiclesAvailable(String code);

    List<Locations> getLocations();

    List<Trips> getOpenTripsYearly() throws SQLException;

    List<Trips> getClosedTripsYearly() throws SQLException;

    List<Trips> getDelayedTripsYearly() throws SQLException;

    List<Trips> getTotaltripsYearly() throws SQLException;

    List<Transporters> getTransporters();

    List<ViolationsCount> getContinousDrivingViolations();

    List<ViolationsCount> getFreeWheelingViolations();

    List<ViolationsCount> getHarshBreakViolations();

    List<ViolationsCount> getRapidAccelerationViolations();

    List<ViolationsCount> getStoppageViolations();

    List<ViolationsCount> getNightDrivingViolations();

    List<ViolationsCount> getOverspeedViolations();

    FleetUtilized getFleetUtilization(Date date, String custId);

    ViolationsCount getContinousDrivingViolations2(String custId);

    ViolationsCount getFreeWheelingViolations2(String custId);

    ViolationsCount getHarshBreakViolations2(String custId);

    ViolationsCount getRapidAccelerationViolations2(String custId);

    ViolationsCount getStoppageViolations2(String custId);

    ViolationsCount getNightDrivingViolations2(String custId);

    ViolationsCount getOverspeedViolations2(String custId);
}
