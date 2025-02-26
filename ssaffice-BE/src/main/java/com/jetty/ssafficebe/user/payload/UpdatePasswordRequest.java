package com.jetty.ssafficebe.user.payload;

import lombok.Getter;

@Getter
public class UpdatePasswordRequest {

    private String oldPassword;
    private String newPassword;
}
