package com.jetty.ssafficebe.search.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchRequest;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.jetty.ssafficebe.search.document.ESUser;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ESUserRepositoryCustomImpl implements ESUserRepositoryCustom {

    private final ElasticsearchClient elasticsearchClient;


    @Override
    public List<ESUser> searchUsers(String keyword) throws IOException {
        Query boolQuery = BoolQuery.of(bool -> bool.should(s -> s.match(t -> t.field("name").query(keyword)))
                                                   .should(s -> s.term(t -> t.field("name.keyword").value(keyword)))
                                                    .should(s -> s.match(t -> t.field("email").query(keyword)))
                                                   .should(s -> s.term(t -> t.field("email.keyword").value(keyword))))
                                   ._toQuery();

        SearchRequest searchRequest = SearchRequest.of(request -> request.index("user").query(boolQuery));

        SearchResponse<ESUser> searchResponse = elasticsearchClient.search(searchRequest, ESUser.class);

        return searchResponse.hits().hits().stream()
                             .map(Hit::source)
                             .filter(user -> user != null)
                             .toList();
    }
}
