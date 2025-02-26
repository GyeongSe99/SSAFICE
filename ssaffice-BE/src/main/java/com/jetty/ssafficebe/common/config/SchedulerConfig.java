package com.jetty.ssafficebe.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;

@Configuration  // Spring 설정 클래스임을 표시
@EnableScheduling  // Spring 스케줄링 기능을 활성화
public class SchedulerConfig implements SchedulingConfigurer {

    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) {
        // 스케줄링 작업을 실행할 ThreadPoolTaskScheduler 생성
        ThreadPoolTaskScheduler threadPoolTaskScheduler = new ThreadPoolTaskScheduler();

        // 스케줄러가 사용할 스레드 풀의 크기를 5로 설정
        // 동시에 최대 5개의 스케줄링 작업이 실행될 수 있음
        threadPoolTaskScheduler.setPoolSize(5);

        // 생성되는 스레드의 이름 접두사 설정
        // 예: scheduled-task-pool-1, scheduled-task-pool-2, ...
        // 로그나 모니터링에서 스케줄링 작업을 식별하기 쉽게 함
        threadPoolTaskScheduler.setThreadNamePrefix("scheduled-task-pool-");

        // 스레드 풀을 초기화하고 시작
        threadPoolTaskScheduler.initialize();

        // 생성한 스케줄러를 Spring 스케줄링 작업 등록기에 설정
        // 이후 @Scheduled 어노테이션이 붙은 메서드들이 이 스케줄러를 사용하게 됨
        taskRegistrar.setTaskScheduler(threadPoolTaskScheduler);
    }
}
