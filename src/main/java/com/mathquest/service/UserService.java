package com.mathquest.service;

import com.mathquest.model.User;
import com.mathquest.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Inscription
    public User registerUser(String username, String email, String rawPassword) throws Exception {
        if (userRepository.existsByEmail(email)) {
            throw new Exception("Email déjà utilisé !");
        }
        if (userRepository.existsByUsername(username)) {
            throw new Exception("Nom d'utilisateur déjà utilisé !");
        }
        String hashedPassword = passwordEncoder.encode(rawPassword);
        User user = new User(username, email, hashedPassword);
        return userRepository.save(user);
    }

    // Connexion
    public User loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) { // Vérifie le mot de passe hashé
                return user; // Authentification réussie
            }
        }
        return null; // Échec d'authentification
    }
}
