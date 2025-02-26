package com.jetty.ssafficebe.user.code;

import com.jetty.ssafficebe.commoncode.CommonCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Curriculum implements CommonCode {
    FIRST_PROJECT("1학기 관통"),
    SECOND_COMMON("2학기 공통"),
    SECOND_SPECIALIZED("2학기 특화"),
    SECOND_AUTONOMOUS("2학기 자율");

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
