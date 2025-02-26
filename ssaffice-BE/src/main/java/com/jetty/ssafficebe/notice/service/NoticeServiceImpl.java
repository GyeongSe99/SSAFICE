package com.jetty.ssafficebe.notice.service;

import com.jetty.ssafficebe.channel.payload.ChannelSummary;
import com.jetty.ssafficebe.channel.service.ChannelService;
import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidAuthorizationException;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.payload.BaseFilterRequest;
import com.jetty.ssafficebe.file.service.AttachmentFileService;
import com.jetty.ssafficebe.notice.converter.NoticeConverter;
import com.jetty.ssafficebe.notice.entity.Notice;
import com.jetty.ssafficebe.notice.payload.NoticeCounts;
import com.jetty.ssafficebe.notice.payload.NoticeDetail;
import com.jetty.ssafficebe.notice.payload.NoticeRequest;
import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.notice.payload.NoticeSummaryForAdmin;
import com.jetty.ssafficebe.notice.repository.NoticeRepository;
import com.jetty.ssafficebe.schedule.entity.Schedule;
import com.jetty.ssafficebe.schedule.payload.ScheduleStatusCount;
import com.jetty.ssafficebe.schedule.repository.ScheduleRepository;
import com.jetty.ssafficebe.schedule.service.ScheduleService;
import com.jetty.ssafficebe.search.service.ESNoticeService;
import com.jetty.ssafficebe.user.converter.UserConverter;
import com.jetty.ssafficebe.user.payload.DashBoardCount;
import com.jetty.ssafficebe.user.repository.UserRepository;
import com.jetty.ssafficebe.user.service.UserService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final NoticeConverter noticeConverter;
    private final AttachmentFileService attachmentFileService;

    private final ScheduleService scheduleService;
    private final ScheduleRepository scheduleRepository;

    private final ChannelService channelService;

    private final UserConverter userConverter;
    private final UserService userService;
    private final UserRepository userRepository;

    private final ESNoticeService esNoticeService;

    @Override
    public ApiResponse saveNotice(NoticeRequest noticeRequest, List<MultipartFile> files) throws IOException {
        Notice notice = noticeConverter.toNotice(noticeRequest);
        Notice savedNotice = noticeRepository.save(notice);

        // 파일 업로드
        for (MultipartFile file : files) {
            attachmentFileService.uploadFile(file, "notice", savedNotice.getNoticeId());
        }

        // 1. 채널 아이디로 공지 대상자 조회
        List<Long> usersByChannelId = userService.getUserIdsByChannelId(noticeRequest.getChannelId());

        // 2. 공지 대상자 일정 추가
        scheduleService.saveSchedulesFromNotice(savedNotice, usersByChannelId);

        // 3. ElasticSearch에 공지 추가
        esNoticeService.saveNotice(savedNotice);

        return new ApiResponse(true, HttpStatus.CREATED, "공지사항 추가 성공", savedNotice.getTitle());
    }

    @Transactional
    @Override
    public ApiResponse deleteNotice(Long userId, Long noticeId) {
        // 공지Id로 공지사항 조회
        Notice notice = noticeRepository.findById(noticeId).orElseThrow(() -> new ResourceNotFoundException(
                ErrorCode.NOTICE_NOT_FOUND, "해당 공지사항을 찾을 수 없습니다.", noticeId));

        // 공지사항 주인인지 확인
        if (!notice.getCreatedBy().equals(userId)) {
            throw new InvalidAuthorizationException(ErrorCode.INVALID_AUTHORIZATION, "userId", userId);
        }

        noticeRepository.delete(notice);

        // ElasticSearch에서도 삭제
        esNoticeService.deleteNotice(noticeId);

        return new ApiResponse(true, HttpStatus.OK, "공지사항 삭제 성공", noticeId);
    }

    @Override
    public Page<NoticeSummary> getNoticePage(Long userId, Pageable pageable) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "해당 유저를 찾을 수 없습니다.", userId);
        }

        // 1. 유저가 속해있는 채널 아이디 조회
        List<ChannelSummary> channelsByUserId = channelService.getChannelListByUserId(userId);
        List<String> channelIds = channelsByUserId.stream()
                                                  .map(ChannelSummary::getChannelId)
                                                  .toList();

        if (channelIds.isEmpty()) {
            return Page.empty();
        }

        // 2. 채널 아이디로 공지사항 조회
        Page<Notice> noticePage = noticeRepository.findByChannelIdIn(channelIds, pageable);

        return noticePage.map(noticeConverter::toNoticeSummary);
    }

    @Override
    public List<Notice> getNoticeList(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "해당 유저를 찾을 수 없습니다.", userId);
        }

        List<ChannelSummary> channelsByUserId = channelService.getChannelListByUserId(userId);
        List<String> channelIds = channelsByUserId.stream()
                                                  .map(ChannelSummary::getChannelId)
                                                  .toList();

        if (channelIds.isEmpty()) {
            return List.of();
        }

        return noticeRepository.findByChannelIdIn(channelIds);
    }

    @Override
    public NoticeDetail getNotice(Long userId, Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId).orElseThrow(() -> new ResourceNotFoundException(
                ErrorCode.NOTICE_NOT_FOUND, "해당 공지사항을 찾을 수 없습니다.", noticeId));

        NoticeDetail noticeDetail = noticeConverter.toNoticeDetail(notice);

        // 주인인지 확인
        if (notice.getCreateUser().getUserId().equals(userId)) {
            noticeDetail.setOwner(true);
        }

        // 작성자 정보 매핑
        noticeDetail.setCreateUser(userConverter.toCreatedBySummary(notice.getCreateUser()));

        // 공지사항 아이디로 첨부파일리스트 조회 후 매핑
        noticeDetail.setAttachmentFiles(attachmentFileService.getAttachmentFilesSummaryByRefId(noticeId));

        return noticeDetail;
    }

    @Override
    public List<NoticeSummaryForAdmin> getNoticePageByCreateUser(Long userId, BaseFilterRequest filterRequest,
                                                                 Sort sort) {

        List<Notice> result = noticeRepository.getNoticeListByCreateUserAndFilter(userId, filterRequest, sort);
        List<NoticeSummary> noticeSummaryList = noticeConverter.toNoticeSummaryList(result);

        // 수행여부 count 추가
        return noticeSummaryList.stream().map(noticeSummary -> {
            NoticeSummaryForAdmin noticeSummaryForAdmin = new NoticeSummaryForAdmin();
            noticeSummaryForAdmin.setNoticeSummary(noticeSummary);
            noticeSummaryForAdmin.setScheduleEnrolledCount(scheduleService.getEnrolledCount(noticeSummary.getNoticeId()));
            return noticeSummaryForAdmin;
        }).toList();
    }

    @Override
    public DashBoardCount getDashBoardCount(Long userId) {

        NoticeCounts noticeCounts = new NoticeCounts();
        // 0. 유저 아이디로 공지 가져오기
        List<Notice> noticeList = this.getNoticeList(userId);

        // 1. 내가 해당하는 채널의 공지 개수 -> NoticeCounts.total
        noticeCounts.setTotal((long) noticeList.size());

        // 2. 그 중 필수 공지 개수 -> NoticeCounts.essential
        long essentialCount = noticeList.stream()
                                        .filter(Notice::isEssential)
                                        .count();
        noticeCounts.setEssential(essentialCount);

        // 3. 내 일정 가져오기
        List<Schedule> scheduleList = scheduleRepository.findByUserIdAndEnrollYn(userId, "Y");

        // 공지사항에서 파생된 일정 중, 미완료 상태의 일정 수  (필수 + 선택) -> NoticeCounts.enrolled
        long enrolledCount = scheduleList.stream()
                                         .filter(schedule -> !schedule.getScheduleStatusTypeCd().equals("DONE"))
                                         .filter(schedule -> (schedule.getScheduleSourceTypeCd().equals("GLOBAL") ||
                                                 schedule.getScheduleSourceTypeCd().equals("TEAM")))
                                         .count();
        noticeCounts.setEnrolled(enrolledCount);

        // 4. 내 일정 ScheduleStatusCount
        ScheduleStatusCount scheduleStatusCount = scheduleRepository.getStatusCounts(scheduleList);

        return DashBoardCount.builder()
                             .noticeCounts(noticeCounts)
                             .scheduleCounts(scheduleStatusCount)
                             .build();
    }
}