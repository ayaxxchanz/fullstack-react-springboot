package com.example.beans;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("singleton") // Initialize 1 value yg immutable on initial run. Boleh pakai @Lazy untuk tak nak create dia on inital run
public class MyService {
    public MyService() {
        System.out.println("MyService bean created by Spring");
    }
}
