package com.nxtLife.msil.views;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nxtLife.msil.enums.Violations;

@JsonInclude(value = JsonInclude.Include.NON_DEFAULT)
public class ViolationsCount {
    String custId;
    String custName;
    private Violations name;
    private int count;
    int month;
    int day;

    public ViolationsCount() {
    }

    public ViolationsCount(Violations name, int count, int month) {
        this.name = name;
        this.count = count;
        this.month = month;
    }

    public ViolationsCount(  int count,Violations name,int day) {
        this.name = name;
        this.count = count;
        this.day = day;
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

    public ViolationsCount(int month) {
        this.month = month;
    }

    public ViolationsCount(String custId, String custName, Violations name, int count) {
        this.custId = custId;
        this.custName = custName;
        this.name = name;
        this.count = count;
    }
    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
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
