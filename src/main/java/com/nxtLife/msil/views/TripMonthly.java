package com.nxtLife.msil.views;

import java.util.ArrayList;
import java.util.List;

public class TripMonthly {

    int month;
    List<Trips> trips = new ArrayList<>();

    public TripMonthly(int month, List<Trips> trips) {
        this.month = month;
        this.trips = trips;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public List<Trips> getTrips() {
        return trips;
    }

    public void setTrips(List<Trips> trips) {
        this.trips = trips;
    }
}
