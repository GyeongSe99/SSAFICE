package com.jetty.ssafficebe.mattermost.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jetty.ssafficebe.channel.service.ChannelService;
import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidTokenException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.mattermost.payload.DeleteSummary;
import com.jetty.ssafficebe.mattermost.payload.MMChannelSummary;
import com.jetty.ssafficebe.mattermost.payload.MMLoginRequest;
import com.jetty.ssafficebe.mattermost.payload.PostRequest;
import com.jetty.ssafficebe.mattermost.payload.PostSummary;
import com.jetty.ssafficebe.mattermost.payload.PostUpdateRequest;
import com.jetty.ssafficebe.mattermost.util.MattermostUtil;
import com.jetty.ssafficebe.notice.payload.NoticeRequest;
import com.jetty.ssafficebe.schedule.entity.Schedule;
import com.jetty.ssafficebe.schedule.repository.ScheduleRepository;
import com.jetty.ssafficebe.user.entity.User;
import com.jetty.ssafficebe.user.repository.UserRepository;
import com.jetty.ssafficebe.user.service.UserService;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MattermostServiceImpl implements MattermostService {

    private static final String END_POINT_FOR_POST = "posts";

    private final MattermostUtil mattermostUtil;

    private final UserRepository userRepository;
    private final UserService userService;

    private final ScheduleRepository scheduleRepository;

    private final ChannelService channelService;


    @Override
    public PostSummary getPost(String postId) {
        ResponseEntity<PostSummary> response = this.mattermostUtil.callApi(END_POINT_FOR_POST + "/" + postId, null,
                                                                           HttpMethod.GET, null, PostSummary.class);

        return response.getBody();
    }

    @Override
    public ApiResponse createPost(PostRequest request) {
        ResponseEntity<PostSummary> response = this.mattermostUtil.callApi(END_POINT_FOR_POST, null, HttpMethod.POST,
                                                                           request, PostSummary.class);

        boolean isSuccess = response.getStatusCode() == HttpStatus.CREATED;

        return new ApiResponse(isSuccess, HttpStatus.resolve(response.getStatusCode().value()), "", response.getBody());
    }

    @Override
    public ApiResponse putPost(PostUpdateRequest request) {
        ResponseEntity<PostSummary> response = this.mattermostUtil.callApi(END_POINT_FOR_POST + "/" + request.getId(),
                                                                           null, HttpMethod.PUT, request,
                                                                           PostSummary.class);

        boolean isSuccess = response.getStatusCode() == HttpStatus.OK;

        return new ApiResponse(isSuccess, HttpStatus.resolve(response.getStatusCode().value()), "", response.getBody());
    }

    @Override
    public ApiResponse deletePost(String postId) {
        ResponseEntity<DeleteSummary> response = this.mattermostUtil.callApi(END_POINT_FOR_POST + "/" + postId, null,
                                                                             HttpMethod.DELETE, null,
                                                                             DeleteSummary.class);

        boolean isSuccess = response.getStatusCode() == HttpStatus.OK;

        return new ApiResponse(isSuccess, HttpStatus.resolve(response.getStatusCode().value()), "", response.getBody());
    }


    /**
     * userID로 주어진 사용자가 속한 mattermost 의 "공지사항" 채널을 DB에 저장하는 메서드입니다.
     *
     * @param userId 조회 할 사용자 Id 입니다.
     * @return 저장된 채널의 수를 반환합니다.
     */
    @Override
    public ApiResponse saveChannelsByUserIdOnRefresh(Long userId) {

        // 1. Mattermost 에서 사용자 채널 조회
        List<MMChannelSummary> mmchannelSummaryList = getChannelsByUserIdFromMM(userId);

        // 2. 공지사항 채널 필터링
        List<MMChannelSummary> filteredNoticeChannels = getFilteredMMChannelSummaryList(mmchannelSummaryList, "공지사항");

        // 3. Channel Table 에 저장되어있지 않은 채널 리스트 저장
        int savedCount = this.channelService.saveNotExistingChannelList(filteredNoticeChannels);

        // 4. UserChannel Table 에 userID와 매핑되어있지 않은 채널 리스트 저장
        this.channelService.saveNewUserChannels(userId, filteredNoticeChannels);

        // 5. 유저 정보에 마지막 새로고침 시간 저장
        userService.saveLastRefreshTime(userId);

        return new ApiResponse(true, HttpStatus.OK, "Channel saved successful", savedCount);
    }

    /**
     * 주어진 사용자 ID와 채널 ID를 사용하여 해당 채널에 직접 메시지를 전송하는 메서드입니다.
     *
     * @param userId       메시지를 전송할 사용자의 ID 입니다.
     * @param targetUserId 메시지를 받을 사용자의 ID 입니다.
     * @param message      전송할 메시지 내용입니다.
     * @throws ResourceNotFoundException 사용자 ID에 해당하는 데이터를 찾을 수 없을 때 발생합니다.
     * @throws InvalidTokenException     MM 토큰이 유효하지 않을 때 발생합니다.
     */
    @Override
    public void     sendDirectMessage(Long userId, Long targetUserId, String message) {
        // 1. 사용자 정보를 조회(MM 토큰을 가져오기 위함)
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        // 2. 메시지 전송을 위한 채널을 만들고 메시지를 보냄.
        Map<String, String> payload = Map.of("channel_id", createDMChannel(userId, targetUserId), "message", message);

        try {
            this.mattermostUtil.callMattermostApi("/posts", HttpMethod.POST, payload, PostSummary.class,
                                                  user.getMattermostToken());
        } catch (InvalidTokenException e) {
            throw new InvalidTokenException(ErrorCode.INVALID_MM_TOKEN);
        }
    }

    /**
     * 대상 사용자들에게 일정과 관련된 remindMessage 를 보내는 메서드
     *
     * @param userId           메시지를 전송할 사용자의 ID 입니다.
     * @param targetUserIdList 메시지를 받을 사용자들의 ID 리스트입니다.
     * @param ScheduleId       메시지의 내용을 가져올 스케줄 ID 입니다.
     * @return 메시지를 보낸 사용자의 수를 반환합니다.
     */
    @Override
    public ApiResponse sendRemindMessageToUserList(Long userId, List<Long> targetUserIdList, Long ScheduleId) {
        String message = makeDirectMessageFromSchedule(ScheduleId);
        for (Long targetUserId : targetUserIdList) {
            sendDirectMessage(userId, targetUserId, message);
        }
        return new ApiResponse(true, HttpStatus.OK, "메시지 전송 성공", targetUserIdList.size());
    }

    @Override
    public void sendMessageToChannel(Long userId, NoticeRequest noticeRequest){
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        String message = "(SSAFICE) " + noticeRequest.getContent();

        Map<String, String> payload = Map.of("channel_id", noticeRequest.getChannelId() , "message", message);

        try {
            this.mattermostUtil.callMattermostApi("/posts", HttpMethod.POST, payload, PostSummary.class,
                                                  user.getMattermostToken());
        } catch (InvalidTokenException e) {
            throw new InvalidTokenException(ErrorCode.INVALID_MM_TOKEN);
        }

    }



    // TODO. 아래 메서드들은 private 처리 해도 됨. 현재는 테스트코드를 위해 public 으로 둔 상태.

    /**
     * userId에 속한 채널 리스트를 받아오는 메서드
     *
     * @param userId           메시지를 전송할 사용자의 ID 입니다.
     * @throws ResourceNotFoundException 사용자 ID에 해당하는 데이터를 찾을 수 없을 때 발생합니다.
     * @throws InvalidTokenException     MM 토큰이 유효하지 않을 때 발생합니다.
     * @return 메시지를 보낸 사용자의 수를 반환합니다.
     */
    public List<MMChannelSummary> getChannelsByUserIdFromMM(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("사용자 ID가 null 입니다.");
        }

        // 1. userId로 DB의 user 를 조회하여 Mattermost ID와 토큰을 가져옵니다.
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        // 2. mmToken 과 mmId로 채널 요약 정보를 배열로 가져옵니다.
        try {
            ResponseEntity<MMChannelSummary[]> response = this.mattermostUtil.callMattermostApi(
                    "/users/" + user.getMattermostUserId() + "/channels",
                    HttpMethod.GET,
                    null,
                    MMChannelSummary[].class,
                    user.getMattermostToken());

            return Arrays.asList(Objects.requireNonNull(response.getBody()));
            // TODO. Exception 터트려보고 처리하기
        } catch (InvalidTokenException e) {
            throw new InvalidTokenException(ErrorCode.INVALID_MM_TOKEN);
        }
    }


    /**
     * 사용자가 속한 채널 목록에서 특정 채널 이름을 포함하는 채널 목록을 반환하는 메서드
     *
     * @param mmChannelSummaryList 사용자가 속한 채널 목록입니다.
     * @param channelName          필터링할 채널 이름입니다.
     * @return 필터링 된 MMChannelSummary 리스트를 반환합니다.
     */
    public List<MMChannelSummary> getFilteredMMChannelSummaryList(List<MMChannelSummary> mmChannelSummaryList,
                                                                   String channelName) {
        if (mmChannelSummaryList == null) {
            return Collections.emptyList();
        }

        List<MMChannelSummary> mmChannelSummaries = new ArrayList<>();
        for (MMChannelSummary channelSummary : mmChannelSummaryList) {
            if (channelSummary.getDisplayName().contains(channelName)) {
                mmChannelSummaries.add(channelSummary);
            }
        }
        return mmChannelSummaries;
    }

    /**
     * DM 메시지를 보내기 위해 DM 채널을 생성하는 메서드
     *
     * @param userId       메시지를 전송할 사용자의 ID 입니다.
     * @param targetUserId 메시지를 받을 사용자의 ID 입니다.
     * @return 생성된 DM 채널의 ID를 반환합니다.
     * @throws ResourceNotFoundException 사용자 ID에 해당하는 데이터를 찾을 수 없을 때 발생합니다.
     *
     */
    public String createDMChannel(Long userId, Long targetUserId) {

        // 1. 사용자 정보를 조회(MM ID를 가져오기 위함)
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        User targetUser = userRepository.findById(targetUserId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", targetUserId));

        // 3. DM 채널 생성을 위한 페이로드 구성
        String[] payload = new String[]{user.getMattermostUserId(), targetUser.getMattermostUserId()};

        // 4. Mattermost API 를 호출하여 DM 채널을 생성합니다.
        ResponseEntity<MMChannelSummary> response = this.mattermostUtil.callMattermostApi("/channels/direct",
                                                                                          HttpMethod.POST, payload,
                                                                                          MMChannelSummary.class,
                                                                                          user.getMattermostToken());
        // 5. 생성된 채널의 ID를 반환합니다.
        return Objects.requireNonNull(response.getBody(), "응답 본문이 null 입니다.").getId();
    }

    /**
     * ScheduleId를 통해 스케줄 정보를 가져와 메시지를 만드는 메서드
     *
     * @param scheduleId 메시지로 만들고자 하는 스케줄의 Id입니다.
     * @return DirectMessage 의 payload 입니다.
     */
    public String makeDirectMessageFromSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.SCHEDULE_NOT_FOUND, "scheduleId", scheduleId));

        return "[REMIND]\n제목 : " + schedule.getTitle() + " \n" + "내용 : " + schedule.getMemo() + " \n" + "시작시간 : "
                + schedule.getStartDateTime() + " \n" + "종료시간 : " + schedule.getEndDateTime();
    }

    @Override
    public ApiResponse MMLogin(Long userId, MMLoginRequest mmLoginRequest){
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));
        Map<String, String> data = this.getMMTokenAndMMId(mmLoginRequest.getLoginId(), mmLoginRequest.getPassword());
        user.setMattermostToken(data.get("token"));
        user.setMattermostUserId(data.get("id"));
        user.setRecentMmChannelSyncTime(LocalDateTime.now());
        userRepository.save(user);
        return new ApiResponse(true, HttpStatus.OK, "Login Success", user.getEmail());
    }

    public Map<String, String> getMMTokenAndMMId(String mmId, String mmPassword) {
        MMLoginRequest payload = new MMLoginRequest(mmId, mmPassword);
        try{
            ResponseEntity<String> response = this.mattermostUtil.callMattermostApi(
                    "/users/login", HttpMethod.POST, payload, String.class, null);
            String jsonResponse = Objects.requireNonNull(response.getBody());
            Map<String, String> data = new HashMap<>();
            String token = Objects.requireNonNull(response.getHeaders().get("Token")).get(0);
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonResponse);
            String id = jsonNode.get("id").asText();
            data.put("token", token);
            data.put("id", id);
            return data;
            
        } catch(Exception e){
            throw new InvalidValueException(ErrorCode.INVALID_MM_LOGIN, "mmID", mmId);
        }
    }
}
