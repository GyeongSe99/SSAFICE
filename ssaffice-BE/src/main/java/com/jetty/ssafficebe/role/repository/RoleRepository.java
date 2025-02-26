package com.jetty.ssafficebe.role.repository;

import com.jetty.ssafficebe.role.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String>, RoleRepositoryCustom {

}
