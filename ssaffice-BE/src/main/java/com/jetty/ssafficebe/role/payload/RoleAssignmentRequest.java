package com.jetty.ssafficebe.role.payload;

import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoleAssignmentRequest {

    private List<Long> userIds = new ArrayList<>();
}
