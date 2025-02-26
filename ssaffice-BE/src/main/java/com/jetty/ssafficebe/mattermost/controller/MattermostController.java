package com.jetty.ssafficebe.mattermost.controller;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.security.userdetails.CustomUserDetails;
import com.jetty.ssafficebe.mattermost.payload.DirectMessageRequest;
import com.jetty.ssafficebe.mattermost.payload.MMLoginRequest;
import com.jetty.ssafficebe.mattermost.payload.PostRequest;
import com.jetty.ssafficebe.mattermost.payload.PostSummary;
import com.jetty.ssafficebe.mattermost.payload.PostUpdateRequest;
import com.jetty.ssafficebe.mattermost.service.MattermostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mm")
public class MattermostController {

    private final MattermostService mattermostService;

    @GetMapping("/posts/{postId}")
    public ResponseEntity<PostSummary> getPost(@PathVariable String postId) {
        return ResponseEntity.ok(this.mattermostService.getPost(postId));
    }

    @PostMapping("/posts")
    public ResponseEntity<ApiResponse> createPost(@RequestBody PostRequest request) {
        return ResponseEntity.ok(this.mattermostService.createPost(request));
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse> putPost(@RequestBody PostUpdateRequest request) {
        return ResponseEntity.ok(this.mattermostService.putPost(request));
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable String postId) {
        return ResponseEntity.ok(this.mattermostService.deletePost(postId));
    }

    /**
     * 새로고침을 누를 때 사용자가 속한 MM 채널 목록을 가져와 해당 채널들을 Channel 테이블과 UserChannel 테이블에 저장하는 메서드입니다. 이 메서드는 두 단계로 구성됩니다: 1. 사용자가
     * 속한 채널을 Mattermost 에서 가져와 Channel 테이블에 저장합니다. 2. 사용자와 채널의 연관 관계를 UserChannel 테이블에 저장합니다.
     *
     * @param userDetails 인증된 사용자의 세부 정보를 포함하는 객체입니다. 이를 통해 사용자 ID를 가져올 수 있습니다. JWT Token 을 통해 인증된 사용자의 정보를 가져옵니다.
     * @return 요청의 처리 결과를 담고 있는 ResponseEntity 객체로, 성공적으로 저장되었을 때의 응답 결과를 포함합니다.
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> saveChannelsByUserIdOnRefresh(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        log.info("[saveChannelsByUserId] userID 새로고침 시 채널 저장하는 메서드 시작 , userId : {}", userDetails.getUserId());

        return ResponseEntity.ok(mattermostService.saveChannelsByUserIdOnRefresh(userDetails.getUserId()));
    }


    /**
     * 사용자가 대상 사용자들에게 직접 메시지를 전송하는 메서드입니다. 이 메서드는 각 대상 사용자에 대해 DM 채널을 생성하고, 해당 채널을 통해 메시지를 전송합니다.
     *
     * @param userDetails 인증된 사용자의 세부 정보를 포함하는 객체입니다. 이를 통해 사용자 ID를 가져올 수 있습니다. JWT Token 을 통해 인증된 사용자의 정보를 * 가져옵니다.
     * @param request     직접 메시지를 전송하기 위한 요청 정보입니다. 스케줄 ID와 수신받을 사용자 ID 리스트를 포함합니다.
     * @return 메시지 전송 결과를 담고 있는 ResponseEntity 객체로, 성공적으로 전송되었을 때의 응답 결과를 포함합니다.
     */
    @PostMapping("/send")
    public ResponseEntity<ApiResponse> sendDirectMessageToUserList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestBody DirectMessageRequest request) {
        log.info("[sendDirectMessage] DM을 보내는 메서드 시작");

        return ResponseEntity.ok(this.mattermostService.sendRemindMessageToUserList(userDetails.getUserId(),
                                                                                    request.getUserIds(),
                                                                                    request.getScheduleId()));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@AuthenticationPrincipal CustomUserDetails userDetails, @RequestBody
                                             MMLoginRequest request) {

        return ResponseEntity.ok(this.mattermostService.MMLogin(userDetails.getUserId(), request));
    }


}
