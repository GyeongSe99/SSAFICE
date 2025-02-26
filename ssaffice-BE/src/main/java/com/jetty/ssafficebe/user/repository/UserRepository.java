package com.jetty.ssafficebe.user.repository;

import com.jetty.ssafficebe.user.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    Optional<User> findBySsafyUUID(String userId);

    List<User> findDistinctByUserChannels_ChannelId(String channelId);
}
