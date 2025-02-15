package com.desafio.controller;

import com.desafio.dto.AuthRequestDTO;
import com.desafio.dto.AuthResponseDTO;
import com.desafio.dto.RegisterRequestDTO;
import com.desafio.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody AuthRequestDTO request) {
      return authService.authenticate(request);
    }
    
    @PostMapping("/register")
    public AuthResponseDTO register(@RequestBody RegisterRequestDTO request) {
        return authService.register(request);
    }
}
