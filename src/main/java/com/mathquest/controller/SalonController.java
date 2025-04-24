package com.mathquest.controller;

import com.mathquest.model.Exercice;
import com.mathquest.model.Salon;
import com.mathquest.service.SalonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/salons")
public class SalonController {

    private final SalonService salonService;

    public SalonController(SalonService salonService) {
        this.salonService = salonService;
    }

    // 🔹 Créer un salon
    @PostMapping
    public ResponseEntity<?> creerSalon(@RequestBody Salon salon) {
        try {
            Salon nouveauSalon = salonService.creerSalon(salon);
            return ResponseEntity.status(HttpStatus.CREATED).body(nouveauSalon);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la création du salon : " + e.getMessage());
        }
    }

    // 🔹 Rejoindre un salon (par l’élève)
    @PostMapping("/{code}/rejoindre")
    public ResponseEntity<?> rejoindreSalon(@PathVariable String code, @RequestParam String emailEleve) {
        try {
            Salon salon = salonService.ajouterEleveAuSalon(code, emailEleve);
            return ResponseEntity.ok(salon);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // 🔹 Récupérer un salon par son code
    @GetMapping("/{code}")
    public ResponseEntity<?> getSalonParCode(@PathVariable String code) {
        Optional<Salon> salonOpt = salonService.getSalonByCode(code);
        return salonOpt
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Salon introuvable pour le code : " + code));
    }

    // ✅ Ajouter un exercice à un salon
    @PostMapping("/{code}/ajouter-exercice")
    public ResponseEntity<?> ajouterExerciceAuSalon(
            @PathVariable String code,
            @RequestParam String exerciceId
    ) {
        try {
            Salon salon = salonService.ajouterExerciceAuSalon(code, exerciceId);
            return ResponseEntity.ok(salon);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Erreur : " + e.getMessage());
        }
    }

    // ✅ Obtenir tous les salons créés par un professeur
    @GetMapping("/prof/{email}")
    public ResponseEntity<?> getSalonsByProf(@PathVariable String email) {
        try {
            List<Salon> salons = salonService.getSalonsByProfesseur(email);
            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la récupération des salons : " + e.getMessage());
        }
    }

    // ✅ Obtenir les exercices d’un salon actif
    @GetMapping("/{code}/exercices-disponibles")
    public ResponseEntity<?> getExercicesDisponibles(@PathVariable String code) {
        Optional<Salon> salonOpt = salonService.getSalonByCode(code);
        if (salonOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Salon introuvable");
        }

        Salon salon = salonOpt.get();
        try {
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime debut = LocalDateTime.parse(salon.getDateDebut());
            LocalDateTime fin = LocalDateTime.parse(salon.getDateFin());

            if (now.isBefore(debut)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("⏳ Le salon n'est pas encore ouvert.");
            }

            if (now.isAfter(fin)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("❌ Le salon est expiré.");
            }

            List<Exercice> exercices = salonService.getExercicesPourSalon(code);
            return ResponseEntity.ok(exercices);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur de traitement : " + e.getMessage());
        }
    }

    // ✅ Obtenir les salons rejoints par un élève
    @GetMapping("/eleve/{email}")
    public ResponseEntity<?> getSalonsRejoints(@PathVariable String email) {
        try {
            List<Salon> salons = salonService.getSalonsRejointsParEleve(email);
            return ResponseEntity.ok(salons);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la récupération des salons rejoints : " + e.getMessage());
        }
    }
}
