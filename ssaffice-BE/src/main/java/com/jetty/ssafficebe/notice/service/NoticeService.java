package com.jetty.ssafficebe.notice.service;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.payload.BaseFilterRequest;
import com.jetty.ssafficebe.notice.entity.Notice;
import com.jetty.ssafficebe.notice.payload.NoticeDetail;
import com.jetty.ssafficebe.notice.payload.NoticeRequest;
import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.notice.payload.NoticeSummaryForAdmin;
import com.jetty.ssafficebe.user.payload.DashBoardCount;
import java.io.IOException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.multipart.MultipartFile;


public interface NoticeService {

    ApiResponse saveNotice(NoticeRequest noticeRequest, List<MultipartFile> files) throws IOException;

    ApiResponse deleteNotice(Long userId, Long noticeId);

    Page<NoticeSummary> getNoticePage(Long userId, Pageable pageable);

    List<Notice> getNoticeList(Long userId);

    NoticeDetail getNotice(Long userId, Long noticeId);

    List<NoticeSummaryForAdmin> getNoticePageByCreateUser(Long userId, BaseFilterRequest filterRequest, Sort sort);

    DashBoardCount getDashBoardCount(Long userId);

}
