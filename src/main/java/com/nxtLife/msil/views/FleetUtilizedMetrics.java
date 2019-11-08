package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class FleetUtilizedMetrics {

    String custId;
    private Integer year;
    private Integer month;
    List<FleetUtilized> list;

    public FleetUtilizedMetrics() {
    }

    public FleetUtilizedMetrics(String custId) {
        this.custId = custId;
    }

    public FleetUtilizedMetrics(String custId, List<FleetUtilized> list) {
        this.custId = custId;
        this.list = list;
    }

    public String getCustId() {
        return custId;
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

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public List<FleetUtilized> getList() {
        return list;
    }

    public void setList(List<FleetUtilized> list) {
        this.list = list;
    }
}
