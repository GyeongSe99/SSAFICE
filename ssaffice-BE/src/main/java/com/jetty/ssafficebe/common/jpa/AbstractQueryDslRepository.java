package com.jetty.ssafficebe.common.jpa;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.core.types.dsl.PathBuilderFactory;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.Querydsl;

@RequiredArgsConstructor
public class AbstractQueryDslRepository {
    protected final JPAQueryFactory queryFactory;

    private final EntityManager entityManager;

    private Map<String, Querydsl> querydslMap = new HashMap<>();

    protected <T> Querydsl getQuerydsl(Class<T> clazz) {
        return querydslMap.computeIfAbsent(clazz.getName(), key -> {
            PathBuilder<T> builder = new PathBuilderFactory().create(clazz);
            return new Querydsl(entityManager, builder);
        });
    }

    protected <T> Page<T> getPageImpl(JPQLQuery<T> query, Pageable pageable) {
        long totalCount = query.fetchCount();
        List<T> results = getQuerydsl(query.getType()).applyPagination(pageable, query).fetch();
        return new PageImpl<>(results, pageable, totalCount);
    }

    protected <T> Map<T, Long> getCountMap(JPQLQuery<Tuple> query, Class<T> keyType) {
        Map<T, Long> map = new HashMap<>();
        List<Tuple> results = query.fetch();
        for (Tuple result : results) {
            map.put(result.get(0, keyType), result.get(1, Long.class));
        }
        return map;
    }

    protected <T> JPQLQuery<T> from(EntityPath<T> path) {
        return queryFactory.selectFrom(path);
    }

    /**
     * Sort를 적용한 리스트 조회
     * @param query : 정렬조건을 추가할 쿼리 몸통
     * @param sort : 정렬 조건
     */
    protected <T> List<T> getSortedList(JPQLQuery<T> query, Sort sort) {
        return getQuerydsl(query.getType()).applySorting(sort, query).fetch();
    }
}
