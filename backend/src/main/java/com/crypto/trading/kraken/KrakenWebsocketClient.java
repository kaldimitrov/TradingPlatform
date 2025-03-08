package com.crypto.trading.kraken;

import com.crypto.trading.kraken.dto.KrakenTickerMessage;
import com.crypto.trading.kraken.dto.TickerParams;
import com.crypto.trading.kraken.dto.SubscribeMessage;
import com.crypto.trading.model.CryptoPrice;
import com.crypto.trading.service.CryptoPriceService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.WebSocket;
import java.util.List;
import java.util.concurrent.CompletionStage;

import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@Service
public class KrakenWebsocketClient {
    private static final String KRAKEN_WS_URI = "wss://ws.kraken.com/v2";
    private final List<String> pairs = List.of(
            "BTC/USD", "ETH/USD", "USDT/USD", "XRP/USD", "BNB/USD",
            "SOL/USD", "USDC/USD", "ADA/USD", "DOGE/USD", "TRX/USD",
            "UNI/USD", "WBTC/USD", "LINK/USD", "ETC/USD", "LEO/USD",
            "AVAX/USD", "XLM/USD", "DOT/USD", "LTC/USD", "BCH/USD"
    );
    private WebSocket webSocket;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final CryptoPriceService cryptoPriceService;

    public KrakenWebsocketClient(CryptoPriceService cryptoPriceService) {
        this.cryptoPriceService = cryptoPriceService;
    }

    @PostConstruct
    public void initialize() {
        HttpClient client = HttpClient.newHttpClient();
        webSocket = client.newWebSocketBuilder()
                .buildAsync(URI.create(KRAKEN_WS_URI), new WebSocketListener())
                .join();
        subscribeToTicker();
    }

    @PreDestroy
    public void destroy() {
        if (webSocket != null) {
            webSocket.sendClose(WebSocket.NORMAL_CLOSURE, "Application shutting down")
                    .thenRun(() -> log.info("WebSocket closed"));
        }
    }

    private void subscribeToTicker() {
        try {
            SubscribeMessage subscribeMessage = SubscribeMessage.builder()
                    .method("subscribe")
                    .params(TickerParams.builder()
                            .channel("ticker")
                            .symbol(pairs)
                            .build())
                    .build();

            String jsonString = objectMapper.writeValueAsString(subscribeMessage);
            webSocket.sendText(jsonString, true);
        } catch (Exception e) {
            log.error("Error subscribing to ticker", e);
        }
    }

    private class WebSocketListener implements WebSocket.Listener {
        @Override
        public void onOpen(WebSocket webSocket) {
            log.info("WebSocket opened");
            WebSocket.Listener.super.onOpen(webSocket);
        }

        @Override
        public CompletionStage<?> onText(WebSocket webSocket, CharSequence data, boolean last) {
            try {
                KrakenTickerMessage message = objectMapper.readValue(data.toString(), KrakenTickerMessage.class);
                if (message.getChannel() == null || !message.getChannel().equals("ticker")) {
                    return WebSocket.Listener.super.onText(webSocket, data, last);
                }
                log.info("Received message: {}", message);
                List<CryptoPrice> cryptoPrices = message.getData().stream()
                        .map(ticker -> CryptoPrice.builder()
                                .symbol(ticker.getSymbol().split("/")[0])
                                .price(BigDecimal.valueOf(ticker.getLast()))
                                .changePct(BigDecimal.valueOf(ticker.getChangePct()))
                                .volume(BigDecimal.valueOf(ticker.getVolume()))
                                .build())
                        .toList();
                cryptoPriceService.saveCryptoPrices(cryptoPrices);
                cryptoPriceService.sendUpdate(cryptoPrices);
            } catch (IOException e) {
                log.error("Error parsing message", e);
            }

            return WebSocket.Listener.super.onText(webSocket, data, last);
        }

        @Override
        public void onError(WebSocket webSocket, Throwable error) {
            log.error("WebSocket error", error);
            WebSocket.Listener.super.onError(webSocket, error);
        }
    }
}
