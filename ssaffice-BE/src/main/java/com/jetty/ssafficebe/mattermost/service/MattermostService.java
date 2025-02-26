package com.jetty.ssafficebe.mattermost.service;


import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.mattermost.payload.MMLoginRequest;
import com.jetty.ssafficebe.mattermost.payload.PostRequest;
import com.jetty.ssafficebe.mattermost.payload.PostSummary;
import com.jetty.ssafficebe.mattermost.payload.PostUpdateRequest;
import com.jetty.ssafficebe.notice.payload.NoticeRequest;
import java.util.List;

public interface MattermostService {

    PostSummary getPost(String postId);

    ApiResponse createPost(PostRequest request);

    ApiResponse putPost(PostUpdateRequest request);

    ApiResponse deletePost(String postId);

    ApiResponse saveChannelsByUserIdOnRefresh(Long userId);

    void sendDirectMessage(Long userId, Long targetUserId, String message);

    void sendMessageToChannel(Long userId, NoticeRequest noticeRequest);

    ApiResponse sendRemindMessageToUserList(Long userId, List<Long> targetUserIdList, Long ScheduleId);

    ApiResponse MMLogin(Long userId, MMLoginRequest mmLoginRequest);
}
