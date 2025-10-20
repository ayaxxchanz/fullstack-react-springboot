package com.example.config;

import com.example.beans.Person;
import com.example.beans.Vehicle;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class ProjectConfig {
    @Bean
    public Vehicle vehicle() {
        Vehicle vehicle = new Vehicle();
        vehicle.setName("Tesla");
        return vehicle;
    }

/*    @Bean
    public Person person() {
        Person person = new Person();
        person.setName("John");
        person.setVehicle(vehicle());  // Using method invocation
        return person;
    }*/

    @Bean
    public Person person(Vehicle vehicle) {
        Person person = new Person();
        person.setName("John");
        person.setVehicle(vehicle); // Using method parameters
        return person;
    }
}
