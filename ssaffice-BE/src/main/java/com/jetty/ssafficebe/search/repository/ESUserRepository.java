package com.jetty.ssafficebe.search.repository;

import com.jetty.ssafficebe.search.document.ESUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface ESUserRepository extends ElasticsearchRepository<ESUser, Long>, ESUserRepositoryCustom {

}
