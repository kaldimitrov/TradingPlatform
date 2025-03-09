package com.crypto.trading.controller;

import com.crypto.trading.model.CryptoPrice;
import com.crypto.trading.model.Holding;
import com.crypto.trading.security.AccountDetails;
import com.crypto.trading.service.AccountService;
import com.crypto.trading.service.CryptoPriceService;
import com.crypto.trading.service.HoldingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/crypto")
public class CryptoController {
    private final CryptoPriceService cryptoPriceService;
    private final HoldingService holdingService;
    private final AccountService accountService;

    public CryptoController(CryptoPriceService cryptoPriceService, HoldingService holdingService, AccountService accountService) {
        this.cryptoPriceService = cryptoPriceService;
        this.holdingService = holdingService;
        this.accountService = accountService;
    }

    @GetMapping("/holdings")
    public List<Holding> getHoldings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetails account = (AccountDetails) authentication.getPrincipal();

        return holdingService.findByAccount(accountService.findByEmail(account.getUsername()));
    }

    @MessageMapping("/market-update")
    @SendTo("/topic/market-update")
    public List<CryptoPrice> sendCryptoPrices() {
        return cryptoPriceService.getAllCryptoPricesSortedByPrice();
    }
}
