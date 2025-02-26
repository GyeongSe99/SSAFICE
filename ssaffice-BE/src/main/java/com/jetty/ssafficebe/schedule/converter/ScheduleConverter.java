package com.jetty.ssafficebe.schedule.converter;

import com.jetty.ssafficebe.notice.converter.NoticeConverter;
import com.jetty.ssafficebe.remind.converter.RemindConverter;
import com.jetty.ssafficebe.schedule.entity.Schedule;
import com.jetty.ssafficebe.schedule.payload.ScheduleDetail;
import com.jetty.ssafficebe.schedule.payload.ScheduleRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleSummary;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.WARN, uses = {
        RemindConverter.class, NoticeConverter.class})
public interface ScheduleConverter {

    Schedule toSchedule(Long userId, Long noticeId);

    Schedule toSchedule(ScheduleRequest scheduleRequest);

    @Mapping(target = "remindSummarys", source = "reminds")
    @Mapping(target = "noticeDetail", source = "notice")
    @Mapping(target = "chargeUser", source = "user")
    @Mapping(target = "createUser", source = "schedule.createUser")
    ScheduleDetail toScheduleDetail(Schedule schedule);

    @Mapping(target = "chargeUser", source = "user")
    @Mapping(target = "createUser", source = "schedule.createUser")
    @Mapping(target = "noticeSummary", source = "notice")
    ScheduleSummary toScheduleSummary(Schedule schedule);
}