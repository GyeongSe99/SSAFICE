package com.jetty.ssafficebe.remind.service;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.DuplicateValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidAuthorizationException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.remind.converter.RemindConverter;
import com.jetty.ssafficebe.remind.entity.Remind;
import com.jetty.ssafficebe.remind.payload.RemindRequest;
import com.jetty.ssafficebe.remind.repository.RemindRepository;
import com.jetty.ssafficebe.role.repository.UserRoleRepository;
import com.jetty.ssafficebe.schedule.entity.Schedule;
import com.jetty.ssafficebe.schedule.repository.ScheduleRepository;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Log4j2
public class RemindServiceImpl implements RemindService {

    private final RemindRepository remindRepository;
    private final RemindConverter remindConverter;
    private final ScheduleRepository scheduleRepository;
    private final UserRoleRepository userRoleRepository;

    @Override
    public ApiResponse saveRemind(Long userId, RemindRequest remindRequest) {
        log.debug("[Remind] 알림 등록 시작 - userId={}, scheduleId={}, type={}, remindTime={}",
                userId, remindRequest.getScheduleId(), remindRequest.getRemindTypeCd(), remindRequest.getRemindDateTime());

        // ! 1. 일정 조회 및 권한 검증
        Schedule schedule = findAndValidateSchedule(userId, remindRequest.getScheduleId());

        // ! 2. 알림 타입 검증
        if (!Arrays.asList("DAILY", "ONCE").contains(remindRequest.getRemindTypeCd())) {
            log.warn("[Remind] 유효하지 않은 알림 타입 - type={}", remindRequest.getRemindTypeCd());
            throw new InvalidValueException(ErrorCode.INVALID_USAGE, "remindTypeCd", remindRequest.getRemindTypeCd());
        }

        // ! 3. 알림 중복 체크
        if (remindRepository.existsDuplicateRemind(schedule.getScheduleId(), remindRequest.getRemindTypeCd(), remindRequest.getRemindDateTime())) {
            log.warn("[Remind] 알림 중복 발생 - scheduleId={}, type={}, remindTime={}",
                    schedule.getScheduleId(), remindRequest.getRemindTypeCd(), remindRequest.getRemindDateTime());
            String errorMessage = "DAILY".equals(remindRequest.getRemindTypeCd()) ? "해당 시간에 이미 매일 알림이 설정되어 있습니다." : "이미 해당 시점에 알림이 설정되어 있습니다.";
            throw new DuplicateValueException(ErrorCode.REMIND_ALREADY_EXISTS, errorMessage, remindRequest.getRemindDateTime().toString());
        }

        // ! 4. Remind 생성 및 저장
        Remind remind = remindConverter.toRemind(remindRequest);
        if (remindRequest.getEssentialYn() == null) {
            remind.setEssentialYn("N");
        }
        schedule.addRemind(remind);
        Remind savedRemind = remindRepository.save(remind);
        log.info("[Remind] 알림 등록 완료 - remindId={}, scheduleId={}", savedRemind.getRemindId(), schedule.getScheduleId());

        // ! 5. Response 반환
        return new ApiResponse(true, "알림 등록에 성공하였습니다.", savedRemind.getRemindId());
    }

    @Override
    public ApiResponse deleteRemind(Long userId, Long remindId) {
        log.debug("[Remind] 알림 삭제 시작 - userId={}, remindId={}", userId, remindId);

        // ! 1. Remind 조회
        Remind remind = remindRepository.findById(remindId).orElseThrow(() -> new ResourceNotFoundException(
                ErrorCode.REMIND_NOT_FOUND, "해당 알림을 찾을 수 없습니다.", remindId.toString()));

        // ! 2. 일정 조회 및 권한 검증
        findAndValidateSchedule(userId, remind.getScheduleId());

        // ! 3. 알림 삭제
        remindRepository.delete(remind);
        log.info("[Remind] 알림 삭제 완료 - remindId={}", remindId);

        // ! 4. Response 반환
        return new ApiResponse(true, "알림이 성공적으로 삭제되었습니다.", remindId);
    }

    /**
     * 일정 조회 및 요청한 사용자가 일정 소유자이거나 관리자인 경우만 허용하는 메서드
     */
    private Schedule findAndValidateSchedule(Long userId, Long scheduleId) {
        Schedule schedule = scheduleRepository.findById(scheduleId).orElseThrow(() -> new ResourceNotFoundException(
                ErrorCode.SCHEDULE_NOT_FOUND, "해당 일정을 찾을 수 없습니다.", scheduleId));

        boolean isAdmin = userRoleRepository.existsByUserIdAndRoleIdIn(userId, Arrays.asList("ROLE_ADMIN", "ROLE_SYSADMIN"));

        if (!schedule.getUserId().equals(userId) && !isAdmin) {
            log.warn("[Authorization] 권한 없음 - userId={}, scheduleId={}, isAdmin={}", userId, scheduleId, isAdmin);
            throw new InvalidAuthorizationException(ErrorCode.INVALID_AUTHORIZATION, "userId", userId);
        }
        log.debug("[Authorization] 권한 검증 완료 - userId={}, scheduleId={}, isAdmin={}", userId, scheduleId, isAdmin);
        return schedule;
    }
}
