package com.eazybytes.eazystore.scope;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@Getter
@Setter
@SessionScope
@Slf4j
public class SessionScopeBean {
    private String userName;

    public SessionScopeBean() {
        log.info("SessionScopeBean initialized.");
    }
}
