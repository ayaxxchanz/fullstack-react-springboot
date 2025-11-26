package com.eazybytes.eazystore.security;

import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
@RequiredArgsConstructor
public class EazyStoreUsernamePwdAuthenticationProvider implements AuthenticationProvider {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        Customer customer = customerRepository.findByEmail(username).orElseThrow(
                () -> new UsernameNotFoundException("Username not found for the user: " + username)
        );
        if(passwordEncoder.matches(password, customer.getPasswordHash())){
            // not recommended to carry around the password so it is set to NULL
            return new UsernamePasswordAuthenticationToken(customer, null, Collections.emptyList());
        }
        else {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @Override
    public boolean supports(Class<?> authentication){
        // to support only username and password -style of authentication in this Provider
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

}
