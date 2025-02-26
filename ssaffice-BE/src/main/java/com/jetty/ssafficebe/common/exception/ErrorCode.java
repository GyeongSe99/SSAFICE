package com.jetty.ssafficebe.common.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    ROLE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 역할을 찾을 수 없습니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 사용자를 찾을 수 없습니다."),
    NOTICE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 공지사항을 찾을 수 없습니다."),
    SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 일정을 찾을 수 없습니다."),
    REMIND_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 알림을 찾을 수 없습니다."),
    MM_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 토큰을 찾을 수 없습니다."),
    CHANNEL_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 채널을 찾을 수 없습니다."),

    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 사용중인 이메일입니다."),
    ROLE_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 존재하는 역할입니다."),
    REMIND_ALREADY_EXISTS(HttpStatus.CONFLICT, "이미 해당 시간에 알림이 존재합니다."),

    INVALID_PASSWORD(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),
    INVALID_USAGE(HttpStatus.BAD_REQUEST, "usage 값이 잘못되었습니다."),
    INVALID_DATETIME_FORMAT(HttpStatus.BAD_REQUEST, "날짜/시간 형식이 올바르지 않습니다."),
    INVALID_MM_LOGIN(HttpStatus.BAD_REQUEST, "Mattermost 로그인 정보가 올바르지 않습니다."),

    INVALID_AUTHORIZATION(HttpStatus.FORBIDDEN, "해당 리소스에 대한 권한이 없습니다."),
    INVALID_MM_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    ;

    private final HttpStatus status;
    private final String msg;

    ErrorCode(HttpStatus status, String msg) {
        this.status = status;
        this.msg = msg;
    }
}
