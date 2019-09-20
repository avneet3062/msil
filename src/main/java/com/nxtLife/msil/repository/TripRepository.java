package com.nxtLife.msil.repository;

import java.sql.SQLException;

public interface TripRepository {

    Long getOpenTrips() throws SQLException;

    Long getClosedTrips() throws SQLException;

    Long getDelayedTrips() throws SQLException;

    Long getTotalTrips() throws SQLException;


}
