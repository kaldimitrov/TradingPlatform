package com.crypto.trading.controller;

import com.crypto.trading.controller.dto.ExchangeCryptoDto;
import com.crypto.trading.model.Account;
import com.crypto.trading.model.Transaction;
import com.crypto.trading.security.AccountDetails;
import com.crypto.trading.service.AccountService;
import com.crypto.trading.service.TransactionService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/transactions")
public class TransactionController {
    private final TransactionService transactionService;
    private final AccountService accountService;

    public TransactionController(TransactionService transactionService, AccountService accountService) {
        this.transactionService = transactionService;
        this.accountService = accountService;
    }

    @GetMapping
    public List<Transaction> getTransactions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetails account = (AccountDetails) authentication.getPrincipal();

        return transactionService.findByAccount(accountService.findByEmail(account.getUsername()));
    }

    @PostMapping("/buy")
    public Transaction buyCrypto(@RequestBody ExchangeCryptoDto data) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetails account = (AccountDetails) authentication.getPrincipal();

        return transactionService.buyCrypto(data, account.getUsername());
    }

    @PostMapping("/sell")
    public Transaction sellCrypto(@RequestBody ExchangeCryptoDto data) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetails account = (AccountDetails) authentication.getPrincipal();

        return transactionService.sellCrypto(data, account.getUsername());
    }
}

