package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nxtLife.msil.enums.Violations;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ViolationsCount {
    String custId;
    String custName;
    private Violations name;
    private int count;

    public ViolationsCount() {
    }

    public ViolationsCount(Violations name, int count) {
        this.name = name;
        this.count = count;
    }

    public ViolationsCount(String custId, Violations name, int count) {
        this.custId = custId;
        this.name = name;
        this.count = count;
    }

    public ViolationsCount(String custId, String custName, Violations name, int count) {
        this.custId = custId;
        this.custName = custName;
        this.name = name;
        this.count = count;
    }

    public Violations getName() {
        return name;
    }

    public void setName(Violations violations) {
        this.name = name;
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
