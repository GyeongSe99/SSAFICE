package com.jetty.ssafficebe.notice.payload;

import com.jetty.ssafficebe.file.payload.AttachmentFileSummary;
import com.jetty.ssafficebe.user.payload.CreatedBySummary;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDetail {

    private Long noticeId;
    private String title;
    private String content;
    private String noticeTypeCd;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private LocalDateTime createdAt;
    private String essentialYn;
    private CreatedBySummary createUser;
    private boolean owner; // 글의 주인인지 아닌지
    private List<AttachmentFileSummary> attachmentFiles;
}
