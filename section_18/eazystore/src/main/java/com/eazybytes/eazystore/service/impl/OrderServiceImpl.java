package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.constant.ApplicationConstants;
import com.eazybytes.eazystore.dto.response.OrderItemResponseDto;
import com.eazybytes.eazystore.dto.request.OrderRequestDto;
import com.eazybytes.eazystore.dto.response.OrderResponseDto;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.entity.Order;
import com.eazybytes.eazystore.entity.OrderItem;
import com.eazybytes.eazystore.entity.Product;
import com.eazybytes.eazystore.exception.ResourceNotFoundException;
import com.eazybytes.eazystore.repository.OrderRepository;
import com.eazybytes.eazystore.repository.ProductRepository;
import com.eazybytes.eazystore.service.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProfileServiceImpl profileService;

    @Override
    public void createOrder(OrderRequestDto orderRequest) {
        Customer customer = profileService.getAuthenticatedCustomer();

        // Create order
        Order order = new Order();
        order.setCustomer(customer);
        BeanUtils.copyProperties(orderRequest, order);
        order.setOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);

        // Map OrderItems
        List<OrderItem> orderItems = orderRequest.items().stream().map(
                item -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    Product product = productRepository.findById(item.productId())
                            .orElseThrow(() -> new ResourceNotFoundException("Product", "Product ID", item.productId().toString()));

                    orderItem.setProduct(product);
                    orderItem.setQuantity(item.quantity());
                    orderItem.setPrice(item.price());
                    return orderItem;
                }
        ).collect(Collectors.toList()); // all OrderItems is collected into a list
        order.setOrderItems(orderItems);
        orderRepository.save(order);
    }

    @Override
    public List<OrderResponseDto> getCustomerOrders() {
        Customer customer = profileService.getAuthenticatedCustomer();
        List<Order> orders = orderRepository.findByCustomerOrderByCreatedAtDesc(customer);
        return orders.stream().map(this::mapToOrderResponseDto).collect(Collectors.toList());
    }

    @Override
    public List<OrderResponseDto> getAllPendingOrders() {
        List<Order> orders = orderRepository.findByOrderStatus(ApplicationConstants.ORDER_STATUS_CREATED);
        return orders.stream().map(this::mapToOrderResponseDto).collect(Collectors.toList());
    }

    @Override
    public Order updateOrderStatus(Long orderId, String orderStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new ResourceNotFoundException("Order", "Order ID", orderId.toString())
        );
        order.setOrderStatus(orderStatus);
        return  orderRepository.save(order);
    }

    @Override
    public Order cancelOrderStatus(Long orderId, String orderStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow(
                () -> new ResourceNotFoundException("Order", "Order ID", orderId.toString())
        );
        order.setOrderStatus(orderStatus);
        return  orderRepository.save(order);
    }

    /*
            Map Order entity to OrderResponseDto
        */
    private OrderResponseDto mapToOrderResponseDto(Order order) {
        // Map order items
        List<OrderItemResponseDto> itemDTOs = order.getOrderItems().stream()
                .map(this::mapToOrderItemResponseDto)
                .collect(Collectors.toList());

        OrderResponseDto orderResponseDto = new OrderResponseDto(
                order.getOrderId(),
                order.getOrderStatus(),
                order.getTotalPrice(),
                order.getCreatedAt().toString(),
                itemDTOs);

        return orderResponseDto;
    }

    /*
        Map OrderItem entity to OrderItemResponseDto
    */
    private OrderItemResponseDto mapToOrderItemResponseDto(OrderItem orderItem) {
        OrderItemResponseDto itemDTO = new OrderItemResponseDto(
                orderItem.getProduct().getName(),
                orderItem.getQuantity(),
                orderItem.getPrice(),
                orderItem.getProduct().getImageUrl());

        return itemDTO;
    }
}
