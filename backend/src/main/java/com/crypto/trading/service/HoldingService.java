package com.crypto.trading.service;

import com.crypto.trading.model.Account;
import com.crypto.trading.model.Holding;
import com.crypto.trading.repository.HoldingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HoldingService {
    private final HoldingRepository holdingRepository;

    public HoldingService(HoldingRepository holdingRepository) {
        this.holdingRepository = holdingRepository;
    }

    @Transactional
    public void deleteByAccount(Account account) {
        holdingRepository.deleteByUser(account);
    }

    public List<Holding> findByAccount(Account account) {
        return holdingRepository.findByUser(account);
    }
}
