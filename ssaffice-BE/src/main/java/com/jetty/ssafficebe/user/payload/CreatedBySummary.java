package com.jetty.ssafficebe.user.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CreatedBySummary {

    private Long userId;
    private String email;
    private String name;
    private String profileImgUrl;
}
