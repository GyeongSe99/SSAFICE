package com.jetty.ssafficebe.role.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class RoleDTO {

    String roleId;
    String description;
}
