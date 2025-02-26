package com.jetty.ssafficebe.schedule.repository;

import com.jetty.ssafficebe.schedule.entity.Schedule;
import com.jetty.ssafficebe.schedule.payload.ScheduleEnrolledCount;
import com.jetty.ssafficebe.schedule.payload.ScheduleFilterRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleStatusCount;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public interface ScheduleRepositoryCustom {

    List<Schedule> findScheduleListByUserIdAndFilter(Long userId, ScheduleFilterRequest filterRequest, Sort sort);

    List<Schedule> findScheduleListByUserIdAndFilterByAdmin(Long userId, ScheduleFilterRequest filterRequest,
                                                            Sort sort);

    List<Schedule> findScheduleListByNoticeIdAndFilter(Long noticeId, ScheduleFilterRequest filterRequest, Sort sort);

    Page<Schedule> findUnregisteredSchedulePageByUserIdAndFilter(Long userId, ScheduleFilterRequest filterRequest,
                                                                 Pageable pageable);

    ScheduleStatusCount getStatusCounts(List<Schedule> schedules);

    ScheduleEnrolledCount getEnrolledCounts(List<Schedule> schedules);
}
