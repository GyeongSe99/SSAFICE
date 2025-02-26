package com.jetty.ssafficebe.common.scheduler;

import com.jetty.ssafficebe.mattermost.service.MattermostService;
import com.jetty.ssafficebe.remind.entity.Remind;
import com.jetty.ssafficebe.remind.repository.RemindRepository;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class RemindScheduler {

    private final RemindRepository remindRepository;
    private final MattermostService mattermostService;

    /**
     * 매일 자정 날짜가 지난 리마인드 만료 처리하는 메서드
     */
    @Scheduled(cron = "0 0 0 * * *")
    public void expireOldReminders() {
        LocalDateTime now = LocalDateTime.now();
        log.info("[Remind] 만료된 리마인드 처리 시작 - dateTime={}", now);

        try {
            long updatedCount = remindRepository.expireOldReminders(now);
            log.info("[Remind] 만료된 리마인드 처리 완료 - updatedCount={}", updatedCount);
        } catch (Exception e) {
            log.error("[Remind] 만료 처리 중 오류 발생 - error={}", e.getMessage(), e);
        }
    }

    /**
     * 매 시간 정각마다 리마인드를 체크하여 알림을 보내는 메서드
     * 현재 시간에 해당하는 리마인드를 조회하여 처리합니다.
     */
    @Scheduled(cron = "0 0 * * * *")
    public void checkReminders() {
        LocalDateTime now = LocalDateTime.now();
        log.info("[Remind] 리마인드 체크 시작 - dateTime={}", now);

        try {
            List<Remind> reminders = remindRepository.findCurrentReminders(now);
            log.info("[Remind] 리마인드 총 개수: {}", reminders.size());
            for (Remind remind : reminders) {
                processReminder(remind);
            }

            log.info("[Remind] 리마인드 체크 완료 - totalCount={}", reminders.size());
        } catch (Exception e) {
            log.error("[Remind] 리마인드 처리 중 오류 발생 - error={}", e.getMessage(), e);
        }
    }

    private void processReminder(Remind remind) {
        try {
            log.info("[Remind] 리마인드 처리 시작 - remindId={}", remind.getRemindId());

            Long scheduleId = remind.getScheduleId();
            Long userId = remind.getSchedule().getUserId();

            // test 용
            log.info("[Remind] 알림 전송 정보 - remindId={}, scheduleId={}, userId={}, title={}",
                     remind.getRemindId(),
                     scheduleId,
                     userId,
                     remind.getSchedule().getTitle());

            // ! 본인에게 개인 MM 메세지로 알람 전송
            // TODO: 테스트 후 적용할 것. 아직 mm 관련 테스트는 x
            mattermostService.sendRemindMessageToUserList(userId, List.of(userId), scheduleId);

            log.info("[Remind] 리마인드 처리 완료 - remindId={}", remind.getRemindId());
        } catch (Exception e) {
            log.error("[Remind] 리마인드 처리 중 오류 발생 - remindId={}, error={}",
                      remind.getRemindId(), e.getMessage(), e);
            // ! 에러가 발생해도 다른 알림은 계속 처리할 수 있도록 여기서 예외를 잡음
        }
    }
}
