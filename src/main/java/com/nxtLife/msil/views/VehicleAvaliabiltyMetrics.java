package com.nxtLife.msil.views;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class VehicleAvaliabiltyMetrics {

    private String range;
    private int count;

    public VehicleAvaliabiltyMetrics(String range, int count) {
        this.range = range;
        this.count = count;
    }

    public String getRange() {
        return range;
    }

    public void setRange(String range) {
        this.range = range;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }
}
