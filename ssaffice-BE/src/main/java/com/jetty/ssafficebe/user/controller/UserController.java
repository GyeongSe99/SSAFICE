package com.jetty.ssafficebe.user.controller;

import com.jetty.ssafficebe.user.payload.SsoInfo;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.security.userdetails.CustomUserDetails;
import com.jetty.ssafficebe.notice.service.NoticeService;
import com.jetty.ssafficebe.user.payload.DashBoardCount;
import com.jetty.ssafficebe.user.payload.SaveUserRequest;
import com.jetty.ssafficebe.user.payload.UpdatePasswordRequest;
import com.jetty.ssafficebe.user.payload.UpdateUserRequest;
import com.jetty.ssafficebe.user.payload.UserSummary;
import com.jetty.ssafficebe.user.service.UserService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final NoticeService noticeService;

    /**
     * (관리자 권한) 유저 등록
     */
    @PostMapping("/admin")
    public ResponseEntity<ApiResponse> saveUser(@RequestBody SaveUserRequest saveUserRequest) {
        ApiResponse apiResponse = userService.saveUser(null, saveUserRequest);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ApiResponse> saveUser(@PathVariable Long userId, @RequestBody SaveUserRequest saveUserRequest) {
        System.out.println("email : " + saveUserRequest.getEmail());
        log.info("[User] SSO 연동 회원가입 시작");
        return ResponseEntity.ok().body(userService.saveUser(userId, saveUserRequest));
    }

    /**
     * 내 정보 조회
     */
    @GetMapping("/me")
    public ResponseEntity<UserSummary> getMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok(userService.getUserSummary(userDetails.getUserId()));
    }

    /**
     * (관리자 권한) 유저 정보 조회
     */
    @GetMapping("/admin/{userId}")
    public ResponseEntity<UserSummary> getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUserSummary(userId));
    }

    /**
     * 회원가입 진행 시 유저 정보 조회
     */
    @GetMapping("/{userId}")
    public ResponseEntity<SsoInfo> getSsoInfo(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getSSOInfo(userId));
    }

    /**
     * 내 정보 수정
     */
    @PutMapping("/me")
    public ResponseEntity<ApiResponse> updateMyInfo(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                    @RequestBody UpdateUserRequest updateUserRequest) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        return ResponseEntity.ok().body(userService.updateUser(userDetails.getUserId(), updateUserRequest));
    }

    /**
     * 유저 정보 수정. 역할 변경, 비밀번호 변경 로직은 다른 API로 분리.
     */
    @PutMapping("/admin/{userId}")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long userId,
                                                  @RequestBody UpdateUserRequest updateUserRequest) {
        return ResponseEntity.ok().body(userService.updateUser(userId, updateUserRequest));
    }

    /**
     * 유저 삭제
     */
    @DeleteMapping("/admin")
    public ResponseEntity<ApiResponse> deleteUsers(@RequestBody List<Long> userIds) {
        return ResponseEntity.ok().body(userService.deleteUsers(userIds));
    }

    /**
     * 유저 리스트 조회
     */
    @GetMapping("/admin")
    public ResponseEntity<Page<UserSummary>> getUserPage(@RequestParam String channelId,
                                                         @PageableDefault(
                                                                 size = 20,
                                                                 sort = "userId",
                                                                 direction = Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(userService.getUserPage(channelId, pageable));
    }

    /**
     * 내 비밀번호 수정 비밀번호 수정 페이지에서 사용
     */
    @PutMapping("/me/password")
    public ResponseEntity<ApiResponse> updateMyPassword(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                        @RequestBody UpdatePasswordRequest updatePasswordRequest) {

        return ResponseEntity.ok().body(userService.updatePassword(userDetails.getUserId(), updatePasswordRequest));
    }

    /**
     * 유저 프로필 업로드
     */
    @PostMapping("/me/profileImg")
    public ResponseEntity<ApiResponse> updateProfileImg(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                        @RequestParam MultipartFile profileImg) throws IOException {

        return ResponseEntity.ok().body(userService.updateProfileImg(userDetails.getUserId(), profileImg));
    }

    /**
     * SSAFICE 요약 컴포넌트
     */
    @GetMapping("/counts")
    public ResponseEntity<DashBoardCount> getDashBoardCount(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseEntity.ok(noticeService.getDashBoardCount(userDetails.getUserId()));
    }

}
