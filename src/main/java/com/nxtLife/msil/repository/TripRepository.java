package com.nxtLife.msil.repository;

import java.sql.SQLException;

public interface TripRepository {

    public Long getOpenTrips() throws SQLException;
}
