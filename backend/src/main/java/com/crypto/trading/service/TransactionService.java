package com.crypto.trading.service;

import com.crypto.trading.controller.dto.ExchangeCryptoDto;
import com.crypto.trading.enums.TransactionType;
import com.crypto.trading.exception.ErrorCode;
import com.crypto.trading.exception.TradingException;
import com.crypto.trading.model.Account;
import com.crypto.trading.model.CryptoPrice;
import com.crypto.trading.model.Holding;
import com.crypto.trading.model.Transaction;
import com.crypto.trading.repository.TransactionsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionsRepository transactionsRepository;
    private final AccountService accountService;
    private final CryptoPriceService cryptoPriceService;
    private final HoldingService holdingService;

    public TransactionService(TransactionsRepository transactionsRepository, AccountService accountService, CryptoPriceService cryptoPriceService, HoldingService holdingService) {
        this.transactionsRepository = transactionsRepository;
        this.accountService = accountService;
        this.cryptoPriceService = cryptoPriceService;
        this.holdingService = holdingService;
    }

    @Transactional
    public void deleteByAccount(Account account) {
        transactionsRepository.deleteByUser(account);
    }

    public List<Transaction> findByAccount(Account account) {
        return transactionsRepository.findByUserOrderByTimestampDesc(account);
    }

    public Transaction saveTransaction(Transaction transaction) {
        return transactionsRepository.save(transaction);
    }

    @Transactional
    public Transaction buyCrypto(ExchangeCryptoDto buyRequest, String email) {
        Account user = accountService.findByEmail(email);
        CryptoPrice crypto = cryptoPriceService.findBySymbolOrThrow(buyRequest.getCurrency());
        BigDecimal totalCost = buyRequest.getAmount().multiply(crypto.getPrice());
        if (user.getBalance().compareTo(totalCost) < 0) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "Insufficient balance to buy.");
        }
        user.setBalance(user.getBalance().subtract(totalCost));
        Optional<Holding> existingHolding = holdingService.findByUserAndCurrency(user, crypto);

        Holding holding;
        if (existingHolding.isPresent()) {
            holding = existingHolding.get();
            holding.addHolding(buyRequest.getAmount(), crypto.getPrice());
        } else {
            holding = Holding.builder()
                    .avgPurchasePrice(crypto.getPrice())
                    .currency(crypto)
                    .quantity(buyRequest.getAmount())
                    .user(user)
                    .build();
        }

        Transaction transaction = Transaction.builder()
                .amount(crypto.getPrice())
                .currency(crypto)
                .quantity(buyRequest.getAmount())
                .type(TransactionType.BUY)
                .user(user)
                .timestamp(LocalDateTime.now())
                .build();

        accountService.saveAccount(user);
        holdingService.saveHolding(holding);

        return saveTransaction(transaction);
    }

    @Transactional
    public Transaction sellCrypto(ExchangeCryptoDto sellRequest, String email) {
        Account user = accountService.findByEmail(email);
        CryptoPrice crypto = cryptoPriceService.findBySymbolOrThrow(sellRequest.getCurrency());
        Optional<Holding> existingHolding = holdingService.findByUserAndCurrency(user, crypto);

        if (existingHolding.isEmpty()) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "No holdings found to sell.");
        }
        BigDecimal profit = existingHolding.get().deductHolding(sellRequest.getAmount(), crypto.getPrice());
        BigDecimal totalCost = sellRequest.getAmount().multiply(crypto.getPrice());
        user.setBalance(user.getBalance().add(totalCost));

        Transaction transaction = Transaction.builder()
                .amount(crypto.getPrice())
                .currency(crypto)
                .quantity(sellRequest.getAmount())
                .type(TransactionType.SELL)
                .user(user)
                .timestamp(LocalDateTime.now())
                .profit(profit)
                .build();

        holdingService.saveHolding(existingHolding.get());
        accountService.saveAccount(user);

        return saveTransaction(transaction);
    }
}
