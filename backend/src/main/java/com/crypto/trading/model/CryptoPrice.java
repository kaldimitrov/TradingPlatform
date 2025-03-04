package com.crypto.trading.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity(name = "crypto_prices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CryptoPrice {
    @Id
    @Column(name = "symbol", nullable = false, unique = true)
    private String symbol;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "price", nullable = false, precision = 20, scale = 8)
    private BigDecimal price;
}
