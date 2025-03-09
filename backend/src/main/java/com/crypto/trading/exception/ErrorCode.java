package com.crypto.trading.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    INVALID_INPUT(HttpStatus.BAD_REQUEST, 4001, "Invalid input data"),
    RESOURCE_NOT_FOUND(HttpStatus.NOT_FOUND, 4004, "Resource not found"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 5000, "An unexpected error occurred"),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 4003, "Unauthorized access"),
    FORBIDDEN(HttpStatus.FORBIDDEN, 4005, "Forbidden action");

    private final HttpStatus httpStatus;
    private final int errorCode;
    private final String defaultMessage;
}
