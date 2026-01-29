package com.eazybytes.eazystore.dto.response;

import java.math.BigDecimal;

// details that we want to display in the frontend
// dont send all details as it can impact performance
public record OrderItemResponseDto(String productName, Integer quantity,
                                   BigDecimal price, String imageUrl) {
}
