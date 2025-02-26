package com.jetty.ssafficebe.channel.service;


import com.jetty.ssafficebe.channel.payload.ChannelSummary;
import com.jetty.ssafficebe.mattermost.payload.MMChannelSummary;
import java.util.List;

public interface ChannelService {

    List<ChannelSummary> getChannelListByUserId(Long userId);

    List<String> getChannelIdsByUserId(Long userId);

    List<Long> getUserIdListByChannelId(String channelId);

    int saveNotExistingChannelList(List<MMChannelSummary> channelSummaries);

    void saveNewUserChannels(Long userId, List<MMChannelSummary> mmChannelSummaryList);
}
