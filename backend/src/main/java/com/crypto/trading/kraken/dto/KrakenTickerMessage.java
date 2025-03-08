package com.crypto.trading.kraken.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class KrakenTickerMessage {
    @JsonProperty("channel")
    private String channel;

    @JsonProperty("type")
    private String type;

    @JsonProperty("data")
    private List<TickerData> data;
}
