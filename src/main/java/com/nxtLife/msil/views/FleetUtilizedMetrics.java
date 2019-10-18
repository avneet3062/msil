package com.nxtLife.msil.views;

import java.util.List;

public class FleetUtilizedMetrics {

    String custId;
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
