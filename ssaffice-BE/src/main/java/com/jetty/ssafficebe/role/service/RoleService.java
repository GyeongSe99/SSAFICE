package com.jetty.ssafficebe.role.service;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.role.payload.RoleAssignmentRequest;
import com.jetty.ssafficebe.role.payload.RoleDTO;
import com.jetty.ssafficebe.role.payload.RoleSummarySimple;
import com.jetty.ssafficebe.user.payload.UserSummary;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RoleService {

    List<RoleSummarySimple> getRoleList();

    ApiResponse assignRoleToUsers(String roleId, RoleAssignmentRequest request);

    ApiResponse saveRole(RoleDTO request);

    ApiResponse deleteRole(String roleId);

    Page<UserSummary> getUserListByRole(String roleId, Pageable pageable);


}

