package com.jetty.ssafficebe.common.exception.exceptiontype;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidTokenException extends CustomException{

    public InvalidTokenException(ErrorCode errorCode) {
        super(errorCode);
    }

}
