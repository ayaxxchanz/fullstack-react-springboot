package com.eazybytes.eazystore.util;

import com.eazybytes.eazystore.constant.ApplicationConstant;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final Environment env;

    public String generateJwtToken(Authentication authentication) {
        String jwt = "";
        String secret = env.getProperty(ApplicationConstant.JWT_SECRET_KEY,
                ApplicationConstant.JWT_SECRET_DEFAULT_VALUE);
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        User fetchedUser = (User) authentication.getPrincipal();
        // generate header, payload & digital signature
        jwt = Jwts.builder().issuer("Eazy Store").subject("JWT Token")
                .claim("username",  fetchedUser.getUsername()) // claim(key, value)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + 60 * 60 * 1000)) // 1 hour expiration
                .signWith(secretKey).compact();

        return jwt;
    }
}
