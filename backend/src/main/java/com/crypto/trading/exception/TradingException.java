package com.crypto.trading.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TradingException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;
}