package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.UserDto;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.RequestEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/dummy")
@RequiredArgsConstructor
@Validated
public class DummyController {

    @PostMapping("/create-user")
    public String createUser(@RequestBody UserDto userDto) {
        System.out.println(userDto);
        return "User created successfully";
    }

    @PostMapping("/request-entity")
    public String requestEntity(RequestEntity<UserDto> requestEntity) {
        HttpHeaders headers = requestEntity.getHeaders();
        UserDto userDto = requestEntity.getBody();
        // not recommended to use this because need to manually extract the values:
        String queryString = requestEntity.getUrl().getQuery();
        String pathString = requestEntity.getUrl().getPath();
        return "Test.";
    }

    // Method 1
    @GetMapping("/headers")
    public String readHeaders(@RequestHeader(name="User-Agent") String userAgent,
                              @RequestHeader(name="User-Location", required = false) String userLocation) {
        return "Received headers with value: " + userAgent + " : " + userLocation;
    }

    // Method 2
//    @GetMapping("/headers")
//    public String readHeaders(@RequestHeader Map<String, String> headers) {
//        return "Received headers with value: " + headers;
//    }

//    // Method 3
//    @GetMapping("/headers")
//    public String readHeaders(@RequestHeader HttpHeaders headers) {
//        List<String> location = headers.get("User-Location");
//        return "Received headers with value: " + location;
//    }

    @GetMapping("/search")
    public String searchUser(@Size(min = 5, max = 30) @RequestParam(name="name", required = false, defaultValue="Guest") String userName) {
        // the String variable must match the query name. if not, define the name="realName" and String newName
        return "User searched: " + userName;
    }

    //    Method 1
    @GetMapping("/multiple-search")
    public String multipleSearchUser(@RequestParam String firstName, @RequestParam String lastName) {
        return "User searched: " + firstName + " " + lastName;
    }

    // Method 2
//    @GetMapping("/multiple-search")
//    public String multipleSearchUser(@RequestParam Map<String, String> params ) {
//        return "User searched: " + params.get("firstName") + " " + params.get("lastName");
//    }

    @GetMapping({"/user/{userId}", "/user/{userId}/posts/{postId}"})
    public String getUser(@PathVariable Long userId, @PathVariable(required=false) Long postId) {
        return "Searching for user: " + userId + " and post: " + postId;
    }

    @GetMapping({"/user/map/{userId}", "/user/map/{userId}/posts/{postId}"})
    public String getUserUsingMap(@PathVariable Map<Long, Long> pathVars) {
        return "Searching for user: " + pathVars.get("userId") + " and post: " + pathVars.get("postId");
    }
}
