package com.crypto.trading.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountResponse {
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private BigDecimal balance;
}
