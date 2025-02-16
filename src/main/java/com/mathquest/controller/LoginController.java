package com.mathquest.controller;

import com.mathquest.model.User;
import com.mathquest.service.UserService;
import com.mathquest.util.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    public LoginController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    // DTO pour recevoir les données du login
    static class LoginRequest {
        public String email;
        public String password;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        User user = userService.authenticateUser(request.email, request.password);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou mot de passe incorrect !");
        }

        String token = jwtUtils.generateToken(user.getEmail());
        return ResponseEntity.ok(token); // Retourne le token JWT
    }
}
