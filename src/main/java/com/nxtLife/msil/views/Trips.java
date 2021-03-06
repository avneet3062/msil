package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.nxtLife.msil.enums.TripTypes;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@JsonInclude(value = JsonInclude.Include.NON_ABSENT)
public class Trips {

    @JsonFormat(pattern = "dd-MMM-YY", timezone = "IST")
    private TripTypes tripType;
    private Long count;
    private Integer name;
//    private Integer month;
//    private Integer year;
//    private Integer day;
    private Date date;

    public Trips(TripTypes tripType, Long count , Integer name) {
        this.tripType = tripType;
        this.count = count;
        this.name = name;
    }
//    public Trips( String tripType,Integer day , Long count) {
//        this.day=day;
//        this.tripType = tripType;
//        this.count = count;
//
//    }
//
//    public Integer getDay() {
//        return day;
//    }
//
//    public void setDay(Integer day) {
//        this.day = day;
//    }

    public Trips() {
    }

    public Trips(Integer name) {
        this.name = name;
    }

    public Trips(TripTypes tripType, Long count) {
        this.tripType = tripType;
        this.count = count;
    }

//    public Trips(Integer year,String tripType, Long count) {
//        this.tripType = tripType;
//        this.count = count;
//        this.year = year;
//    }

//    @JsonIgnore
//    public int getYear() {
//        return year;
//    }
//
//    public void setYear(int year) {
//        this.year = year;
//    }

    public TripTypes getTripType() {
        return tripType;
    }

    public void setTripType(TripTypes tripType) {
        this.tripType = tripType;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Integer getName() {
        return name;
    }

    public void setName(Integer name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Trips{" +
                "tripType='" + tripType + '\'' +
                ", count=" + count +
                ", month=" + name +
                '}';
    }
}
