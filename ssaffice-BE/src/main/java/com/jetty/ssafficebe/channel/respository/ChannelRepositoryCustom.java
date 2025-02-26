package com.jetty.ssafficebe.channel.respository;

import com.jetty.ssafficebe.channel.entity.Channel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChannelRepositoryCustom {

	Page<Channel> findChannelsByUserId(Long userId, Pageable pageable);

}
