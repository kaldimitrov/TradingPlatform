package com.crypto.trading.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity(name = "holdings")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Holding {
    @Id
    @GeneratedValue
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Account user;

    @ManyToOne
    @JoinColumn(name = "currency", nullable = false)
    private CryptoPrice currency;

    @Column(name = "quantity", nullable = false, precision = 20, scale = 8)
    private BigDecimal quantity;

    @Column(name = "avg_purchase_price", nullable = false, precision = 20, scale = 8)
    private BigDecimal avgPurchasePrice;
}
