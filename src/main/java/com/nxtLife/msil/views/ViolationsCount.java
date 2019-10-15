package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nxtLife.msil.enums.Violations;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class ViolationsCount {
    String custId;
    String custName;
    private Violations violations;
    private int count;

    public ViolationsCount() {
    }

    public ViolationsCount(Violations violations, int count) {
        this.violations = violations;
        this.count = count;
    }

    public ViolationsCount(String custId, Violations violations, int count) {
        this.custId = custId;
        this.violations = violations;
        this.count = count;
    }

    public ViolationsCount(String custId, String custName, Violations violations, int count) {
        this.custId = custId;
        this.custName = custName;
        this.violations = violations;
        this.count = count;
    }

    public Violations getViolations() {
        return violations;
    }

    public void setViolations(Violations violations) {
        this.violations = violations;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
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
}
