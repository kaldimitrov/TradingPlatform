package com.crypto.trading.controller;

import com.crypto.trading.controller.dto.AccountResponse;
import com.crypto.trading.model.Account;
import com.crypto.trading.security.AccountDetails;
import com.crypto.trading.service.AccountService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
    private final AccountService accountService;

    public UserController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping
    public AccountResponse getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetails account = (AccountDetails) authentication.getPrincipal();

        Account accountEntity = accountService.findByEmail(account.getUsername());
        return AccountResponse.builder()
                .id(accountEntity.getId())
                .email(accountEntity.getEmail())
                .firstName(accountEntity.getFirstName())
                .lastName(accountEntity.getLastName())
                .balance(accountEntity.getBalance())
                .build();
    }

    @DeleteMapping("/reset")
    public void resetUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AccountDetails account = (AccountDetails) authentication.getPrincipal();

        accountService.resetUser(account.getUsername());
    }
}

