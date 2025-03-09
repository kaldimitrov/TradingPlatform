package com.crypto.trading.controller;

import com.crypto.trading.controller.dto.JwtResponse;
import com.crypto.trading.controller.dto.LoginRequest;
import com.crypto.trading.controller.dto.RegisterRequest;
import com.crypto.trading.service.AccountService;
import com.crypto.trading.utils.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AccountService accountService;
    private final JwtUtil jwtUtil;

    public AuthController(AuthenticationManager authenticationManager, AccountService accountService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.accountService = accountService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public JwtResponse registerUser(@RequestBody RegisterRequest data) {
        accountService.registerUser(data);
        return this.authenticateUser(new LoginRequest(data.getEmail(), data.getPassword()));
    }

    @PostMapping("/login")
    public JwtResponse authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateToken((UserDetails) authentication.getPrincipal());

        return new JwtResponse(jwt);
    }
}

