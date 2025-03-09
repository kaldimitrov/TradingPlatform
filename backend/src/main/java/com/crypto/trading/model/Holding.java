package com.crypto.trading.model;

import com.crypto.trading.exception.ErrorCode;
import com.crypto.trading.exception.TradingException;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
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

    public BigDecimal deductHolding(BigDecimal amount, BigDecimal price) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "Amount must be greater than zero.");
        }

        if (price.compareTo(BigDecimal.ZERO) < 0) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "Price must be greater than or equal to zero.");
        }

        if (quantity.compareTo(amount) < 0) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "Insufficient holdings to sell.");
        }

        BigDecimal costBasis = amount.multiply(avgPurchasePrice);
        BigDecimal revenue = amount.multiply(price);
        BigDecimal profit = revenue.subtract(costBasis);
        BigDecimal remainingQuantity = quantity.subtract(amount);

        if (remainingQuantity.compareTo(BigDecimal.ZERO) == 0) {
            quantity = BigDecimal.ZERO;
            avgPurchasePrice = BigDecimal.ZERO;
        } else {
            BigDecimal totalValueBefore = quantity.multiply(avgPurchasePrice);
            BigDecimal soldValue = amount.multiply(price);
            BigDecimal totalValueAfter = totalValueBefore.subtract(soldValue);

            quantity = remainingQuantity;
            avgPurchasePrice = totalValueAfter.divide(remainingQuantity, RoundingMode.HALF_UP);
        }

        return profit;
    }


    public void addHolding(BigDecimal amount, BigDecimal price) {
        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "Amount must be greater than zero.");
        }

        if (price.compareTo(BigDecimal.ZERO) < 0) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "Price must be greater than or equal to zero.");
        }

        BigDecimal totalValueBefore = quantity.multiply(avgPurchasePrice);
        BigDecimal newPurchaseValue = amount.multiply(price);
        BigDecimal newTotalQuantity = quantity.add(amount);
        BigDecimal newAvgPurchasePrice = totalValueBefore.add(newPurchaseValue).divide(newTotalQuantity, RoundingMode.HALF_UP);

        quantity = newTotalQuantity;
        avgPurchasePrice = newAvgPurchasePrice;
    }
}
