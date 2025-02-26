package com.jetty.ssafficebe.common.payload;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ApiResponse {

    private boolean success;
    private HttpStatus status = HttpStatus.OK;
    private String message;
    private Object data;

    public ApiResponse(Boolean success) {
        this.success = success;
    }

    public ApiResponse(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(Boolean success, HttpStatus status, String message) {
        this.success = success;
        this.status = status;
        this.message = message;
    }

    public ApiResponse(Boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public ApiResponse(Boolean success, HttpStatus status, String message, Object data) {
        this.success = success;
        this.status = status;
        this.message = message;
        this.data = data;
    }

}
