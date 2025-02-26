package com.jetty.ssafficebe.notice.repository;

import com.jetty.ssafficebe.common.payload.BaseFilterRequest;
import com.jetty.ssafficebe.notice.entity.Notice;
import java.util.List;
import org.springframework.data.domain.Sort;

public interface NoticeRepositoryCustom {

    List<Notice> getNoticeListByCreateUserAndFilter(Long userId,
                                                    BaseFilterRequest baseFilterRequest,
                                                    Sort sort);

}