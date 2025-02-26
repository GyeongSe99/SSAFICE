package com.jetty.ssafficebe.search.service;

import com.jetty.ssafficebe.channel.respository.UserChannelRepository;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.notice.entity.Notice;
import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.notice.repository.NoticeRepository;
import com.jetty.ssafficebe.search.converter.ESNoticeConverter;
import com.jetty.ssafficebe.search.document.ESNotice;
import com.jetty.ssafficebe.search.payload.ESNoticeRequest;
import com.jetty.ssafficebe.search.payload.ESNoticeSearchFilter;
import com.jetty.ssafficebe.search.repository.ESNoticeRepository;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@Transactional
@RequiredArgsConstructor
public class ESNoticeServiceImpl implements ESNoticeService {

    private final ESNoticeRepository esNoticeRepository;
    private final ESNoticeConverter esNoticeConverter;

    private final UserChannelRepository userChannelRepository;
    private final NoticeRepository noticeRepository;

    @Override
    public ApiResponse saveNotice(ESNoticeRequest request) {
        ESNotice saved = esNoticeRepository.save(esNoticeConverter.toESNotice(request));
        return new ApiResponse(true, "ES에 추가 성공", saved.getNoticeId());
    }

    @Override
    public ApiResponse deleteNotice(Long noticeId) {
        esNoticeRepository.deleteById(noticeId);
        return new ApiResponse(true, "삭제 성공", noticeId);
    }

    @Override
    public Page<NoticeSummary> searchGlobalNotice(Long userId, ESNoticeSearchFilter filter, Pageable pageable) throws IOException {
        // 1. 사용자 아이디로 사용자가 속해있는 채널 아이디 조회
        List<String> channelIdsByUserId = this.userChannelRepository.findChannelIdsByUserId(userId);

        // 2. 채널 아이디 리스트로 공지 filter 적용
        Page<ESNotice> esNotices = this.esNoticeRepository.searchNotices(channelIdsByUserId, filter, pageable);

        // 4. DTO 변환하여 리턴
        return esNotices.map(esNoticeConverter::toNoticeSummary);
    }

    @Override
    public void saveNotice(Notice notice) {
        log.info("ES에 공지사항 저장");
        ESNotice esNotice = esNoticeConverter.toESNotice(notice);
        esNoticeRepository.save(esNotice);
    }
}