package com.jetty.ssafficebe.user.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SsoInfo {

    private Long userId;
    private String email;
    private String name;
    private String regionCd;

}
