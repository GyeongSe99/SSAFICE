package com.jetty.ssafficebe.common.exception.exceptiontype;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.errordetail.ErrorDetail;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@Getter
@ResponseStatus(HttpStatus.CONFLICT)
public class DuplicateValueException extends CustomException {

    private ErrorDetail data;

    public DuplicateValueException(ErrorCode errorCode, String fieldName, String value) {
        super(errorCode);
        data = ErrorDetail.builder()
                          .errorCode(errorCode.name())
                          .fieldName(fieldName)
                          .value(value).build();

    }

}