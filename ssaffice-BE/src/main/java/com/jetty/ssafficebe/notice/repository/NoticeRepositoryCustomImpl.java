package com.jetty.ssafficebe.notice.repository;

import com.jetty.ssafficebe.common.jpa.AbstractQueryDslRepository;
import com.jetty.ssafficebe.common.jpa.DateTimeConverter;
import com.jetty.ssafficebe.common.payload.BaseFilterRequest;
import com.jetty.ssafficebe.notice.entity.Notice;
import com.jetty.ssafficebe.notice.entity.QNotice;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public class NoticeRepositoryCustomImpl extends AbstractQueryDslRepository implements NoticeRepositoryCustom {

    public NoticeRepositoryCustomImpl(JPAQueryFactory queryFactory,
                                      EntityManager entityManager) {
        super(queryFactory, entityManager);
    }


    @Override
    public List<Notice> getNoticeListByCreateUserAndFilter(Long userId, BaseFilterRequest filter,
                                                           Sort sort) {
        QNotice notice = QNotice.notice;

        // 필터 조건 생성
        Predicate predicate = createPredicate(filter, notice);

        JPQLQuery<Notice> noticeList = from(notice)
                .where(notice.createUser.userId.eq(userId))
                .where(predicate);

        return getSortedList(noticeList, sort);
    }

    private Predicate createPredicate(BaseFilterRequest filter, QNotice notice) {
        BooleanBuilder builder = new BooleanBuilder();

        LocalDateTime start = DateTimeConverter.toLocalDateTime(filter.getStart());
        LocalDateTime end = DateTimeConverter.toLocalDateTime(filter.getEnd());
        String filterType = filter.getFilterType();

        if (filterType != null && start != null && end != null) {
            switch (filterType) {
                case "createdAt":
                    builder.and(notice.createdAt.between(start, end));
                    break;
                case "endDateTime":
                    builder.and(notice.endDateTime.between(start, end));
                    break;
                default:
                    throw new IllegalArgumentException("유효하지 않은 필터 타입: " + filterType);
            }
        } else if (filterType != null) {
            throw new IllegalArgumentException("필터 타입이 지정된 경우 시작 및 종료 날짜 시간이 모두 필요합니다.");
        }

        return builder;
    }
}
