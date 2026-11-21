

package com.example.sakhi.controller;

import com.example.sakhi.dto.LoginRequest;
import com.example.sakhi.dto.RegisterRequest;
import com.example.sakhi.model.User;
import com.example.sakhi.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        try {

            User user = authService.register(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request
    ) {

        try {

            User user = authService.login(request);

            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }
}