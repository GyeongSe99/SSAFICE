package com.jetty.ssafficebe.search.repository;

import com.jetty.ssafficebe.search.document.ESNotice;
import com.jetty.ssafficebe.search.payload.ESNoticeSearchFilter;
import java.io.IOException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ESNoticeRepositoryCustom {

    Page<ESNotice> searchNotices(List<String> channelIdsByUserId, ESNoticeSearchFilter filter, Pageable pageable)
            throws IOException;

}
