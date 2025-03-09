package com.crypto.trading.repository;

import com.crypto.trading.model.Account;
import com.crypto.trading.model.Holding;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface HoldingRepository extends JpaRepository<Holding, UUID> {
    List<Holding> findByUser(Account account);
    void deleteByUser(Account account);
}
