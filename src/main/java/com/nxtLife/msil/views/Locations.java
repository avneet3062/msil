package com.nxtLife.msil.views;

public class Locations {
    private String locName;
    private String code;

    public Locations() {
    }

    public Locations(String locName, String code) {
        this.locName = locName;
        this.code = code;
    }

    public String getLocName() {
        return locName;
    }

    public void setLocName(String locName) {
        this.locName = locName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
