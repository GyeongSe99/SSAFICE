package com.jetty.ssafficebe.schedule.payload;

import com.jetty.ssafficebe.notice.payload.NoticeDetail;
import com.jetty.ssafficebe.remind.payload.RemindSummary;
import com.jetty.ssafficebe.user.payload.CreatedBySummary;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleDetail {

    private Long scheduleId;
    private String title;
    private String memo;
    private LocalDateTime createdAt;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String scheduleSourceTypeCd;
    private String scheduleStatusTypeCd;
    private String essentialYn;
    private String enrollYn;
    private CreatedBySummary chargeUser;
    private CreatedBySummary createUser;
    private NoticeDetail noticeDetail;
    private List<RemindSummary> remindSummarys;
}
