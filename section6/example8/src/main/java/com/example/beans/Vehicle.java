package com.example.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Vehicle {

    public final Engine engine;

    @Autowired
    public Vehicle(Engine engine) {
        this.engine = engine;
    }
}
