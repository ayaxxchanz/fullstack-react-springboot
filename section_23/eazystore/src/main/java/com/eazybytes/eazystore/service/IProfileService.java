package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.request.ProfileRequestDto;
import com.eazybytes.eazystore.dto.response.ProfileResponseDto;

public interface IProfileService {
    ProfileResponseDto getProfile();
    ProfileResponseDto updateProfile(ProfileRequestDto profileRequestDto);
}
