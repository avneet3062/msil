package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class TripMetrics {
    private int year;
    private int month;
    private Date date;
    private List<Trips> tripsList ;
    private List<TripMonthly> tripMonthlyList ;
    private TripMonthly tripMonthly;


    public TripMetrics(int year, int month, List<Trips> tripsList,Date date) {
        this.year = year;
        this.month = month;
        this.tripsList = tripsList;
        this.date = date;
    }

    public TripMetrics() {

    }

    public TripMetrics(int year) {
        this.year = year;
    }

    public TripMetrics(int year, List<TripMonthly> tripMonthlyList) {
        this.year = year;
        this.tripMonthlyList = tripMonthlyList;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Trips> getTripsList() {
        return tripsList;
    }

    public void setTripsList(List<Trips> tripsList) {
        this.tripsList = tripsList;
    }

    public List<TripMonthly> getTripMonthlyList() {
        return tripMonthlyList;
    }

    public void setTripMonthlyList(List<TripMonthly> tripMonthlyList) {
        this.tripMonthlyList = tripMonthlyList;
    }

    public TripMonthly getTripMonthly() {
        return tripMonthly;
    }

    public void setTripMonthly(TripMonthly tripMonthly) {
        this.tripMonthly = tripMonthly;
    }
}
