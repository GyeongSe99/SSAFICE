package com.jetty.ssafficebe.channel.respository;

import com.jetty.ssafficebe.channel.entity.Channel;
import com.jetty.ssafficebe.channel.entity.QChannel;
import com.jetty.ssafficebe.channel.entity.QUserChannel;
import com.jetty.ssafficebe.common.jpa.AbstractQueryDslRepository;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class ChannelRepositoryCustomImpl extends AbstractQueryDslRepository implements ChannelRepositoryCustom {
	public ChannelRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
		super(queryFactory, entityManager);
	}
	public Page<Channel> findChannelsByUserId(Long userId, Pageable pageable) {
		QChannel channel = QChannel.channel;
		QUserChannel userChannel = QUserChannel.userChannel;

		JPQLQuery<Channel> query = from(channel)
			.join(channel.userChannels, userChannel)
			.where(userChannel.userId.eq(userId))
			.select(channel);

		return getPageImpl(query, pageable);
	}

}
