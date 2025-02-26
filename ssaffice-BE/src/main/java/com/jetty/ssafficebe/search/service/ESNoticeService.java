package com.jetty.ssafficebe.search.service;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.notice.entity.Notice;
import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.search.payload.ESNoticeRequest;
import com.jetty.ssafficebe.search.payload.ESNoticeSearchFilter;
import java.io.IOException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ESNoticeService {

    ApiResponse saveNotice(ESNoticeRequest request);

    ApiResponse deleteNotice(Long noticeId);

    Page<NoticeSummary> searchGlobalNotice(Long userId, ESNoticeSearchFilter filter, Pageable pageable) throws IOException;

    void saveNotice(Notice notice);
}
