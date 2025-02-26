package com.jetty.ssafficebe.channel.respository;

import com.jetty.ssafficebe.channel.entity.UserChannel;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserChannelRepository extends JpaRepository<UserChannel, Long> {

    List<UserChannel> findDistinctByUserId(Long userId);

    List<UserChannel> findByChannelId(String channelId);

    @Query("SELECT uc.channelId FROM UserChannel uc WHERE uc.userId = :userId")
    List<String> findChannelIdsByUserId(@Param("userId") Long userId);

    List<UserChannel> findAllByUserIdAndChannelIdNotIn(Long userId, List<String> list);
}
