package com.crypto.trading.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.UUID;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TradingException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(TradingException ex) {
        String uuid = UUID.randomUUID().toString();

        log.error("Exception UUID: {}, Error Code: {}, Message: {}", uuid, ex.getErrorCode().getErrorCode(), ex.getMessage());

        ErrorResponse errorResponse = new ErrorResponse(uuid, ex.getErrorCode().getErrorCode(), ex.getMessage());
        return new ResponseEntity<>(errorResponse, ex.getErrorCode().getHttpStatus());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        String uuid = UUID.randomUUID().toString();

        log.error("Exception UUID: {}, Message: {}", uuid, ex.getMessage(), ex);

        ErrorResponse errorResponse = new ErrorResponse(uuid, ErrorCode.INTERNAL_SERVER_ERROR.getErrorCode(), ErrorCode.INTERNAL_SERVER_ERROR.getDefaultMessage());
        return new ResponseEntity<>(errorResponse, ErrorCode.INTERNAL_SERVER_ERROR.getHttpStatus());
    }

    @Getter
    @AllArgsConstructor
    public static class ErrorResponse {
        private String uuid;
        private int errorCode;
        private String message;
    }
}
