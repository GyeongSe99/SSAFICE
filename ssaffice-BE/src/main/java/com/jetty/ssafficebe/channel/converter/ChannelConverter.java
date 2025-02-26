package com.jetty.ssafficebe.channel.converter;

import com.jetty.ssafficebe.channel.entity.Channel;
import com.jetty.ssafficebe.channel.payload.ChannelSummary;
import com.jetty.ssafficebe.mattermost.payload.MMChannelSummary;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ChannelConverter {

    @Mapping(source = "mmTeam.mmTeamName", target = "mmTeamName")
    ChannelSummary toChannelSummary(Channel channel);

    List<ChannelSummary> toChannelSummaryList(List<Channel> channelList);

    @Mapping(source = "id", target = "channelId")
    @Mapping(source = "displayName", target = "channelName")
    @Mapping(source = "teamId", target = "mmTeamId")
    Channel toChannel(MMChannelSummary mmChannelSummary);

    List<Channel> toChannelList(List<MMChannelSummary> mmChannelSummaryList);

}
