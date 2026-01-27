package com.eazybytes.eazystore.dto.response;

import com.eazybytes.eazystore.dto.UserDto;

public record LoginResponseDto(String message, UserDto user, String jwtToken) {
}
