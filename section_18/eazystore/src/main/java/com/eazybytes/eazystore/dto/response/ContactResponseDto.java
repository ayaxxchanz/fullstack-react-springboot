package com.eazybytes.eazystore.dto.response;

public record ContactResponseDto(Long contactId, String name, String email,
                                 String mobileNumber, String message, String status) {
}
