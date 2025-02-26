package com.jetty.ssafficebe.mattermost.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MMLoginRequest {
    @JsonProperty("login_id")
    String loginId;
    String password;
}
