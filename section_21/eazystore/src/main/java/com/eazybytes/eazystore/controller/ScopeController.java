package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.scope.ApplicationScopeBean;
import com.eazybytes.eazystore.scope.RequestScopeBean;
import com.eazybytes.eazystore.scope.SessionScopeBean;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/scope")
@RequiredArgsConstructor
public class ScopeController {
    private final RequestScopeBean requestScopeBean;
    private final SessionScopeBean sessionScopeBean;
    private final ApplicationScopeBean applicationScopeBean;

    @GetMapping("/request")
    public ResponseEntity<String> testRequestScope() {
        requestScopeBean.setUserName("John Doe");
        return ResponseEntity.ok().body(requestScopeBean.getUserName());
    }

    @GetMapping("/session")
    public ResponseEntity<String> testSessionScope() {
        sessionScopeBean.setUserName("John Doe");
        return ResponseEntity.ok().body(sessionScopeBean.getUserName());
    }

    @GetMapping("/application")
    public ResponseEntity<Integer> testApplicationScope() {
        applicationScopeBean.incrementVisitorCount();
        return ResponseEntity.ok().body(applicationScopeBean.getVisitorCount());
    }

    @GetMapping("/test")
    //public ResponseEntity<String> testScope() {
    public ResponseEntity<Integer> testScope() {
        // return ResponseEntity.ok().body(requestScopeBean.getUserName());
        // return ResponseEntity.ok().body(sessionScopeBean.getUserName());
        return ResponseEntity.ok().body(applicationScopeBean.getVisitorCount());
    }
}
