package com.example.beans;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class CoffeeShop {
    public final Coffee coffee;

    public CoffeeShop(@Qualifier("cappuccino") Coffee coffee) { // @Qualifier has the highest priority compared to @Primary
        this.coffee = coffee;
    }

    public Coffee getCoffee() {
        return coffee;
    }
}
