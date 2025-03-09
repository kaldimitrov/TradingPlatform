package com.crypto.trading.service;

import com.crypto.trading.exception.ErrorCode;
import com.crypto.trading.exception.TradingException;
import com.crypto.trading.model.CryptoPrice;
import com.crypto.trading.repository.CryptoPriceRepository;
import org.springframework.data.domain.Sort;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CryptoPriceService {
    private final CryptoPriceRepository cryptoPriceRepository;
    private final SimpMessagingTemplate messagingTemplate;


    public CryptoPriceService(CryptoPriceRepository cryptoPriceRepository, SimpMessagingTemplate messagingTemplate) {
        this.cryptoPriceRepository = cryptoPriceRepository;
        this.messagingTemplate = messagingTemplate;
    }

    public CryptoPrice findBySymbolOrThrow(String symbol) {
        return cryptoPriceRepository.findById(symbol).orElseThrow(
                () -> new TradingException(ErrorCode.RESOURCE_NOT_FOUND, "Currency not found")
        );
    }

    public List<CryptoPrice> getAllCryptoPricesSortedByPrice() {
        return cryptoPriceRepository.findAll(Sort.by(Sort.Direction.DESC, "price"));
    }

    public List<CryptoPrice> saveCryptoPrices(List<CryptoPrice> cryptoPrices) {
        return cryptoPriceRepository.saveAll(cryptoPrices);
    }

    public void sendUpdate(List<CryptoPrice> cryptoPrices) {
        messagingTemplate.convertAndSend("/topic/market-currency-update", cryptoPrices);
    }
}
