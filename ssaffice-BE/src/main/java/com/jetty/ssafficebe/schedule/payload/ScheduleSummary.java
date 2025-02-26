package com.jetty.ssafficebe.schedule.payload;

import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.user.payload.CreatedBySummary;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleSummary {

    private String scheduleId;
    private String title;
    private LocalDateTime createdAt;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String scheduleSourceTypeCd;
    private String scheduleStatusTypeCd;
    private String essentialYn;
    private String enrollYn;
    private CreatedBySummary chargeUser;
    private CreatedBySummary createUser;
    private NoticeSummary noticeSummary;
}
