package com.eazybytes.eazystore.util;

import com.eazybytes.eazystore.constant.ApplicationConstants;
import com.eazybytes.eazystore.entity.Customer;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtUtil {
    private final Environment env;

    public String generateJwtToken(Authentication authentication) {
        String jwt = "";
        String secret = env.getProperty(ApplicationConstants.JWT_SECRET_KEY,
                ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Customer fetchedCustomer = (Customer) authentication.getPrincipal();
        // generate header, payload & digital signature
        jwt = Jwts.builder().issuer("Eazy Store").subject("JWT Token")
                .claim("username",  fetchedCustomer.getName()) // claim(key, value)
                .claim("email",  fetchedCustomer.getEmail()) // claim(key, value)
                .claim("mobileNumber",  fetchedCustomer.getMobileNumber()) // claim(key, value)
                .claim("roles",  authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + 24 * 60 * 60 * 1000)) // token expired after 24 hour
                .signWith(secretKey).compact();

        return jwt;
    }
}
