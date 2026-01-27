package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.request.ProfileRequestDto;
import com.eazybytes.eazystore.dto.response.ProfileResponseDto;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final IProfileService profileService;

    @GetMapping
    public ResponseEntity<ProfileResponseDto> getProfile(){
        ProfileResponseDto profileResponseDto = profileService.getProfile();
        return ResponseEntity.ok(profileResponseDto);
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDto> updateProfile(@Validated @RequestBody ProfileRequestDto profileRequestDto){
        ProfileResponseDto profileResponseDto = profileService.updateProfile(profileRequestDto);
        return ResponseEntity.ok(profileResponseDto);
    }
}
