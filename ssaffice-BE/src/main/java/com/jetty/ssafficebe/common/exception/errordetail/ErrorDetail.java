package com.jetty.ssafficebe.common.exception.errordetail;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ErrorDetail {

    private String errorCode;
    private String fieldName;
    private Object value;
}
