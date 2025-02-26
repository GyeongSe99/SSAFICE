package com.jetty.ssafficebe.common.exception.exceptiontype;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public abstract class CustomException extends RuntimeException {
    protected ErrorCode errorCode;
}
