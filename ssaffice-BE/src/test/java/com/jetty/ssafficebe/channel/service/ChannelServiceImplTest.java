package com.jetty.ssafficebe.channel.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.jetty.ssafficebe.channel.converter.ChannelConverter;
import com.jetty.ssafficebe.channel.entity.Channel;
import com.jetty.ssafficebe.channel.entity.MMTeam;
import com.jetty.ssafficebe.channel.entity.UserChannel;
import com.jetty.ssafficebe.channel.payload.ChannelSummary;
import com.jetty.ssafficebe.channel.respository.UserChannelRepository;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class ChannelServiceImplTest {

    @Mock
    private ChannelConverter channelConverter;

    @Mock
    private UserChannelRepository userChannelRepository;

    @InjectMocks
    private ChannelServiceImpl channelService;

    private Long userId;
    private String channelId;
    private Channel channel1;
    private Channel channel2;
    private MMTeam mmTeam1;
    private MMTeam mmTeam2;
    private UserChannel userChannel1;
    private UserChannel userChannel2;
    private List<UserChannel> userChannels;
    private List<Channel> channels;
    private List<ChannelSummary> channelSummaries;

    @BeforeEach
    void setUp() {
        userId = 1L;

        mmTeam1 = MMTeam.builder()
                        .mmTeamId("team-1")
                        .mmTeamName("Team One")
                        .build();

        mmTeam2 = MMTeam.builder()
                        .mmTeamId("team-2")
                        .mmTeamName("Team Two")
                        .build();

        channelId = "channel-123";

        channel1 = Channel.builder()
                          .channelId("channel-1")
                          .channelName("Channel One")
                          .mmTeamId("team-1")
                          .mmTeam(mmTeam1)
                          .build();

        channel2 = Channel.builder()
                          .channelId("channel-2")
                          .channelName("Channel Two")
                          .mmTeamId("team-2")
                          .mmTeam(mmTeam2)
                          .build();

        userChannel1 = UserChannel.builder()
                                  .channel(channel1)
                                  .channelId("channel-1")
                                  .userId(userId)
                                  .build();

        userChannel2 = UserChannel.builder()
                                  .channel(channel2)
                                  .channelId("channel-2")
                                  .userId(userId)
                                  .build();

        userChannels = Arrays.asList(userChannel1, userChannel2);
        channels = Arrays.asList(channel1, channel2);
        channelSummaries = Arrays.asList(
                new ChannelSummary("channel-1", "Channel One", "team-1", "Team One"),
                new ChannelSummary("channel-2", "Channel Two", "team-2", "Team Two")
        );
    }

    @DisplayName("[Success] 유저 아이디로 ChannelSummaryList 가져오기 - 성공")
    @Test
    void testGetChannelListByUserId_ReturnsChannelSummaries() {
        // Given
        when(userChannelRepository.findDistinctByUserId(userId)).thenReturn(userChannels);
        when(channelConverter.toChannelSummaryList(channels)).thenReturn(channelSummaries);

        // When
        List<ChannelSummary> result = channelService.getChannelListByUserId(userId);

        // then
        assertThat(result).isEqualTo(channelSummaries);
        verify(userChannelRepository, times(1)).findDistinctByUserId(userId);
        verify(channelConverter, times(1)).toChannelSummaryList(channels);
    }

    @DisplayName("[Success] 유저 아이디로 ChannelSummaryList 가져오기 - 채널 없음")
    @Test
    void testGetChannelListByUserId_NoChannelList_ReturnsEmptyList() {
        // Given
        when(userChannelRepository.findDistinctByUserId(userId)).thenReturn(Collections.emptyList());
        when(channelConverter.toChannelSummaryList(Collections.emptyList())).thenReturn(Collections.emptyList());

        // When
        List<ChannelSummary> result = channelService.getChannelListByUserId(userId);

        // then
        assertThat(result).isEmpty();
        verify(userChannelRepository, times(1)).findDistinctByUserId(userId);
        verify(channelConverter, times(1)).toChannelSummaryList(Collections.emptyList());
    }

    @DisplayName("[Success] 유저 아이디로 ChannelIdList 가져오기 - 성공")
    @Test
    void testGetChannelIdListByUserId_ReturnsChannelIds() {
        // Given
        List<String> channelIds = Arrays.asList("channel-1", "channel-2");
        when(userChannelRepository.findChannelIdsByUserId(userId)).thenReturn(channelIds);

        // When
        List<String> result = channelService.getChannelIdsByUserId(userId);

        // then
        assertThat(result).isEqualTo(channelIds);
        verify(userChannelRepository, times(1)).findChannelIdsByUserId(userId);
    }

    @DisplayName("[Success] 채널 아이디로 UserIdList 가져오기 - 성공")
    @Test
    void testGetUserIdListByChannelId_ReturnsUserIds() {
        // Given
        List<UserChannel> userChannelsByChannel = Arrays.asList(userChannel1, userChannel2);
        when(userChannelRepository.findByChannelId(channelId)).thenReturn(userChannelsByChannel);

        // When
        List<Long> result = channelService.getUserIdListByChannelId(channelId);

        // then
        List<Long> expectedUserIds = Arrays.asList(userId, userId);
        assertThat(result).isEqualTo(expectedUserIds);
        verify(userChannelRepository, times(1)).findByChannelId(channelId);
    }

    @DisplayName("[Success] 채널 아이디로 UserIdList 가져오기 - 유저 없음")
    @Test
    void testGetUserIdListByChannelId_NoUsers_ReturnsEmptyList() {
        // Given
        when(userChannelRepository.findByChannelId(channelId)).thenReturn(Collections.emptyList());

        // When
        List<Long> result = channelService.getUserIdListByChannelId(channelId);

        // then
        assertThat(result).isEmpty();
        verify(userChannelRepository, times(1)).findByChannelId(channelId);
    }
}
