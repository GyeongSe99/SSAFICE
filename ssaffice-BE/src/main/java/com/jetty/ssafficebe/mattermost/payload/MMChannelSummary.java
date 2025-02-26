package com.jetty.ssafficebe.mattermost.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MMChannelSummary {
    private String id;
    private String teamId;
    private String type;
    private String displayName;
}
