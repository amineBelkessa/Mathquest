package com.mathquest.service;

import com.mathquest.model.Eleve;
import com.mathquest.model.Parent;
import com.mathquest.model.User;
import com.mathquest.repository.EleveRepository;
import com.mathquest.repository.ParentRepository;
import com.mathquest.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final EleveRepository eleveRepository;
    private final ParentRepository parentRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(EleveRepository eleveRepository, ParentRepository parentRepository) {
        this.eleveRepository = eleveRepository;
        this.parentRepository = parentRepository;
    }

    // 🔹 Inscription
    public void registerUser(String username, String email, String rawPassword, String role) throws Exception {
        System.out.println("🔹 Tentative d'inscription : " + username + " | Email: " + email + " | Rôle: " + role);

        // Correction : Vérification correcte des rôles
        if (!role.equalsIgnoreCase("eleve") && !role.equalsIgnoreCase("parent")) {
            throw new Exception("❌ Rôle invalide !");
        }

        // Vérifier si l'email existe déjà
        if (eleveRepository.findByEmail(email).isPresent() || parentRepository.findByEmail(email).isPresent()) {
            throw new Exception("❌ Cet email est déjà utilisé !");
        }

        String hashedPassword = passwordEncoder.encode(rawPassword);

        if (role.equalsIgnoreCase("eleve")) {
            Eleve eleve = new Eleve(username, email, hashedPassword);
            eleveRepository.save(eleve);
            System.out.println("✅ Élève enregistré avec succès !");
        } else {
            Parent parent = new Parent(username, email, hashedPassword);
            parentRepository.save(parent);
            System.out.println("✅ Parent enregistré avec succès !");
        }
    }

    // 🔹 Connexion
    public User loginUser(String email, String password) {
        System.out.println("🔹 Tentative de connexion pour : " + email);

        Optional<Eleve> eleveOptional = eleveRepository.findByEmail(email);
        if (eleveOptional.isPresent()) {
            Eleve eleve = eleveOptional.get();
            if (passwordEncoder.matches(password, eleve.getPassword())) {
                System.out.println("✅ Connexion réussie en tant qu'élève !");
                return eleve;
            }
        }

        Optional<Parent> parentOptional = parentRepository.findByEmail(email);
        if (parentOptional.isPresent()) {
            Parent parent = parentOptional.get();
            if (passwordEncoder.matches(password, parent.getPassword())) {
                System.out.println("✅ Connexion réussie en tant que parent !");
                return parent;
            }
        }

        System.out.println("❌ Échec de connexion : email ou mot de passe incorrect !");
        return null; // Échec d'authentification
    }
}
