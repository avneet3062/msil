package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class ViolationsMetrics {
    private  String custId;
    private String custName;
    private List<ViolationsCount> violations;

    public ViolationsMetrics() {
    }

    public ViolationsMetrics(String custId) {
        this.custId = custId;
    }

    public ViolationsMetrics(String custId, String custName, List<ViolationsCount> violations) {
        this.custId = custId;
        this.custName = custName;
        this.violations = violations;
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
}
