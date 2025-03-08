package com.crypto.trading.kraken.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TickerData {

    @JsonProperty("symbol")
    private String symbol;

    @JsonProperty("bid")
    private double bid;

    @JsonProperty("bid_qty")
    private double bidQty;

    @JsonProperty("ask")
    private double ask;

    @JsonProperty("ask_qty")
    private double askQty;

    @JsonProperty("last")
    private double last;

    @JsonProperty("volume")
    private double volume;

    @JsonProperty("vwap")
    private double vwap;

    @JsonProperty("low")
    private double low;

    @JsonProperty("high")
    private double high;

    @JsonProperty("change")
    private double change;

    @JsonProperty("change_pct")
    private double changePct;
}
