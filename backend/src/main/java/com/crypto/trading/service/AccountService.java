package com.crypto.trading.service;

import com.crypto.trading.controller.dto.RegisterRequest;
import com.crypto.trading.exception.ErrorCode;
import com.crypto.trading.exception.TradingException;
import com.crypto.trading.model.Account;
import com.crypto.trading.repository.AccountRepository;
import com.crypto.trading.security.AccountDetails;
import jakarta.transaction.Transactional;
import lombok.SneakyThrows;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class AccountService implements UserDetailsService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final HoldingService holdingService;

    public AccountService(AccountRepository accountRepository, PasswordEncoder passwordEncoder, HoldingService holdingService) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
        this.holdingService = holdingService;
    }

    public Account saveAccount(Account account) {
        return accountRepository.save(account);
    }

    public Account registerUser(RegisterRequest data) {
        if (accountRepository.findByEmail(data.getEmail()).isPresent()) {
            throw new TradingException(ErrorCode.INVALID_INPUT, "Email already in use");
        }
        Account account = Account.builder()
                .email(data.getEmail())
                .firstName(data.getFirstName())
                .lastName(data.getLastName())
                .balance(BigDecimal.valueOf(10_000))
                .hashedPassword(passwordEncoder.encode(data.getPassword()))
                .build();

        return accountRepository.save(account);
    }

    public Account findByEmail(String email) {
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new TradingException(ErrorCode.INVALID_INPUT, "User not found with email: " + email));
    }

    @Transactional
    public void resetUser(String email) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new TradingException(ErrorCode.INVALID_INPUT, "User not found with email: " + email));
        account.setBalance(BigDecimal.valueOf(10_000));
        accountRepository.save(account);
        holdingService.deleteByAccount(account);
    }

    @Override
    @SneakyThrows
    public UserDetails loadUserByUsername(String email) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new AccountDetails(account);
    }
}
