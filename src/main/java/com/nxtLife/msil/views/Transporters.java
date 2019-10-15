package com.nxtLife.msil.views;

public class Transporters {
    private String custId;
    private String custName;

    public Transporters() {
    }

    public Transporters(String custId, String custName) {
        this.custId = custId;
        this.custName = custName;
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
