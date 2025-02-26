package com.jetty.ssafficebe.user.payload;

import lombok.Getter;

@Getter
public class UserFilterRequest {

    private Integer cohortNum; // 기수
    private String regionCd;    // 지역
    private Integer classNum;   // 반
    private String trackCd;     // 트랙
    private String disabledYn; // 탈퇴여부
}
