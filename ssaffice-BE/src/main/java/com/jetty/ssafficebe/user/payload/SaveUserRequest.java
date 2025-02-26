package com.jetty.ssafficebe.user.payload;

import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaveUserRequest {

    @NotNull
    private String email;
    @NotNull
    private String password;
    @NotNull
    private String name;
    @NotNull
    private List<String> roleIds = new ArrayList<>();
    private Integer cohortNum;
    private String regionCd;
    private Integer classNum;
    private String trackCd;
}
