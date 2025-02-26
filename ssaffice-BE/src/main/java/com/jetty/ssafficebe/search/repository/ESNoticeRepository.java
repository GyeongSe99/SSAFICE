package com.jetty.ssafficebe.search.repository;

import com.jetty.ssafficebe.search.document.ESNotice;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ESNoticeRepository extends ElasticsearchRepository<ESNotice, Long>, ESNoticeRepositoryCustom {

}
