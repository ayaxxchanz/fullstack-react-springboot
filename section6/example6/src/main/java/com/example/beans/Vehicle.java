package com.example.beans;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Vehicle {
    private String name;

/*    @Autowired // field injection (not recommended, data is mutable)
    private Engine engine;*/

    // this Bean is now immutable
    private final Engine engine;

    @Autowired
    public Vehicle(Engine engine) {
        this.engine = engine;
        System.out.println("Vehicle bean created by Spring");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void sayHello() {
        System.out.println("Printing Hello from Component Vehicle Bean");
    }

    public Engine getEngine() {
        return engine;
    }

/*    @Autowired  // setter injection (not recommended, data is mutable)
    public void setEngine(Engine engine) {
        this.engine = engine;
    }*/

    @Override
    public String toString() {
        return "Vehicle{" +
                "name='" + name + '\'' +
                '}';
    }

    @PostConstruct
    public void initialize() {
        this.name = "Lucy";
    }
}
