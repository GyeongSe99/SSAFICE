package com.jetty.ssafficebe.channel.service;

import com.jetty.ssafficebe.channel.converter.ChannelConverter;
import com.jetty.ssafficebe.channel.entity.Channel;
import com.jetty.ssafficebe.channel.entity.UserChannel;
import com.jetty.ssafficebe.channel.payload.ChannelSummary;
import com.jetty.ssafficebe.channel.respository.ChannelRepository;
import com.jetty.ssafficebe.channel.respository.UserChannelRepository;
import com.jetty.ssafficebe.mattermost.payload.MMChannelSummary;
import com.jetty.ssafficebe.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    private final ChannelConverter channelConverter;
    private final ChannelRepository channelRepository;

    private final UserChannelRepository userChannelRepository;

    private final UserRepository userRepository;

    @Override
    public List<ChannelSummary> getChannelListByUserId(Long userId) {
        List<UserChannel> userChannels = userChannelRepository.findDistinctByUserId(userId);

        List<Channel> channels = userChannels.stream()
                                             .map(UserChannel::getChannel)
                                             .toList();

        return channelConverter.toChannelSummaryList(channels);
    }

    public List<String> getChannelIdsByUserId(Long userId) {
        return userChannelRepository.findChannelIdsByUserId(userId);
    }

    @Override
    public List<Long> getUserIdListByChannelId(String channelId) {
        List<UserChannel> byChannelId = userChannelRepository.findByChannelId(channelId);
        if (byChannelId != null) {
            return byChannelId.stream()
                              .map(UserChannel::getUserId)
                              .toList();
        }
        return List.of();
    }

    /**
     * TODO. 주석 수정
     * 메인 메서드임
     * 채널 목록을 데이터베이스에 저장하는 메서드입니다.
     *
     * @param channelSummaries 저장할 채널 목록입니다.
     */
    @Override
    public int saveNotExistingChannelList(List<MMChannelSummary> channelSummaries) {
        if (channelSummaries == null || channelSummaries.isEmpty()) {
            return 0;
        }

        // 1. 중복되지 않은 채널 목록을 추출합니다.
        List<Channel> channelList = this.getDistinctChannelList(channelSummaries);

        channelRepository.saveAll(channelList);
        return channelList.size();
    }


    /**
     * TODO. 주석 수정
     * 메인 메서드임
     * 주어진 사용자 ID와 채널 목록을 이용해 UserChannel 테이블에 저장하는 메서드
     *
     * @param userId               사용자 ID
     * @param mmChannelSummaryList 저장할 채널 목록
     */
    @Override
    public void saveNewUserChannels(Long userId, List<MMChannelSummary> mmChannelSummaryList) {
        List<String> channelIdsByUserId = this.getChannelIdsByUserId(userId);

        mmChannelSummaryList.stream()
                            .filter(mmChannelSummary -> !channelIdsByUserId.contains(mmChannelSummary.getId()))
                            .map(mmChannelSummary -> new UserChannel(userId, mmChannelSummary.getId()))
                            .forEach(userChannelRepository::save);
    }


    private List<Channel> getDistinctChannelList(List<MMChannelSummary> channelSummaries) {
        // 1. 채널 요약 목록에서 채널 ID 들을 추출합니다.
        List<String> channelIds = channelSummaries.stream().map(MMChannelSummary::getId).toList();

        // 2. 이미 DB에 존재하는 채널 ID 목록을 데이터베이스에서 조회합니다.
        List<String> existingChannelIds = this.channelRepository.findByChannelIdIn(channelIds)
                                                                .stream().map(Channel::getChannelId)
                                                                .toList();

        // 3. DB에 존재하지 않는 새로운 채널만 추출하여 반환합니다.
        List<MMChannelSummary> newChannelSummaries = channelSummaries.stream()
                                                                     .filter(channelSummary -> !existingChannelIds.contains(
                                                                             channelSummary.getId()))
                                                                     .toList();

        // 4. 새로운 채널 목록을 Channel 엔티티로 변환하여 반환합니다.
        return this.channelConverter.toChannelList(newChannelSummaries);
    }

}
