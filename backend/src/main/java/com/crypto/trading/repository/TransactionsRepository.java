package com.crypto.trading.repository;

import com.crypto.trading.model.Account;
import com.crypto.trading.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionsRepository extends JpaRepository<Transaction, String> {
    List<Transaction> findByUser(Account account);
    void deleteByUser(Account account);
}
