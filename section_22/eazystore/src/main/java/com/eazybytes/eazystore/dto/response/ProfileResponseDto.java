package com.eazybytes.eazystore.dto.response;

import com.eazybytes.eazystore.dto.AddressDto;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProfileResponseDto {
    private Long customerId;
    private String name;
    private String email;
    private String mobileNumber;
    private AddressDto address;
    private boolean emailUpdated;
}
