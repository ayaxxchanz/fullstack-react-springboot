package com.example.main;

import com.example.beans.Coffee;
import com.example.beans.CoffeeShop;
import com.example.config.ProjectConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class SpringMain {
    static void main(String[] args) {
        var context = new AnnotationConfigApplicationContext(ProjectConfig.class);

        CoffeeShop shop = context.getBean(CoffeeShop.class);
        Coffee coffee = context.getBean(Coffee.class);
        System.out.println("Coffee from Spring Context is: " +
                shop.getCoffee().makeCoffee());
//        System.out.println("Vehicle name from Spring Context is: " + vehicle.getName());
//        System.out.println("Engine that Vehicle own is: " + vehicle.getEngine());
    }
}
