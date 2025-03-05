package com.mathquest.controller;

import com.mathquest.model.User;
import com.mathquest.service.UserService;
import com.mathquest.util.JwtUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class RegisterController {

    private final UserService userService;
    private final JwtUtils jwtUtils;

    public RegisterController(UserService userService, JwtUtils jwtUtils) {
        this.userService = userService;
        this.jwtUtils = jwtUtils;
    }

    // DTO simples pour body JSON
    static class RegisterRequest {
        public String username;
        public String email;
        public String password;
        public String role;
    }


    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) throws Exception {
        userService.registerUser(request.username, request.email, request.password, request.role);
        return "reussi"; // ou un objet JSON
    }

}
