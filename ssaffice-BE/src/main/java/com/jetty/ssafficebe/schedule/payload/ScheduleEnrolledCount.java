package com.jetty.ssafficebe.schedule.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ScheduleEnrolledCount {

    private Long completedCount;
    private Long enrolledCount;
}
