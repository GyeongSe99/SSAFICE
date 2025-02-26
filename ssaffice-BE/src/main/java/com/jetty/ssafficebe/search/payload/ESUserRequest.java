package com.jetty.ssafficebe.search.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ESUserRequest {

    private Long userId;
    private String email;
    private String name;
    private String profileImgUrl;
}
