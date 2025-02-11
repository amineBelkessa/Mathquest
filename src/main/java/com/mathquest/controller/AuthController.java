package com.mathquest.controller;

import com.mathquest.model.User;
import com.mathquest.service.UserService;
import com.mathquest.util.JwtUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin // si besoin
public class AuthController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    public AuthController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    // DTO simples pour body JSON
    static class RegisterRequest {
        public String username;
        public String email;
        public String password;
    }
    static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) throws Exception {
        User user = userService.registerUser(request.username, request.email, request.password);
        // Générer un token
        String token = jwtUtils.generateToken(user.getEmail());
        return token; // ou un objet JSON
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) throws Exception {
        User user = userService.loginUser(request.email, request.password);
        String token = jwtUtils.generateToken(user.getEmail());
        return token;
    }
}
