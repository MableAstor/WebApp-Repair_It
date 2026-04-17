package com.example.webapprepair_it.service;

import com.example.webapprepair_it.dto.LoginRequestDto;
import com.example.webapprepair_it.dto.LoginResponseDto;
import com.example.webapprepair_it.entity.User;
import com.example.webapprepair_it.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponseDto login(LoginRequestDto dto) {
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("ไม่พบบัญชีผู้ใช้นี้"));

        if (!user.getPassword().equals(dto.getPassword())) {
            throw new RuntimeException("รหัสผ่านไม่ถูกต้อง");
        }

        return new LoginResponseDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                "เข้าสู่ระบบสำเร็จ"
        );
    }
}