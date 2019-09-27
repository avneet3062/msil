package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(value = JsonInclude.Include.NON_ABSENT)
public class Trips {

    private String tripType;
    private Long count;
    private Integer month;
    private Integer year;

    public Trips(String tripType, Long count , Integer month) {
        this.tripType = tripType;
        this.count = count;
        this.month = month;
    }

    public Trips() {
    }

    public Trips(String tripType, Long count) {
        this.tripType = tripType;
        this.count = count;
    }

    public Trips(Integer year,String tripType, Long count) {
        this.tripType = tripType;
        this.count = count;
        this.year = year;
    }

    @JsonIgnore
    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getTripType() {
        return tripType;
    }

    public void setTripType(String tripType) {
        this.tripType = tripType;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }
}
