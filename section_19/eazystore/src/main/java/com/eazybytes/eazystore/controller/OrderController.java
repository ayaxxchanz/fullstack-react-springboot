package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.request.OrderRequestDto;
import com.eazybytes.eazystore.dto.response.OrderResponseDto;
import com.eazybytes.eazystore.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor()
public class OrderController {

    private final IOrderService iOrderService;

    @PostMapping
    public ResponseEntity<String> createOrder(@RequestBody OrderRequestDto orderRequest) {
        iOrderService.createOrder(orderRequest);
        return ResponseEntity.ok("Order created successfully!");
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDto>> loadCustomerOrders() { // return as List because one customer can have many orders
        return ResponseEntity.ok(iOrderService.getCustomerOrders());
    }
}
