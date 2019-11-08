package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class ViolationsMetrics {
    private  String custId;
    private String custName;
    private Integer year;
    private Integer month;
    private Integer day;
    private List<ViolationsCount> violations;
    private List<ViolationsMetrics> violationsMetricsList;
    ViolationsCount violationsCount;

    public ViolationsMetrics() {
    }

    public ViolationsMetrics(String custId) {
        this.custId = custId;
    }

    public ViolationsMetrics(Integer month) {
        this.month = month;
    }

    public ViolationsMetrics(String custId, String custName, List<ViolationsCount> violations) {
        this.custId = custId;
        this.custName = custName;
        this.violations = violations;
    }

    public Integer getDay() {
        return day;
    }

    public void setDay(Integer day) {
        this.day = day;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }

    public List<ViolationsCount> getViolations() {
        return violations;
    }

    public void setViolations(List<ViolationsCount> violations) {
        this.violations = violations;
    }

    public Integer getYear() { return year; }

    public void setYear(Integer year) { this.year = year; }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public List<ViolationsMetrics> getViolationsMetricsList() {
        return violationsMetricsList;
    }

    public void setMetricsList(List<ViolationsMetrics> violationsMetricsList) {
        this.violationsMetricsList = violationsMetricsList;
    }

    public ViolationsCount getViolationsCount() {
        return violationsCount;
    }

    public void setViolationsCount(ViolationsCount violationsCount) {
        this.violationsCount = violationsCount;
    }
}
