package com.example.webapprepair_it.controller;

import com.example.webapprepair_it.dto.LoginRequestDto;
import com.example.webapprepair_it.dto.LoginResponseDto;
import com.example.webapprepair_it.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto dto) {
        return authService.login(dto);
    }
}