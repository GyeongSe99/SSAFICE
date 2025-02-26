package com.jetty.ssafficebe.schedule.payload;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminScheduleRequest {
    private ScheduleRequest scheduleRequest;
    private List<Long> userIds;
}
