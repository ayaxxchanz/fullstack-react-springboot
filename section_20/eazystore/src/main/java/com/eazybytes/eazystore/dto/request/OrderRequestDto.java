package com.eazybytes.eazystore.dto.request;

import com.eazybytes.eazystore.dto.OrderItemDto;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequestDto(BigDecimal totalPrice,
                              String paymentId,
                              String paymentStatus,
                              List<OrderItemDto> items) {

}
