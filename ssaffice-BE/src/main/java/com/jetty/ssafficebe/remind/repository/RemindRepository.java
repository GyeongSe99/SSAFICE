package com.jetty.ssafficebe.remind.repository;

import com.jetty.ssafficebe.remind.entity.Remind;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RemindRepository extends JpaRepository<Remind, Long>, RemindRepositoryCustom {

    void deleteByScheduleId(Long scheduleId);

}
