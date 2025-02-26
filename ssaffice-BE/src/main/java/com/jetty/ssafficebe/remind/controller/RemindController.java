package com.jetty.ssafficebe.remind.controller;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.security.userdetails.CustomUserDetails;
import com.jetty.ssafficebe.remind.payload.RemindRequest;
import com.jetty.ssafficebe.remind.service.RemindService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reminds")
@RequiredArgsConstructor
public class RemindController {

    private final RemindService remindService;

    /**
     * 리마인드 등록
     * @param userDetails : userId (schedule 작성자와 일치하는지)
     * @param remindRequest : type (DAILY, ONCE), localDateTime
     * @return 등록된 리마인드 id
     */
    @PostMapping
    public ResponseEntity<ApiResponse> saveRemind(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                  @RequestBody RemindRequest remindRequest) {
        ApiResponse apiResponse = remindService.saveRemind(userDetails.getUserId(), remindRequest);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    /**
     * 리마인드 삭제
     * @param userDetails: userId (schedule 작성자와 일치하는지)
     * @param remindId : 삭제하고자 하는 리마인드 id
     * @return 삭제된 리마인드 id
     */
    @DeleteMapping("/{remindId}")
    public ResponseEntity<ApiResponse> deleteRemind(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                    @PathVariable Long remindId) {
        ApiResponse apiResponse = remindService.deleteRemind(userDetails.getUserId(), remindId);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }
}
