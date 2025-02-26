package com.jetty.ssafficebe.user.code;

import com.jetty.ssafficebe.commoncode.CommonCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Region implements CommonCode {
    SEOUL("서울"),
    GUMI("구미"),
    BU_UL_GYEONG("부울경"),
    GWANGJU("광주"),
    DAEJEON("대전");

    private final String title;

    @Override
    public String getCode() {
        return name();
    }

    @Override
    public String getTitle() {
        return title;
    }

    @Override
    public int getIndex() {
        return ordinal();
    }

    @Override
    public String getOption() {
        return null;
    }
}
