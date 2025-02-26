package com.jetty.ssafficebe.user.code;

import com.jetty.ssafficebe.commoncode.CommonCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum Track implements CommonCode {
    NON_MAJOR_PYTHON("비전공-파이썬"),
    NON_MAJOR_JAVA("비전공-자바"),
    MAJOR_JAVA("전공-자바"),
    EMBEDDED("임베디드"),
    MOBILE("모바일"),
    DATA("데이터")
    ;


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
