package com.mathquest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF protection
                .cors(cors -> cors.disable()) // Disable CORS (handled by Nginx)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/**").permitAll() // Allow all requests
                );

        return http.build();
    }
}
