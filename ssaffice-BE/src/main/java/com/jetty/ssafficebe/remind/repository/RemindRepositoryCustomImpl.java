package com.jetty.ssafficebe.remind.repository;

import com.jetty.ssafficebe.common.jpa.AbstractQueryDslRepository;
import com.jetty.ssafficebe.remind.entity.QRemind;
import com.jetty.ssafficebe.remind.entity.Remind;
import com.jetty.ssafficebe.schedule.entity.QSchedule;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.time.LocalDateTime;
import java.util.List;

public class RemindRepositoryCustomImpl extends AbstractQueryDslRepository implements RemindRepositoryCustom {

    public RemindRepositoryCustomImpl(JPAQueryFactory queryFactory, EntityManager entityManager) {
        super(queryFactory, entityManager);
    }

    @Override
    public boolean existsDuplicateRemind(Long scheduleId, String remindTypeCd, LocalDateTime remindDateTime) {
        QRemind remind = QRemind.remind;

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(remind.scheduleId.eq(scheduleId));

        if ("DAILY".equals(remindTypeCd)) {
            // DAILY: 같은 시간대 체크
            builder.and(remind.remindTypeCd.eq("DAILY"))
                   .and(remind.remindDateTime.hour().eq(remindDateTime.getHour()))
                   .and(remind.remindDateTime.minute().eq(remindDateTime.getMinute()));
        } else {
            // ONCE: 매일 알림 or 같은 시점 알림 체크
            builder.and(
                    remind.remindTypeCd.eq("DAILY").and(
                                  remind.remindDateTime.hour().eq(remindDateTime.getHour())
                                                       .and(remind.remindDateTime.minute().eq(remindDateTime.getMinute()))
                          )
                                       .or(
                                               remind.remindTypeCd.eq("ONCE")
                                                                  .and(remind.remindDateTime.eq(remindDateTime))
                                       )
            );
        }

        return queryFactory.selectOne().from(remind).where(builder).fetchFirst() != null;
    }

    @Override
    public List<Remind> findCurrentReminders(LocalDateTime now) {
        QRemind remind = QRemind.remind;
        QSchedule schedule = QSchedule.schedule;

        return queryFactory
                .selectFrom(remind)
                .innerJoin(remind.schedule, schedule).fetchJoin()
                .where(
                        remind.activeYn.eq("Y"),
                        schedule.endDateTime.isNull().or(schedule.endDateTime.gt(now)),
                        remind.remindTypeCd.eq("DAILY")
                                           .and(timeEquals(remind.remindDateTime, now))
                                           .or(
                                                   remind.remindTypeCd.eq("ONCE")
                                                                      .and(dateTimeEquals(remind.remindDateTime, now))
                                           )
                )
                .fetch();
    }

    @Override
    public long expireOldReminders(LocalDateTime now) {
        QRemind remind = QRemind.remind;

        return queryFactory
                .update(remind)
                .set(remind.activeYn, "N")
                .where(
                        remind.activeYn.eq("Y"),
                        remind.remindTypeCd.eq("DAILY")
                                           .and(remind.schedule.endDateTime.isNotNull())
                                           .and(remind.schedule.endDateTime.lt(now))
                                           .or(
                                                   remind.remindTypeCd.eq("ONCE")
                                                                      .and(dateTimeEquals(remind.remindDateTime,
                                                                                          now).not())
                                                                      .and(remind.remindDateTime.lt(now))
                                           )
                )
                .execute();
    }

    // 시간만 비교 (HH)
    private BooleanExpression timeEquals(DateTimePath<LocalDateTime> datetime, LocalDateTime now) {
        return datetime.hour().eq(now.getHour());
    }

    // 년,월,일,시까지만 비교 (분 제외)
    private BooleanExpression dateTimeEquals(DateTimePath<LocalDateTime> datetime, LocalDateTime now) {
        return Expressions.dateTimeTemplate(LocalDateTime.class, "DATE_FORMAT({0}, '%Y-%m-%d %H')", datetime)
                          .eq(Expressions.dateTimeTemplate(LocalDateTime.class, "DATE_FORMAT({0}, '%Y-%m-%d %H')",
                                                           now));
    }
}
