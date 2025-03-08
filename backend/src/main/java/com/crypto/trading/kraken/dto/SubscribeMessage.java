package com.crypto.trading.kraken.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SubscribeMessage {
    private String method;
    private TickerParams params;
}