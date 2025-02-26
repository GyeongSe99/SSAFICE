package com.jetty.ssafficebe.schedule.service;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.DuplicateValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidAuthorizationException;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.notice.entity.Notice;
import com.jetty.ssafficebe.remind.converter.RemindConverter;
import com.jetty.ssafficebe.remind.payload.RemindRequest;
import com.jetty.ssafficebe.remind.repository.RemindRepository;
import com.jetty.ssafficebe.remind.service.RemindService;
import com.jetty.ssafficebe.role.repository.UserRoleRepository;
import com.jetty.ssafficebe.schedule.code.ScheduleSourceType;
import com.jetty.ssafficebe.schedule.converter.ScheduleConverter;
import com.jetty.ssafficebe.schedule.entity.Schedule;
import com.jetty.ssafficebe.schedule.payload.ScheduleDetail;
import com.jetty.ssafficebe.schedule.payload.ScheduleEnrolledCount;
import com.jetty.ssafficebe.schedule.payload.ScheduleFilterRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleListResponse;
import com.jetty.ssafficebe.schedule.payload.ScheduleRequest;
import com.jetty.ssafficebe.schedule.payload.ScheduleStatusCount;
import com.jetty.ssafficebe.schedule.payload.ScheduleSummary;
import com.jetty.ssafficebe.schedule.payload.UpdateScheduleRequest;
import com.jetty.ssafficebe.schedule.repository.ScheduleRepository;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleConverter scheduleConverter;
    private final ScheduleRepository scheduleRepository;
    private final RemindConverter remindConverter;
    private final RemindRepository remindRepository;
    private final RemindService remindService;
    private final UserRoleRepository userRoleRepository;

    @Override
    public ApiResponse saveSchedule(Long userId, ScheduleRequest scheduleRequest) {
        log.info("[Schedule] 일정 등록 시작 - userId={}", userId);

        // ! 1. Schedule 엔티티 생성 및 연관관계 설정
        Schedule schedule = scheduleConverter.toSchedule(scheduleRequest);
        if (scheduleRequest.getScheduleStatusTypeCd() == null) {
            schedule.setScheduleStatusTypeCd("TODO");
        }
        if (scheduleRequest.getScheduleSourceTypeCd() == null) {
            schedule.setScheduleSourceTypeCd("PERSONAL");
        }
        schedule.setUserId(userId);

        // ! 2. Schedule 저장
        Schedule savedSchedule = scheduleRepository.save(schedule);
        log.info("[Schedule] 일정 등록 완료 - scheduleId={}, title={}", savedSchedule.getScheduleId(),
                 savedSchedule.getTitle());

        // ! 3. 일정에 리마인드 추가하는 메서드 호출
        saveScheduleReminds(userId, scheduleRequest.getRemindRequests(), savedSchedule.getScheduleId());

        // ! 4. Response 반환
        return new ApiResponse(true, "일정 등록에 성공하였습니다.", savedSchedule.getScheduleId());
    }

    @Override
    public ApiResponse saveSchedulesByAdmin(List<Long> userIds, ScheduleRequest scheduleRequest) {
        log.info("[Schedule] 관리자의 개별 일정 등록 시작 - 대상 사용자 수={}", userIds.size());

        // ! 1. 입력값 검증
        if (userIds.isEmpty()) {
            log.info("[Schedule] 관리자의 개별 일정 등록 해당 유저 존재 X 종료");
            return new ApiResponse(true, "사용자가 지정되지 않았습니다.");
        }

        // ! 2. 모든 일정 생성 및 저장
        scheduleRequest.setScheduleSourceTypeCd("ASSIGNED");
        List<Long> savedScheduleIds = userIds.stream().map(userId -> {
                                                 try {
                                                     ApiResponse response = saveSchedule(userId, scheduleRequest);
                                                     return response.isSuccess() ? (Long) response.getData() : null;
                                                 } catch (Exception e) {
                                                     log.error("[Schedule] 사용자({})의 일정 등록 실패: {}", userId,
                                                               e.getMessage());
                                                     return null;
                                                 }
                                             })
                                             .filter(Objects::nonNull)
                                             .toList();

        // ! 3. 결과 반환
        log.info("[Schedule] 관리자의 개별 일정 등록 완료 - 전체={}, 성공={}", userIds.size(), savedScheduleIds.size());
        return new ApiResponse(true, String.format("%d명의 사용자에게 일정이 등록되었습니다.", savedScheduleIds.size()),
                               savedScheduleIds);
    }

    /**
     * 관리자 공지사항 등록 시 해당 교육생들에게 일정을 추가해주는 메서드
     */
    @Override
    public void saveSchedulesFromNotice(Notice notice, List<Long> userIds) {
        log.info("[Schedule] 공지사항 일정 일괄 생성 시작 - noticeId={}, userCount={}", notice.getNoticeId(), userIds.size());

        // ! 1. 입력값 검증
        if (userIds.isEmpty()) {
            log.info("[Schedule] 공지사항 일괄 생성 해당 유저 존재 X 종료");
            return;
        }

        // ! 2. 모든 Schedule 생성 및 저장
        List<Schedule> schedules = userIds.stream().map(userId -> {
                                              Schedule schedule = scheduleConverter.toSchedule(userId, notice.getNoticeId());
                                              schedule.setTitle(notice.getTitle());
                                              schedule.setMemo(notice.getContent());
                                              schedule.setScheduleSourceTypeCd("TODO");
                                              schedule.setScheduleSourceTypeCd(notice.getNoticeTypeCd());
                                              schedule.setEssentialYn(notice.getEssentialYn());
                                              if (notice.isEssential()) {
                                                  schedule.setEnrollYn("Y");
                                              }
                                              return schedule;
                                          })
                                          .toList();
        List<Schedule> savedSchedules = scheduleRepository.saveAll(schedules);

        // ! 3. 필수 공지사항인 경우 리마인드 request 생성 후 해당 일정에 리마인드 추가하는 메서드 호출
        if (notice.isEssential() && (notice.getStartDateTime() != null || notice.getEndDateTime() != null)) {
            LocalDateTime remindDateTime = notice.getEndDateTime() != null
                                           ? notice.getEndDateTime().minusHours(1)
                                           : notice.getStartDateTime().minusHours(1);

            savedSchedules.forEach(schedule -> saveScheduleReminds(schedule.getUserId(),
                                                                   List.of(remindConverter.toRemindRequest("Y", "ONCE",
                                                                                                           remindDateTime)),
                                                                   schedule.getScheduleId()));
        }

        log.info("[Schedule] 공지사항 일정 일괄 생성 완료 - 전체={}, 성공={}", userIds.size(), savedSchedules.size());
    }

    @Override
    public ApiResponse updateSchedule(Long userId, Long scheduleId, UpdateScheduleRequest updateScheduleRequest) {
        log.info("[Schedule] 일정 수정 시작 - scheduleId={}, userId={}", scheduleId, userId);

        // ! 1. 수정할 Schedule 조회
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new ResourceNotFoundException(
                ErrorCode.SCHEDULE_NOT_FOUND, "해당 일정을 찾을 수 없습니다.", scheduleId));

        // ! 2. 권한 검증
        validateAuthorization(userId, schedule.getUserId());

        // ! 3. 케이스에 따라서 수정 - 개인 일정만 제목, 시작,종료일 수정 가능
        Optional.ofNullable(updateScheduleRequest.getMemo())
                .ifPresent(schedule::setMemo);
        Optional.ofNullable(updateScheduleRequest.getScheduleStatusTypeCd())
                .ifPresent(schedule::setScheduleStatusTypeCd);
        if (!schedule.isEssential() && schedule.getNoticeId() != null) {
            Optional.ofNullable(updateScheduleRequest.getEnrollYn())
                    .ifPresent(schedule::setEnrollYn);
        }
        if (schedule.getScheduleSourceType() == ScheduleSourceType.PERSONAL) {
            Optional.ofNullable(updateScheduleRequest.getTitle())
                    .ifPresent(schedule::setTitle);
            Optional.ofNullable(updateScheduleRequest.getStartDateTime())
                    .ifPresent(schedule::setStartDateTime);
            Optional.ofNullable(updateScheduleRequest.getEndDateTime())
                    .ifPresent(schedule::setEndDateTime);
        }

        // ! 4. Remind 정보 갱신 - reminds 요청에 있을 때만 수정
        if (updateScheduleRequest.getRemindRequests() != null) {
            remindRepository.deleteByScheduleId(scheduleId);
            schedule.getReminds().clear();
            saveScheduleReminds(userId, updateScheduleRequest.getRemindRequests(), schedule.getScheduleId());
        }

        // ! 5. Schedule 저장 및 Response 반환
        Schedule savedSchedule = scheduleRepository.save(schedule);
        log.info("[Schedule] 일정 수정 완료 - scheduleId={}, title={}", savedSchedule.getScheduleId(),
                 savedSchedule.getTitle());
        return new ApiResponse(true, "일정 수정에 성공하였습니다.", schedule.getScheduleId());
    }

    @Override
    public ScheduleDetail getSchedule(Long userId, Long scheduleId) {
        log.info("[Schedule] 일정 조회 시작 - scheduleId={}, userId={}", scheduleId, userId);

        // ! 1. 조회할 일정 찾기
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new ResourceNotFoundException(
                ErrorCode.SCHEDULE_NOT_FOUND, "해당 일정을 찾을 수 없습니다.", scheduleId));

        // ! 2. 권한 검증
        validateAuthorization(userId, schedule.getUserId());

        // ! 3. Response 반환
        log.info("[Schedule] 일정 조회 완료 - scheduleId={}, title={}", scheduleId, schedule.getTitle());
        return scheduleConverter.toScheduleDetail(schedule);
    }

    @Override
    public ApiResponse deleteSchedule(Long userId, Long scheduleId) {
        log.info("[Schedule] 일정 삭제 시작 - scheduleId={}, userId={}", scheduleId, userId);

        // ! 1. 삭제할 일정 찾기
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new ResourceNotFoundException(
                ErrorCode.SCHEDULE_NOT_FOUND, "해당 일정을 찾을 수 없습니다.", scheduleId));

        // ! 2. 권한 검증
        validateAuthorization(userId, schedule.getUserId());

        // ! 3-1. 필수 일정이고 관리자가 아닐 경우 삭제 시도 예외처리
        if (schedule.isEssential() && isNotAdmin(userId)) {
            throw new InvalidAuthorizationException(ErrorCode.INVALID_AUTHORIZATION, "scheduleId", scheduleId);
        }

        // ! 3-2. 공지 파생 일정일 경우 처리 및 Response 반환
        if (schedule.getNotice() != null && !ScheduleSourceType.PERSONAL.name()
                                                                        .equals(schedule.getScheduleSourceTypeCd())) {
            schedule.setEnrollYn("N");
            scheduleRepository.save(schedule);
            return new ApiResponse(true, "팀 공지 일정이 미등록 처리되었습니다.", scheduleId);
        }

        // ! 3-3. 개인 일정일 경우 삭제 및 Response 반환
        scheduleRepository.delete(schedule);
        log.info("[Schedule] 일정 삭제 완료 - scheduleId={}", scheduleId);

        return new ApiResponse(true, "일정 삭제에 성공하였습니다.", scheduleId);
    }

    @Override
    public ScheduleListResponse getScheduleList(Long userId, ScheduleFilterRequest filterRequest, Sort sort) {
        log.info("[Schedule] 개인 일정 목록 조회 시작 - userId={}", userId);

        // ! 1. 조건에 맞는 일정 리스트 생성
        filterRequest.setEnrollYn("Y");
        List<Schedule> scheduleList = scheduleRepository.findScheduleListByUserIdAndFilter(userId, filterRequest, sort);

        // ! 2. 조회된 일정에서 상태별 카운트 계산
        ScheduleStatusCount scheduleStatusCount = scheduleRepository.getStatusCounts(scheduleList);

        // ! 3. 응답 생성
        List<ScheduleSummary> scheduleSummaryList = scheduleList.stream()
                                                                .map(scheduleConverter::toScheduleSummary)
                                                                .toList();

        log.info("[Schedule] 일정 목록 조회 완료 - totalElements={}", scheduleSummaryList.size());
        return ScheduleListResponse.builder()
                                   .scheduleSummaries(scheduleSummaryList)
                                   .scheduleStatusCount(scheduleStatusCount).build();
    }

    /**
     * 관리자 공지사항 조회 시 해당 교육생들의 일정을 조회하는 메서드
     */
    @Override
    public ScheduleListResponse getScheduleListByNoticeForAdmin(Long noticeId, ScheduleFilterRequest filterRequest,
                                                                Sort sort) {
        log.info("[Schedule] 공지사항 관련 교육생 일정 필터 조회 시작 - noticeId={}", noticeId);

        // ! 1. 해당 공지사항의 일정들 필터 조회
        List<Schedule> scheduleList = scheduleRepository.findScheduleListByNoticeIdAndFilter(noticeId, filterRequest,
                                                                                             sort);

        // ! 2. 조회된 일정에서 일정 상태별 카운트
        ScheduleEnrolledCount scheduleEnrolledCount = scheduleRepository.getEnrolledCounts(scheduleList);

        // ! 3. 응답 생성
        List<ScheduleSummary> scheduleSummaryList = scheduleList.stream()
                                                                .map(scheduleConverter::toScheduleSummary)
                                                                .toList();

        log.info("[Schedule] 공지사항 관련 교육생 일정 필터 조회 완료 - totalElements={}", scheduleSummaryList.size());
        return ScheduleListResponse.builder()
                                   .scheduleSummaries(scheduleSummaryList)
                                   .scheduleEnrolledCount(scheduleEnrolledCount).build();
    }

    @Override
    public Page<ScheduleSummary> getUnregisteredSchedulePage(Long userId, Pageable pageable) {
        log.info("[Schedule] 미등록 공지 목록 조회 시작 - userId={}", userId);

        // ! 1. 미등록 공지사항 일정 조회
        ScheduleFilterRequest filterRequest = new ScheduleFilterRequest();
        filterRequest.setEnrollYn("N");
        Page<Schedule> schedulePage = scheduleRepository.findUnregisteredSchedulePageByUserIdAndFilter(userId,
                                                                                                       filterRequest,
                                                                                                       pageable);

        // ! 2. 응답 생성
        Page<ScheduleSummary> scheduleSummaryPage = schedulePage.map(scheduleConverter::toScheduleSummary);

        log.info("[Schedule] 미등록 공지 목록 조회 완료 - totalElements={}, totalPages={}", scheduleSummaryPage.getTotalElements(),
                 scheduleSummaryPage.getTotalPages());
        return scheduleSummaryPage;
    }

    @Override
    public ScheduleListResponse getAssignedScheduleList(Long userId, ScheduleFilterRequest filterRequest, Sort sort) {
        log.info("[Schedule] 관리자 할당 일정 목록 조회 시작 - userId={}", userId);

        // ! 1. 관리자 할당 일정 조회
        filterRequest.setScheduleSourceTypeCd("ASSIGNED");
        List<Schedule> scheduleList = scheduleRepository.findScheduleListByUserIdAndFilterByAdmin(userId,
                                                                                                  filterRequest,
                                                                                                  sort);

        // ! 2. 조회된 일정에서 등록 상태별 카운트
        ScheduleEnrolledCount scheduleEnrolledCount = scheduleRepository.getEnrolledCounts(scheduleList);

        // ! 3. 응답 생성
        List<ScheduleSummary> scheduleSummaryList = scheduleList.stream()
                                                                .map(scheduleConverter::toScheduleSummary)
                                                                .toList();

        log.info("[Schedule] 관리자 할당 일정 목록 조회 완료 - totalElements={}",
                 scheduleSummaryList.size());
        return ScheduleListResponse.builder()
                                   .scheduleSummaries(scheduleSummaryList)
                                   .scheduleEnrolledCount(scheduleEnrolledCount).build();
    }

    @Override
    public ScheduleEnrolledCount getEnrolledCount(Long noticeId) {
        log.info("[Schedule] 공지사항 파생 일정 등록, 완료 카운트 시작 - noticeId={}", noticeId);

        List<Schedule> schedules = scheduleRepository.findAllByNoticeId(noticeId);
        ScheduleEnrolledCount scheduleEnrolledCount = scheduleRepository.getEnrolledCounts(schedules);

        log.info("[Schedule] 공지사항 파생 일정 등록, 완료 카운트 완료 - enrolledCount={}, enrolledCompleteCount={}",
                 scheduleEnrolledCount.getEnrolledCount(), scheduleEnrolledCount.getCompletedCount());
        return scheduleEnrolledCount;
    }

    /**
     * 요청한 사용자가 일정 소유자이거나 관리자인 경우만 허용하는 메서드
     */
    private void validateAuthorization(Long userId, Long requestUserId) {
        if (!requestUserId.equals(userId) && isNotAdmin(userId)) {
            log.warn("[Authorization] 권한 없음 - userId={}, requestUserId={}, isAdmin={}", userId, requestUserId, false);
            throw new InvalidAuthorizationException(ErrorCode.INVALID_AUTHORIZATION, "userId", userId);
        }
        log.info("[Authorization] 권한 검증 완료 - userId={}, requestUserId={}, isAdmin={}", userId, requestUserId, true);
    }

    /**
     * 해당 일정에 알람을 생성/저장 하는 remindService 의 saveRemind 를 호출하는 메서드
     */
    private void saveScheduleReminds(Long userId, List<RemindRequest> remindRequests, Long scheduleId) {
        if (remindRequests == null || remindRequests.isEmpty()) {
            log.info("[Schedule] 알림 요청 없음 - scheduleId={}", scheduleId);
            return;
        }

        log.info("[Schedule] 알림 등록 시작 - scheduleId={}, remindCount={}", scheduleId, remindRequests.size());
        remindRequests.forEach(remindRequest -> {
            remindRequest.setScheduleId(scheduleId);
            try {
                remindService.saveRemind(userId, remindRequest);
            } catch (DuplicateValueException e) {
                log.warn("[Schedule] 알림 중복 발생 - scheduleId={}, remindTime={}", scheduleId,
                         remindRequest.getRemindDateTime());
                if (e.getErrorCode() != ErrorCode.REMIND_ALREADY_EXISTS) {
                    throw e;
                }
            }
        });
        log.info("[Schedule] 알림 등록 완료 - scheduleId={}", scheduleId);
    }

    /**
     * 관리자 권한 체크 메서드
     */
    private boolean isNotAdmin(Long userId) {
        return !userRoleRepository.existsByUserIdAndRoleIdIn(userId, Arrays.asList("ROLE_ADMIN", "ROLE_SYSADMIN"));
    }
}