package com.nxtLife.msil.views;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
public class Trips {

    private String tripType;
    private Long count;
    private Integer month;

    public Trips(String tripType, Long count , Integer month) {
        this.tripType = tripType;
        this.count = count;
        this.month = month;
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
