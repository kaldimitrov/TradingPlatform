package com.crypto.trading.controller;

import com.crypto.trading.model.CryptoPrice;
import com.crypto.trading.service.CryptoPriceService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class CryptoPriceController {
    private final CryptoPriceService cryptoPriceService;

    public CryptoPriceController(CryptoPriceService cryptoPriceService) {
        this.cryptoPriceService = cryptoPriceService;
    }

    @MessageMapping("/market-update")
    @SendTo("/topic/market-update")
    public List<CryptoPrice> sendCryptoPrices() {
        return cryptoPriceService.getAllCryptoPricesSortedByPrice();
    }
}
