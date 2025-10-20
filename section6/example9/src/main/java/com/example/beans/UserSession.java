package com.example.beans;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@Scope("prototype") // Initialize value yg mutable, created bila dipanggil. Takde konsep @Lazy
public class UserSession {
    private String sessionId;

    public UserSession() {
        sessionId = UUID.randomUUID().toString();
    }

    public String getSessionId() {
        return sessionId;
    }
}
