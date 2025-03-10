package com.jetty.ssafficebe.schedule.payload;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ScheduleListResponse {

    List<ScheduleSummary> scheduleSummaries;
    ScheduleEnrolledCount scheduleEnrolledCount;
    ScheduleStatusCount scheduleStatusCount;
}
