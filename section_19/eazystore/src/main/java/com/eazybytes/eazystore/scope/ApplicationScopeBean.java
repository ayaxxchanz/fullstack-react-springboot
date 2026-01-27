package com.eazybytes.eazystore.scope;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;

@Component
@Getter
@ApplicationScope
@Slf4j
public class ApplicationScopeBean {
    private int visitorCount;

    public void incrementVisitorCount() {
        visitorCount++;
    }

    public ApplicationScopeBean(){
        log.info("ApplicationScopeBean initialized.");
    }
}
