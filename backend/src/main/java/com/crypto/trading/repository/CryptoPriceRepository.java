package com.crypto.trading.repository;

import com.crypto.trading.model.CryptoPrice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CryptoPriceRepository extends JpaRepository<CryptoPrice, String> {
}
