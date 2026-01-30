package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.request.PaymentIntentRequestDto;
import com.eazybytes.eazystore.dto.response.PaymentIntentResponseDto;

public interface IPaymentService {

    PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto);
}
