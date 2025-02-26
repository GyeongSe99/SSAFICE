package com.jetty.ssafficebe.user.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRequestForSso {
    private String userId;
    private String loginId; // email
    private String name;
    private String entRegnCd;

    public void setEmail(String email) {
        this.loginId = email;
    }

}
