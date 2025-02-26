package com.jetty.ssafficebe.schedule.repository;

import com.jetty.ssafficebe.schedule.entity.Schedule;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>, ScheduleRepositoryCustom {

    List<Schedule> findAllByNoticeId(Long noticeId);

    List<Schedule> findAllByUserId(Long userId);

    List<Schedule> findByUserIdAndEnrollYn(Long userId, String y);
}
