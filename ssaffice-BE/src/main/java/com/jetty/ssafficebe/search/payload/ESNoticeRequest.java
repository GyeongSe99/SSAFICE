package com.jetty.ssafficebe.search.payload;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ESNoticeRequest {

    private Long noticeId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime startDateTime;
    private LocalDateTime endDateTime;
    private String isEssentialYn;
    private String noticeTypeCd;
    private Long createUserId;
    private String createUserEmail;
    private String createUserName;
    private String createUserProfileImgUrl;

}
