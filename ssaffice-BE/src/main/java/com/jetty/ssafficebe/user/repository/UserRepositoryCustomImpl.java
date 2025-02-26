package com.jetty.ssafficebe.user.repository;

import com.jetty.ssafficebe.channel.entity.QUserChannel;
import com.jetty.ssafficebe.common.jpa.AbstractQueryDslRepository;
import com.jetty.ssafficebe.role.entity.QUserRole;
import com.jetty.ssafficebe.user.entity.QUser;
import com.jetty.ssafficebe.user.entity.User;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class UserRepositoryCustomImpl extends AbstractQueryDslRepository implements UserRepositoryCustom {

    public UserRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
        super(queryFactory, entityManager);
    }

    @Override
    public Page<User> findUsersByRoleId(String roleId, Pageable pageable) {
        QUser user = QUser.user;
        QUserRole userRole = QUserRole.userRole;

        JPQLQuery<User> query = from(user).join(user.userRoles, userRole)
                                          .where(userRole.roleId.eq(roleId))
                                          .select(user);

        return getPageImpl(query, pageable);
    }

    @Override
    public Page<User> getUsersByChannelId(String channelId, Pageable pageable) {
        // 입력받은 channelId 가 현재 유저가 참여한 채널 중 존재하는 channelId일 경우
        QUser user = QUser.user;
        QUserChannel userChannel = QUserChannel.userChannel;
        JPQLQuery<User> query = from(user)
                .join(user.userChannels, userChannel)
                .where(userChannel.channelId.eq(channelId));

        return getPageImpl(query, pageable);
    }
}
