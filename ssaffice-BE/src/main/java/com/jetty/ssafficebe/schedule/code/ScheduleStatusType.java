package com.jetty.ssafficebe.schedule.code;

import com.jetty.ssafficebe.commoncode.CommonCode;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum ScheduleStatusType implements CommonCode {

    TODO("해야 할 일"),
    IN_PROGRESS("진행 중"),
    DONE("완료"),
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
        return "";
    }
}
