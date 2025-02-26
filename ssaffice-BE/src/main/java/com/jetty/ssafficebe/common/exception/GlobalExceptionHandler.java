package com.jetty.ssafficebe.common.exception;

import com.jetty.ssafficebe.common.exception.exceptiontype.DuplicateValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidAuthorizationException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidTokenException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DuplicateValueException.class)
    protected ResponseEntity<ApiResponse> handleDuplicateValueException(DuplicateValueException e) {
        HttpStatus status = e.getErrorCode().getStatus();

        return ResponseEntity.status(status)
                             .body(new ApiResponse(false, status, e.getMessage(), e.getData()));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    protected ResponseEntity<ApiResponse> handleResourceNotFoundException(ResourceNotFoundException e) {
        HttpStatus status = e.getErrorCode().getStatus();

        return ResponseEntity.status(status)
                             .body(new ApiResponse(false, status, e.getMessage(), e.getData()));
    }

    @ExceptionHandler(InvalidValueException.class)
    protected ResponseEntity<ApiResponse> handleInvalidValueException(InvalidValueException e) {
        HttpStatus status = e.getErrorCode().getStatus();

        return ResponseEntity.status(status)
                             .body(new ApiResponse(false, status, e.getMessage(), e.getData()));
    }

    @ExceptionHandler(InvalidAuthorizationException.class)
    protected ResponseEntity<ApiResponse> handleInvalidAuthorizationException(InvalidAuthorizationException e) {
        HttpStatus status = e.getErrorCode().getStatus();

        return ResponseEntity.status(status)
                             .body(new ApiResponse(false, status, e.getMessage(), e.getData()));
    }

    @ExceptionHandler(InvalidTokenException.class)
    protected ResponseEntity<ApiResponse> handleInvalidTokenException(InvalidTokenException e) {
        HttpStatus status = e.getErrorCode().getStatus();

        return ResponseEntity.status(status)
                             .body(new ApiResponse(false, status, e.getMessage()));
    }
}
