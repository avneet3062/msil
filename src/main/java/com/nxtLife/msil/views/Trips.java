package com.nxtLife.msil.views;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class Trips {

    private String tripType;
    private String count;

    public Trips(String tripType, String count) {
        this.tripType = tripType;
        this.count = count;
    }
}
