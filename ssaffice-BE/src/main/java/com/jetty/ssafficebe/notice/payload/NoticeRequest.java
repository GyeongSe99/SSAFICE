package com.jetty.ssafficebe.notice.payload;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeRequest {

    private String mmMessageId;
    private String title;
    private String content;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String noticeTypeCd;
    private String essentialYn;
    private String channelId;

}