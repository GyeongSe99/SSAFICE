package com.jetty.ssafficebe.schedule.repository;

import com.jetty.ssafficebe.common.jpa.AbstractQueryDslRepository;
import com.jetty.ssafficebe.common.jpa.DateTimeConverter;
import com.jetty.ssafficebe.schedule.code.ScheduleStatusType;
import com.jetty.ssafficebe.schedule.entity.QSchedule;
import com.jetty.ssafficebe.schedule.entity.Schedule;
import com.jetty.ssafficebe.schedule.payload.ScheduleEnrolledCount;
import com.jetty.ssafficebe.schedule.payload.ScheduleFilterRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleStatusCount;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class ScheduleRepositoryCustomImpl extends AbstractQueryDslRepository implements ScheduleRepositoryCustom {

    public ScheduleRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
        super(queryFactory, entityManager);
    }

    // 기본 페이징 조회
    @Override
    public List<Schedule> findScheduleListByUserIdAndFilter(Long userId, ScheduleFilterRequest filter,
                                                            Sort sort) {
        QSchedule schedule = QSchedule.schedule;

        Predicate predicate = createPredicate(filter, schedule);

        JPQLQuery<Schedule> query = from(schedule)
                .where(schedule.userId.eq(userId))
                .where(predicate);

        return getSortedList(query, sort);
    }

    @Override
    public List<Schedule> findScheduleListByUserIdAndFilterByAdmin(Long userId, ScheduleFilterRequest filter,
                                                                   Sort sort) {
        QSchedule schedule = QSchedule.schedule;

        Predicate predicate = createPredicate(filter, schedule);

        JPQLQuery<Schedule> query = from(schedule)
                .where(schedule.createdBy.eq(userId))
                .where(predicate);

        return getSortedList(query, sort);
    }

    // 공지사항 일정 조회
    @Override
    public List<Schedule> findScheduleListByNoticeIdAndFilter(Long noticeId, ScheduleFilterRequest filter,
                                                              Sort sort) {
        QSchedule schedule = QSchedule.schedule;

        Predicate predicate = createPredicate(filter, schedule);

        JPQLQuery<Schedule> query = from(schedule)
                .where(schedule.noticeId.eq(noticeId))
                .where(predicate);

        return getSortedList(query, sort);
    }

    @Override
    public Page<Schedule> findUnregisteredSchedulePageByUserIdAndFilter(Long userId, ScheduleFilterRequest filter,
                                                                        Pageable pageable) {
        QSchedule schedule = QSchedule.schedule;

        Predicate predicate = createPredicate(filter, schedule);

        JPQLQuery<Schedule> query = from(schedule)
                .where(schedule.userId.eq(userId))
                .where(predicate)
                .where(schedule.endDateTime.gt(LocalDateTime.now()));

        return getPageImpl(query, pageable);
    }

    // 해야할일/진행중/완료 카운트
    @Override
    public ScheduleStatusCount getStatusCounts(List<Schedule> schedules) {
        // 필터링된 일정 리스트에서 상태별 카운트
        long todoCount = schedules.stream()
                                  .filter(s -> ScheduleStatusType.TODO.equals(s.getScheduleStatusType()))
                                  .count();

        long inProgressCount = schedules.stream()
                                        .filter(s -> ScheduleStatusType.IN_PROGRESS.equals(s.getScheduleStatusType()))
                                        .count();

        long doneCount = schedules.stream()
                                  .filter(s -> ScheduleStatusType.DONE.equals(s.getScheduleStatusType()))
                                  .count();

        return ScheduleStatusCount.builder()
                                  .todoCount(todoCount)
                                  .inProgressCount(inProgressCount)
                                  .doneCount(doneCount)
                                  .build();
    }

    // 등록 true+완료 / 등록 true 카운트
    @Override
    public ScheduleEnrolledCount getEnrolledCounts(List<Schedule> schedules) {
        // 등록된 일정 수
        long enrolledCount = schedules.stream()
                                      .filter(Schedule::isEnroll)
                                      .count();

        // 완료된 일정 수
        long completedCount = schedules.stream()
                                       .filter(Schedule::isEnroll)
                                       .filter(s -> ScheduleStatusType.DONE.equals(s.getScheduleStatusType()))
                                       .count();

        return ScheduleEnrolledCount.builder()
                                    .enrolledCount(enrolledCount)
                                    .completedCount(completedCount)
                                    .build();
    }

    private Predicate createPredicate(ScheduleFilterRequest filter, QSchedule schedule) {
        BooleanBuilder builder = new BooleanBuilder();

        if (filter.getEnrollYn() != null) {
            builder.and(schedule.enrollYn.eq(filter.getEnrollYn()));
        }

        if (filter.getScheduleSourceTypeCd() != null) {
            builder.and(schedule.scheduleSourceTypeCd.eq(filter.getScheduleSourceTypeCd()));
        }

        LocalDateTime start = DateTimeConverter.toLocalDateTime(filter.getStart());
        LocalDateTime end = DateTimeConverter.toLocalDateTime(filter.getEnd());
        String filterType = filter.getFilterType();

        if (filterType != null && start != null && end != null) {
            switch (filterType) {
                case "createdAt":
                    builder.and(schedule.createdAt.between(start, end));
                    break;
                case "endDateTime":
                    builder.and(schedule.endDateTime.between(start, end));
                    break;
                case "updatedAt":
                    builder.and(schedule.updatedAt.between(start, end));
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
