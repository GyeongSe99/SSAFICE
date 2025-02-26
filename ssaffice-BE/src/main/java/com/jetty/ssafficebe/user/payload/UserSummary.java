package com.jetty.ssafficebe.user.payload;

import com.jetty.ssafficebe.role.payload.RoleSummarySimple;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSummary {

    private Long userId;

    private String email;

    private String name;

    private String cohortNum;

    private String regionCd;

    private String classNum;

    private String trackCd;

    private String isDisabledYn;

    private List<RoleSummarySimple> roles = new ArrayList<>();

    private String profileImgUrl;

    private LocalDateTime recentMmChannelSyncTime;
}
