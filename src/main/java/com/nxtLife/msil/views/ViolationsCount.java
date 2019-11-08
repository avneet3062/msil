package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nxtLife.msil.enums.Violations;

@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ViolationsCount {
    String custId;
    String custName;
    private Violations name;
    private Integer count;
    int type;



    public ViolationsCount() {
    }

    public ViolationsCount(Violations name, Integer count, int type) {
        this.name = name;
        this.count = count;
        this.type = type;
    }

    public ViolationsCount(Violations name, Integer count) {
        this.name = name;
        this.count = count;
    }
    public ViolationsCount(Violations name) {
        this.name = name;
        this.count = count;
    }

    public ViolationsCount(String custId, Violations name, Integer count) {
        this.custId = custId;
        this.name = name;
        this.count = count;
    }

    public ViolationsCount(int type) {
        this.type = type;
    }

    public ViolationsCount(String custId, String custName, Violations name, Integer count) {
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

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getCustId() {
        return custId;
    }

    public void setCustId(String custId) {
        this.custId = custId;
    }

    public int getType() {
        return type;}

    public void setType(int type) {
        this.type = type; }



    public String getCustName() {
        return custName;
    }

    public void setCustName(String custName) {
        this.custName = custName;
    }
}
