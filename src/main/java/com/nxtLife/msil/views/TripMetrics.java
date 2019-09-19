package com.nxtLife.msil.views;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
public class TripMetrics {
    int year;
    int month;
    List<Trips> tripsList = new ArrayList<>();

    public TripMetrics(int year, int month, List<Trips> tripsList) {
        this.year = year;
        this.month = month;
        this.tripsList = tripsList;
    }
}
