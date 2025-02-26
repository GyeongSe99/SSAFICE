package com.jetty.ssafficebe.search.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.FieldValue;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.jetty.ssafficebe.search.document.ESNotice;
import com.jetty.ssafficebe.search.payload.ESNoticeSearchFilter;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

@RequiredArgsConstructor
public class ESNoticeRepositoryCustomImpl implements ESNoticeRepositoryCustom {

    private final ElasticsearchClient elasticsearchClient;

    @Override
    public Page<ESNotice> searchNotices(List<String> channelIdsByUserId, ESNoticeSearchFilter filter, Pageable pageable)
            throws IOException {
        BoolQuery.Builder boolQuery = new BoolQuery.Builder();

        // 채널 ID 리스트에 포함된 경우만 검색되도록 필터링
        if (channelIdsByUserId != null && !channelIdsByUserId.isEmpty()) {
            List<FieldValue> fieldValues = channelIdsByUserId.stream()
                                                             .map(FieldValue::of)
                                                             .toList();

            boolQuery.filter(f -> f.terms(t -> t
                    .field("channelId") // Elasticsearch 인덱스의 필드 이름
                    .terms(v -> v.value(fieldValues)) // 채널 ID 리스트 값 설정
            ));
        }

        // 제목과 본문에서 문장으로 들어온 검색어를 검색
        if (filter.getKeyword() != null && !filter.getKeyword().isEmpty()) {
            boolQuery.should(m -> m.matchPhrase(mpq -> mpq.field("content").query(filter.getKeyword())))
                     .should(m -> m.matchPhrase(mpq -> mpq.field("title").query(filter.getKeyword())));
        }

        // 최종 쿼리 설정
        Query finalQuery = boolQuery.build()._toQuery();

        // 검색 요청 생성
        SearchRequest searchRequest = new SearchRequest.Builder()
                .index("notice")
                .query(finalQuery)
                .from((int) pageable.getOffset())
                .size(pageable.getPageSize())
                .build();

        // 검색 실행
        SearchResponse<ESNotice> searchResponse = elasticsearchClient.search(searchRequest, ESNotice.class);

        // 검색 결과 처리
        List<ESNotice> notices = searchResponse.hits().hits().stream()
                                               .map(Hit::source)
                                               .collect(Collectors.toList());

        long totalHits = searchResponse.hits().total() != null ? searchResponse.hits().total().value() : 0;

        return new PageImpl<>(notices, pageable, totalHits);
    }
}
