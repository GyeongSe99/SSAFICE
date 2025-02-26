package com.jetty.ssafficebe.schedule.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ScheduleStatusCount {
    private Long todoCount;
    private Long inProgressCount;
    private Long doneCount;
}
