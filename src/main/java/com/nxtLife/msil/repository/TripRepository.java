package com.nxtLife.msil.repository;

import com.nxtLife.msil.views.Trips;
import com.nxtLife.msil.views.VehicleAvaliabiltyMetrics;

import java.sql.SQLException;
import java.util.List;

public interface TripRepository {

    List<Trips> getOpenTrips() throws SQLException;

    List<Trips> getClosedTrips() throws SQLException;

    List<Trips> getDelayedTrips() throws SQLException;

    List<Trips> getTotalTrips() throws SQLException;

    List<VehicleAvaliabiltyMetrics> getVehiclesAvailable();


}
