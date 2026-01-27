package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.request.PaymentIntentRequestDto;
import com.eazybytes.eazystore.dto.response.PaymentIntentResponseDto;
import com.eazybytes.eazystore.service.IPaymentService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements IPaymentService {

    @Override
    public PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto requestDto) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(requestDto.amount())
                    .setCurrency(requestDto.currency())
                    .addPaymentMethodType("card").build();

            PaymentIntent paymentIntent = PaymentIntent.create(params); // connect to Stripe API and ask for client secret for the session
            return new PaymentIntentResponseDto(paymentIntent.getClientSecret());
        } catch (StripeException e) {
            throw new RuntimeException("Failed to create payment intent", e);
        }
    }
}
