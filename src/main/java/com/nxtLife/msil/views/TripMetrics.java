package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Date;
import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class TripMetrics {
    private Integer year;
    private Integer month;
    private Integer day;
    private Long count;

    @JsonFormat(pattern = "dd-MMM-YYYY",timezone = "IST")
    private Date date;
    private List<Trips> tripsList ;
    private List<TripMonthly> tripMonthlyList ;
    private TripMonthly tripMonthly;


    public TripMetrics() {

    }

    public TripMetrics(Date date) {
        this.date = date;
    }

    public TripMetrics(Integer year, Integer month, List<Trips> tripsList, Date date) {
        this.year = year;
        this.month = month;
        this.tripsList = tripsList;
        this.date = date;
    }

    public TripMetrics(Integer year) {
        this.year = year;
    }

    public TripMetrics(Integer year, List<TripMonthly> tripMonthlyList) {
        this.year = year;
        this.tripMonthlyList = tripMonthlyList;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) { this.year = year; }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) { this.month = month; }

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

    public TripMonthly getTripMonthly() { return tripMonthly; }

    public void setTripMonthly(TripMonthly tripMonthly) {
        this.tripMonthly = tripMonthly;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
