package com.mathquest.service;

import com.mathquest.model.*;
import com.mathquest.repository.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final EleveRepository eleveRepository;
    private final ParentRepository parentRepository;
    private final AdminRepository adminRepository;
    private final EnseignantRepository enseignantRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserService(EleveRepository eleveRepository, ParentRepository parentRepository, AdminRepository adminRepository, EnseignantRepository enseignantRepository) {
        this.eleveRepository = eleveRepository;
        this.parentRepository = parentRepository;
        this.adminRepository = adminRepository;
        this.enseignantRepository = enseignantRepository;
    }

    // 🔹 Inscription
    public void registerUser(String username, String email, String rawPassword, String role) throws Exception {
        System.out.println("🔹 Tentative d'inscription : " + username + " | Email: " + email + " | Rôle: " + role);

        // Correction : Vérification correcte des rôles
        if (!role.equalsIgnoreCase("eleve") && !role.equalsIgnoreCase("parent") && !role.equalsIgnoreCase("admin") && !role.equalsIgnoreCase("enseignant")) {
            throw new Exception("❌ Rôle invalide !");
        }

        // Vérifier si l'email existe déjà
        if (eleveRepository.findByEmail(email).isPresent() || parentRepository.findByEmail(email).isPresent() || adminRepository.findByEmail(email).isPresent() || enseignantRepository.findByEmail(email).isPresent()) {
            throw new Exception("❌ Cet email est déjà utilisé !");
        }

        String hashedPassword = passwordEncoder.encode(rawPassword);

        if (role.equalsIgnoreCase("eleve")) {
            Eleve eleve = new Eleve(username, email, hashedPassword);
            eleveRepository.save(eleve);
            System.out.println("✅ Élève enregistré avec succès !");
        } else if (role.equalsIgnoreCase("parent")) {
            Parent parent = new Parent(username, email, hashedPassword);
            parentRepository.save(parent);
            System.out.println("✅ Parent enregistré avec succès !");
        } else if (role.equalsIgnoreCase("admin")) {
            Admin admin = new Admin(username, email, hashedPassword);
            adminRepository.save(admin);
            System.out.println("✅ Admin enregistré avec succès !");
        } else {
            Enseignant enseignant = new Enseignant(username, email, hashedPassword);
            enseignantRepository.save(enseignant);
            System.out.println("✅ Enseignant enregistré avec succès !");

        }
    }

    // 🔹 Connexion
    public User loginUser(String email, String password) {
        System.out.println("Nouveau log et, tentative de co reussie : " + email);

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

        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (passwordEncoder.matches(password, admin.getPassword())) {
                System.out.println("✅ Connexion réussie en tant qu'admin !");
                return admin;
            }
        }

        Optional<Enseignant> enseignantOptional = enseignantRepository.findByEmail(email);
        if (enseignantOptional.isPresent()) {
            Enseignant enseignant = enseignantOptional.get();
            if (passwordEncoder.matches(password, enseignant.getPassword())) {
                System.out.println("✅ Connexion réussie en tant qu'enseignant !");
                return enseignant;
            }
        }

        System.out.println("❌ Échec de connexion : email ou mot de passe incorrect !");
        return null; // Échec d'authentification
    }
}
