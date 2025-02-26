package com.jetty.ssafficebe.notice.repository;

import com.jetty.ssafficebe.notice.entity.Notice;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long>, NoticeRepositoryCustom {

    Page<Notice> findByChannelIdIn(List<String> channelIds, Pageable pageable);

    List<Notice> findByChannelIdIn(List<String> channelIds);
}
