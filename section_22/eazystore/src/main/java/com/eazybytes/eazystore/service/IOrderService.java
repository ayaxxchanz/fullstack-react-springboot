package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.request.OrderRequestDto;
import com.eazybytes.eazystore.dto.response.OrderResponseDto;
import com.eazybytes.eazystore.entity.Order;

import java.util.List;

public interface IOrderService {

    void createOrder(OrderRequestDto orderRequest);

    List<OrderResponseDto> getCustomerOrders();

    List<OrderResponseDto> getAllPendingOrders();

    void updateOrderStatus(Long orderId, String orderStatus);

    void cancelOrderStatus(Long orderId, String orderStatus);
}
