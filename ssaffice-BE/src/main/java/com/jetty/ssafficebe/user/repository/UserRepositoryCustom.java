package com.jetty.ssafficebe.user.repository;

import com.jetty.ssafficebe.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepositoryCustom {

    Page<User> findUsersByRoleId(String roleId, Pageable pageable);

    Page<User> getUsersByChannelId(String channelId, Pageable pageable);
}
