package com.nxtLife.msil.views;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Setter
@Getter
public class TripMetrics {
    int year;
    int month;
    Date date;
    List<Trips> tripsList = new ArrayList<>();

    public TripMetrics(int year, int month, List<Trips> tripsList,Date date) {
        this.year = year;
        this.month = month;
        this.tripsList = tripsList;
        this.date = date;
    }

    public TripMetrics() {

    }
}
