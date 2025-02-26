package com.jetty.ssafficebe.common.jpa;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidValueException;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

public class DateTimeConverter {

    public static LocalDateTime toLocalDateTime(String dateTimeStr) {
        if (dateTimeStr == null || dateTimeStr.isEmpty()) {
            return null;
        }
        try {
            return LocalDateTime.parse(dateTimeStr);
        } catch (DateTimeParseException e) {
            throw new InvalidValueException(ErrorCode.INVALID_DATETIME_FORMAT, "날짜/시간 형식이 올바르지 않습니다.", dateTimeStr);
        }
    }
}
