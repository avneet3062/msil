package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.math.BigDecimal;
import java.util.Date;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class FleetUtilized {

    @JsonFormat(pattern = "dd-MMM-YY", timezone = "IST")
/*
    @JsonFormat(pattern = "dd", timezone = "IST")
*/
    Date date;
    private Integer day;
    private Integer year;
    private Integer month;
    Long total;
    Long count;
    BigDecimal percent;


    public FleetUtilized() {
    }

    public FleetUtilized(Date date,Integer day, Long total, Long count, BigDecimal percent) {
        this.day=day;
        this.date = date;
        this.total = total;
        this.count = count;
        this.percent = percent;
    }
    public FleetUtilized(Integer month, Long total, Long count, BigDecimal percent) {
        this.month = month;
        this.total = total;
        this.count = count;
        this.percent = percent;
    }
    public FleetUtilized( Long total, Long count, BigDecimal percent,Integer year) {
        this.year = year;
        this.total = total;
        this.count = count;
        this.percent = percent;
    }



    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Long getTotal() {
        return total;
    }


    public void setTotal(Long total) {
        this.total = total;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public BigDecimal getPercent() {
        return percent;
    }

    public void setPercent(BigDecimal percent) {
        this.percent = percent;
    }
}
