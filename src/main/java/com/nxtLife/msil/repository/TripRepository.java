package com.nxtLife.msil.repository;

import com.nxtLife.msil.views.VehicleAvaliabiltyMetrics;

import java.sql.SQLException;
import java.util.List;

public interface TripRepository {

    Long getOpenTrips() throws SQLException;

    Long getClosedTrips() throws SQLException;

    Long getDelayedTrips() throws SQLException;

    Long getTotalTrips() throws SQLException;

    List<VehicleAvaliabiltyMetrics> getVehiclesAvailable();


}
