package com.jetty.ssafficebe.notice.payload;

import com.jetty.ssafficebe.schedule.payload.ScheduleEnrolledCount;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeSummaryForAdmin {

    private NoticeSummary noticeSummary;
    private ScheduleEnrolledCount scheduleEnrolledCount;

}
