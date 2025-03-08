package com.crypto.trading.kraken.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class TickerParams {
    private String channel;
    private List<String> symbol;
}