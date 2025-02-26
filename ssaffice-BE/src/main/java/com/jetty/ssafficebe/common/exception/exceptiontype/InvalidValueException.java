package com.jetty.ssafficebe.common.exception.exceptiontype;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.errordetail.ErrorDetail;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InvalidValueException extends CustomException {

    private final ErrorDetail data;

    public InvalidValueException(ErrorCode errorCode, String fieldName, Object value) {
        super(errorCode);
        data = ErrorDetail.builder()
                          .errorCode(errorCode.name())
                          .fieldName(fieldName)
                          .value(value)
                          .build();
    }

}
