package com.jetty.ssafficebe.auth.payload;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthenticationResponse {

    private Long userId;
    private String jwt;
    private boolean isSuccess;
}
