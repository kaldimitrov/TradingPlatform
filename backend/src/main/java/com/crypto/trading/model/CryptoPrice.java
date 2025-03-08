package com.crypto.trading.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;

@Entity(name = "crypto_prices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate
public class CryptoPrice {
    @Id
    @Column(name = "symbol", nullable = false, unique = true)
    private String symbol;

    @Column(name = "name", updatable = false, nullable = false)
    private String name;

    @Column(name = "price", nullable = false, precision = 20, scale = 8)
    private BigDecimal price;

    @Column(name = "change_pct", nullable = false, precision = 20, scale = 8)
    private BigDecimal changePct;

    @Column(name = "volume", nullable = false, precision = 20, scale = 8)
    private BigDecimal volume;
}
