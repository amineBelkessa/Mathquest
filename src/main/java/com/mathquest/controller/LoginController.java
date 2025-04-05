package com.mathquest.controller;

import com.mathquest.model.Admin;
import com.mathquest.model.Eleve;
import com.mathquest.model.Parent;
import com.mathquest.model.User;
import com.mathquest.service.UserService;
import com.mathquest.util.JwtUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
        System.out.println("🔥TEST TEST TEST TEST TEST TEST\n\n\nTEST TEST TEST TEST TEST TEST");
        User user = userService.loginUser(request.email, request.password);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou MDP pas correct mon reuf");
        }

        String token = jwtUtils.generateToken(user.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("username", user.getUsername());
        response.put("role", user instanceof Eleve ? "eleve" : (user instanceof Parent ? "parent" : (user instanceof Admin ? "admin" : "inconnu")));
        response.put("version", "🔥 BACKEND V2");
        return ResponseEntity.ok(response);
    }
}
