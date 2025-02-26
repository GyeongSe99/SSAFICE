package com.jetty.ssafficebe.common.utils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.BiConsumer;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.util.StringUtils;

public class CollectionUtil {

    private CollectionUtil() {
    }

    /**
     * Collection을 변환하는 메소드. fromList에서 각 요소를 function을 통해 변환하여 새로운 리스트로 반환.
     *
     * @param fromList 변환할 컬렉션
     * @param function 변환할 함수
     * @param <F>      소스 타입
     * @param <T>      타겟 타입
     * @return 변환된 리스트
     */
    public static <F, T> List<T> transform(
            Collection<F> fromList, Function<? super F, ? extends T> function) {
        ArrayList<T> list = new ArrayList<>();
        if (fromList != null) {
            fromList.forEach(src -> list.add(function.apply(src)));
        }
        return list;
    }

    /**
     * Iterable을 변환하는 메소드. fromList에서 각 요소를 function을 통해 변환하여 새로운 리스트로 반환.
     *
     * @param fromList 변환할 Iterable
     * @param function 변환할 함수
     * @param <F>      소스 타입
     * @param <T>      타겟 타입
     * @return 변환된 리스트
     */
    public static <F, T> List<T> transform(
            Iterable<F> fromList, Function<? super F, ? extends T> function) {
        ArrayList<T> list = new ArrayList<>();
        if (fromList != null) {
            fromList.forEach(src -> list.add(function.apply(src)));
        }
        return list;
    }

    /**
     * 중복되지 않은 변환된 리스트 반환. fromList에서 각 요소를 targetFunction으로 변환하고, 비어 있지 않은 값들만 필터링하여 중복을 제거.
     *
     * @param fromList       변환할 컬렉션
     * @param targetFunction 변환할 함수
     * @param <F>            소스 타입
     * @param <T>            타겟 타입
     * @return 중복이 제거된 리스트
     */
    public static <F, T> List<T> transformDistinct(
            Collection<F> fromList, Function<? super F, ? extends T> targetFunction) {
        List<T> list = new ArrayList<>();
        if (fromList != null) {
            list =
                    fromList.stream()
                            .map(targetFunction)
                            .filter(x -> !StringUtils.isEmpty(x))
                            .distinct()
                            .collect(Collectors.toList());
        }
        return list;
    }

    /**
     * srcList에서 matchList의 keySet과 일치하지 않는 요소들을 제거.
     *
     * @param srcList          원본 컬렉션
     * @param matchList        매칭할 대상 컬렉션
     * @param srcKeyFunction   원본 컬렉션에서 Key를 추출할 함수
     * @param matchKeyFunction 매칭 대상 컬렉션에서 Key를 추출할 함수
     * @param <F>              원본 타입
     * @param <T>              매칭 대상 타입
     * @param <S>              Key 타입
     */
    public static <F, T, S> void removeNoneMatch(
            Collection<F> srcList,
            Collection<T> matchList,
            Function<? super F, ? extends S> srcKeyFunction,
            Function<? super T, ? extends S> matchKeyFunction) {
        Set<S> keySet = new HashSet<>();
        for (T t : matchList) {
            S key = matchKeyFunction.apply(t);
            if (key != null) {
                keySet.add(key);
            }
        }
        srcList.removeIf(f -> !keySet.contains(srcKeyFunction.apply(f)));
    }

    /**
     * srcList에서 matchList의 keySet과 일치하지 않는 요소들을 반환.
     *
     * @param srcList          원본 컬렉션
     * @param matchList        매칭할 대상 컬렉션
     * @param srcKeyFunction   원본 컬렉션에서 Key를 추출할 함수
     * @param matchKeyFunction 매칭 대상 컬렉션에서 Key를 추출할 함수
     * @param <F>              원본 타입
     * @param <T>              매칭 대상 타입
     * @param <S>              Key 타입
     * @return 매칭되지 않은 요소들이 담긴 리스트
     */
    public static <F, T, S> List<F> findNoneMatch(
            Collection<F> srcList,
            Collection<T> matchList,
            Function<? super F, ? extends S> srcKeyFunction,
            Function<? super T, ? extends S> matchKeyFunction) {
        Set<S> keySet = new HashSet<>();
        for (T t : matchList) {
            S key = matchKeyFunction.apply(t);
            if (key != null) {
                keySet.add(key);
            }
        }
        return srcList.stream()
                      .filter(f -> !keySet.contains(srcKeyFunction.apply(f)))
                      .collect(Collectors.toList());
    }

    /**
     * 원본 리스트에 대한 삽입/수정/삭제 작업을 처리. - 업데이트 대상이 없는 원본 데이터를 삭제 - 업데이트 대상이 있는 원본 데이터를 수정 - 원본에 없는 데이터를 삽입
     *
     * @param targetList        원본 컬렉션
     * @param srcList           업데이트 대상 컬렉션
     * @param targetKeyFunction 원본에서 Key를 추출할 함수
     * @param srcKeyFunction    업데이트 대상에서 Key를 추출할 함수
     * @param deleteFunction    삭제할 요소에 대한 처리
     * @param updateFunction    업데이트할 요소에 대한 처리
     * @param insertFunction    삽입할 요소에 대한 처리
     * @param <F>               원본 타입
     * @param <T>               업데이트 대상 타입
     * @param <S>               Key 타입
     */
    public static <F, T, S> void deleteOrUpdateOrInsert(
            Collection<F> targetList, // 원본
            Collection<T> srcList, // 업데이트 대상
            Function<F, S> targetKeyFunction, // 원본 Key
            Function<T, S> srcKeyFunction, // 업데이트 대상 Key
            Consumer<Collection<F>> deleteFunction,
            BiConsumer<F, T> updateFunction,
            Function<T, F> insertFunction) {

        // Update Or Save하고자 하는 Collection을 Map으로 mapping
        Map<S, T> srcMap = new HashMap();
        for (T t : srcList) {
            S key = srcKeyFunction.apply(t);
            if (key != null) {
                srcMap.put(key, t);
            }
        }

        if (deleteFunction != null) {
            // 원본에서 업데이트 할 대상이 없는 건은 삭제
            Collection<F> deleteList =
                    targetList.stream()
                              .filter(f -> !srcMap.containsKey(targetKeyFunction.apply(f)))
                              .collect(Collectors.toList());

            deleteFunction.accept(deleteList);
        }

        // 불필요한 Target 삭제
        targetList.removeIf(f -> !srcMap.containsKey(targetKeyFunction.apply(f)));

        // 원본 Collection을 Map으로 mapping
        Map<S, F> targetMap = new HashMap();
        for (F f : targetList) {
            S key = targetKeyFunction.apply(f);
            if (key != null) {
                targetMap.put(key, f);
            }
        }

        for (T t : srcList) {
            F f = targetMap.get(srcKeyFunction.apply(t));
            if (f != null) {
                if (updateFunction != null) {
                    updateFunction.accept(f, t);
                }
            } else {
                if (insertFunction != null) {
                    F result = insertFunction.apply(t);
                    targetList.add(result);
                    targetMap.put(targetKeyFunction.apply(result), result);
                }
            }
        }
    }

    /**
     * 단일 요소로 초기화된 ArrayList를 반환.
     *
     * @param t   초기화할 요소
     * @param <T> 요소의 타입
     * @return 단일 요소가 담긴 ArrayList
     */
    public static <T> ArrayList<T> generateArrayListOf(T t) {
        ArrayList<T> list = new ArrayList<>();
        list.add(t);
        return list;
    }
}
