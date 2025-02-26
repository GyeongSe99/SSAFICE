package com.jetty.ssafficebe.remind.repository;

import com.jetty.ssafficebe.remind.entity.Remind;
import java.time.LocalDateTime;
import java.util.List;

public interface RemindRepositoryCustom {

    boolean existsDuplicateRemind(Long scheduleId, String remindTypeCd, LocalDateTime remindDateTime);

    List<Remind> findCurrentReminders(LocalDateTime now);

    long expireOldReminders(LocalDateTime now);
}
