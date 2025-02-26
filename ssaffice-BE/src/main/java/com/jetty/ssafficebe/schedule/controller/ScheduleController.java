package com.jetty.ssafficebe.schedule.controller;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.security.userdetails.CustomUserDetails;
import com.jetty.ssafficebe.schedule.payload.AdminScheduleRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleDetail;
import com.jetty.ssafficebe.schedule.payload.ScheduleFilterRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleListResponse;
import com.jetty.ssafficebe.schedule.payload.ScheduleRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleSummary;
import com.jetty.ssafficebe.schedule.payload.UpdateScheduleRequest;
import com.jetty.ssafficebe.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/schedules")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    /**
     * 개인 일정 등록
     *
     * @param scheduleRequest : 일정 요청 정보 + 리마인드 정보 (리마인드 존재시)
     * @return 등록된 일정 id
     */
    @PostMapping
    public ResponseEntity<ApiResponse> saveSchedule(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                    @RequestBody ScheduleRequest scheduleRequest) {
        return ResponseEntity.ok(scheduleService.saveSchedule(userDetails.getUserId(), scheduleRequest));
    }

    /**
     * 관리자의 개별 일정 등록
     *
     * @param adminScheduleRequest : scheduleRequest, List<Long> userIds
     * @return 성공 메세지
     */
    @PostMapping("/admin")
    public ResponseEntity<ApiResponse> saveSchedulesByAdmin(@RequestBody AdminScheduleRequest adminScheduleRequest) {
        return ResponseEntity.ok(scheduleService.saveSchedulesByAdmin(adminScheduleRequest.getUserIds(),
                                                                      adminScheduleRequest.getScheduleRequest()));
    }

    /**
     * 일정 수정
     *
     * @param scheduleId            : 수정할 일정 id
     * @param updateScheduleRequest : schedule 정보
     * @return 수정된 일정 정보
     */
    @PutMapping("/{scheduleId}")
    public ResponseEntity<ApiResponse> updateSchedule(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                      @PathVariable("scheduleId") Long scheduleId,
                                                      @RequestBody UpdateScheduleRequest updateScheduleRequest) {
        return ResponseEntity.ok(scheduleService.updateSchedule(userDetails.getUserId(), scheduleId,
                                                                updateScheduleRequest));
    }

    /**
     * 일정 조회
     *
     * @param scheduleId : 조회할 일정 id
     * @return 조회한 일정 정보
     */
    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleDetail> getSchedule(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                      @PathVariable("scheduleId") Long scheduleId) {
        return ResponseEntity.ok(scheduleService.getSchedule(userDetails.getUserId(), scheduleId));
    }

    /**
     * 일정 삭제
     *
     * @param scheduleId : 삭제할 일정 id
     * @return 삭제된 일정 id
     */
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<ApiResponse> deleteSchedule(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                      @PathVariable("scheduleId") Long scheduleId) {
        return ResponseEntity.ok(scheduleService.deleteSchedule(userDetails.getUserId(), scheduleId));
    }

    /**
     * (ROLE_USER) 미등록 공지 조회
     *
     * @param pageable : 기본값 (20개씩 / 생성순)
     * @return 조건에 맞는 일정 리스트
     */
    @GetMapping("/unregistered")
    public ResponseEntity<Page<ScheduleSummary>> getUnregisteredSchedulePage(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PageableDefault(sort = "endDateTime", direction = Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(
                scheduleService.getUnregisteredSchedulePage(userDetails.getUserId(), pageable));
    }

    /**
     * (ROLE_USER) 개인 일정 리스트 조회
     *
     * @param sort          : 기본값 (마감순)
     * @param filterRequest : 필터 타입, 미등록 여부, 상태, 일정 출처, 시작/종료 시간
     * @return 조건에 맞는 일정 리스트 + 상태(해야할일,진행중,완료) 카운트 리스트
     */
    @GetMapping("/my")
    public ResponseEntity<ScheduleListResponse> getScheduleList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @ModelAttribute ScheduleFilterRequest filterRequest,
            @SortDefault(sort = "endDateTime", direction = Direction.ASC) Sort sort) {
        return ResponseEntity.ok(
                scheduleService.getScheduleList(userDetails.getUserId(), filterRequest, sort));
    }

    /**
     * (ROLE_ADMIN) 관리자의 공지 파생 일정 조회 공지 상세 보기 클릭 시 일정 완료 여부 확인하는 용도
     *
     * @param sort          : 기본값 (마감순)
     * @param filterRequest : 필터 타입, 미등록 여부, 상태, 일정 출처, 시작/종료 시간
     * @return 조건에 맞는 일정 리스트 + 상태(등록O, 등록O+완료) 카운트 리스트
     */
    @GetMapping("/admin/notices/{noticeId}")
    public ResponseEntity<ScheduleListResponse> getScheduleListByNoticeForAdmin(
            @PathVariable Long noticeId,
            @ModelAttribute ScheduleFilterRequest filterRequest,
            @SortDefault(sort = "endDateTime", direction = Direction.ASC) Sort sort) {
        return ResponseEntity.ok(
                scheduleService.getScheduleListByNoticeForAdmin(noticeId, filterRequest, sort));
    }

    /**
     * (ROLE_ADMIN) 관리자가 부여한 일정 조회 (개인/팀)
     *
     * @param sort          : 기본값 (마감순)
     * @param filterRequest : 필터 타입, 미등록 여부, 상태, 일정 출처, 시작/종료 시간
     * @return 조건에 맞는 일정 리스트 + 상태(등록O, 등록O+완료) 카운트 리스트
     */
    @GetMapping("/admin/assigned")
    public ResponseEntity<ScheduleListResponse> getAssignedScheduleList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @ModelAttribute ScheduleFilterRequest filterRequest,
            @SortDefault(sort = "endDateTime", direction = Direction.ASC) Sort sort) {
        return ResponseEntity.ok(
                scheduleService.getAssignedScheduleList(userDetails.getUserId(), filterRequest, sort));
    }
}
