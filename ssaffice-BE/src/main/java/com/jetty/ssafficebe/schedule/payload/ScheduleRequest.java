package com.jetty.ssafficebe.schedule.payload;

import com.jetty.ssafficebe.remind.payload.RemindRequest;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleRequest {

    @NotNull
    private String title;
    private String memo;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String scheduleStatusTypeCd;
    private String scheduleSourceTypeCd;
    private List<RemindRequest> remindRequests;
}
