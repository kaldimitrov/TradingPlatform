package com.crypto.trading.service;

import com.crypto.trading.model.Account;
import com.crypto.trading.model.Transaction;
import com.crypto.trading.repository.TransactionsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionsRepository transactionsRepository;

    public TransactionService(TransactionsRepository transactionsRepository) {
        this.transactionsRepository = transactionsRepository;
    }

    @Transactional
    public void deleteByAccount(Account account) {
        transactionsRepository.deleteByUser(account);
    }

    public List<Transaction> findByAccount(Account account) {
        return transactionsRepository.findByUser(account);
    }
}
