package com.jetty.ssafficebe.search.controller;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.security.userdetails.CustomUserDetails;
import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.search.payload.ESNoticeRequest;
import com.jetty.ssafficebe.search.payload.ESNoticeSearchFilter;
import com.jetty.ssafficebe.search.service.ESNoticeService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/es/notice")
@RequiredArgsConstructor
public class ESNoticeController {

    private final ESNoticeService esNoticeService;

    @PostMapping
    public ResponseEntity<ApiResponse> saveNotice(@RequestBody ESNoticeRequest request) {
        return ResponseEntity.ok(esNoticeService.saveNotice(request));
    }

    @DeleteMapping("/{noticeId}")
    public ResponseEntity<ApiResponse> deleteNotice(@PathVariable Long noticeId) {
        return ResponseEntity.ok(esNoticeService.deleteNotice(noticeId));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<NoticeSummary>> searchGlobalNotice(@AuthenticationPrincipal CustomUserDetails userDetails,
                                                                  @RequestBody ESNoticeSearchFilter filter,
                                                                  @PageableDefault( page = 0, size = 10) Pageable pageable)
            throws IOException {
        return ResponseEntity.ok(esNoticeService.searchGlobalNotice(userDetails.getUserId(), filter, pageable));
    }
}