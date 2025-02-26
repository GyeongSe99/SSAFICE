package com.jetty.ssafficebe.role.converter;

import com.jetty.ssafficebe.role.entity.Role;
import com.jetty.ssafficebe.role.payload.RoleDTO;
import com.jetty.ssafficebe.role.payload.RoleSummarySimple;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface RoleConverter {

    RoleSummarySimple toRoleSummarySimple(Role role);

    Role toRole(RoleDTO request);

    RoleDTO toRoleDTO(Role role);
}
