package com.jetty.ssafficebe.notice.controller;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.payload.BaseFilterRequest;
import com.jetty.ssafficebe.common.security.userdetails.CustomUserDetails;
import com.jetty.ssafficebe.mattermost.service.MattermostService;
import com.jetty.ssafficebe.notice.payload.NoticeDetail;
import com.jetty.ssafficebe.notice.payload.NoticeRequest;
import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.notice.payload.NoticeSummaryForAdmin;
import com.jetty.ssafficebe.notice.service.NoticeService;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@RestController
@RequestMapping("/api/notice")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;
    private final MattermostService mattermostService;
    /**
     * 공지사항 추가
     */
    @PostMapping("/admin")
    public ResponseEntity<ApiResponse> saveNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                  @RequestPart("notice") NoticeRequest noticeRequest,
                                                  @RequestPart(value = "files", required = false) List<MultipartFile> files)
            throws IOException {
        log.info("[saveNotice] 공지 저장 시작, title : {}", noticeRequest.getTitle());

        if (files == null) {
            System.out.println("파일 null");
            files = Collections.emptyList();
        }
        mattermostService.sendMessageToChannel(userDetails.getUserId(), noticeRequest);
        return ResponseEntity.ok(noticeService.saveNotice(noticeRequest, files));
    }

    /**
     * 공지사항 삭제
     */
    @DeleteMapping("/admin/{noticeId}")
    public ResponseEntity<ApiResponse> deleteNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                    @PathVariable Long noticeId) {
        return ResponseEntity.ok(noticeService.deleteNotice(userDetails.getUserId(), noticeId));
    }

    /**
     * 전체 공지사항 조회 : 내가 속해있는 채널의 공지사항을 전체 조회
     */
    @GetMapping
    public ResponseEntity<Page<NoticeSummary>> getNoticeList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PageableDefault(size = 20,
                             sort = "createdAt",
                             direction = Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(noticeService.getNoticePage(userDetails.getUserId(), pageable));
    }

    /**
     * 공지사항 상세 조회
     */
    @GetMapping("/{noticeId}")
    public ResponseEntity<NoticeDetail> getNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                  @PathVariable Long noticeId) {
        return ResponseEntity.ok(noticeService.getNotice(userDetails.getUserId(), noticeId));
    }

    /**
     * 내가 작성한 공지사항 리스트 조회
     */
    @GetMapping("/admin/my")
    public ResponseEntity<List<NoticeSummaryForAdmin>> getMyNoticeList(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @ModelAttribute BaseFilterRequest filterRequest,
            @SortDefault(sort = "endDateTime", direction = Sort.Direction.ASC) Sort sort) {
        return ResponseEntity.ok(noticeService.getNoticePageByCreateUser(userDetails.getUserId(), filterRequest, sort));
    }
}
