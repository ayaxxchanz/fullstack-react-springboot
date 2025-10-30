package com.eazybytes.eazystore.scope;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

@Component
@Getter
@Setter
@RequestScope
@Slf4j
public class RequestScopeBean {
    private String userName;

    public RequestScopeBean() {
        log.info("RequestScopeBean initialized.");
    }
}
