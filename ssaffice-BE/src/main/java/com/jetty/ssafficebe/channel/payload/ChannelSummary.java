package com.jetty.ssafficebe.channel.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ChannelSummary {

    private String channelId;
    private String channelName;
    private String mmTeamId;
    private String mmTeamName;
}
