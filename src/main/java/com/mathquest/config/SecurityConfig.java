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

                .csrf(csrf -> csrf.disable()) // Désactiver CSRF
                .cors(cors -> cors.disable()) // Désactiver CORS
                .authorizeHttpRequests(auth -> auth.anyRequest().permitAll()) // Autoriser toutes les requêtes
                .httpBasic(httpBasic -> httpBasic.disable()) // Désactiver l'authentification basique
                .formLogin(form -> form.disable());  // Désactive Form Login
        return http.build();
    }
}



