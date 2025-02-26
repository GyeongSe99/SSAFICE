package com.jetty.ssafficebe.common.exception.exceptiontype;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.errordetail.ErrorDetail;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@NoArgsConstructor
@Getter
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends CustomException {

    private ErrorDetail data;

    public ResourceNotFoundException(ErrorCode errorCode, String fieldName, Object value) {
        super(errorCode);
        data = ErrorDetail.builder()
                          .errorCode(errorCode.name())
                          .fieldName(fieldName)
                          .value(value)
                          .build();
    }
}
