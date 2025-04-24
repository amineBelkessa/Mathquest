package com.mathquest.controller;

import com.mathquest.model.Eleve;
import com.mathquest.repository.EleveRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/eleves")
public class EleveController {

    private final EleveRepository eleveRepository;

    public EleveController(EleveRepository eleveRepository) {
        this.eleveRepository = eleveRepository;
    }

    // ✅ Récupérer tous les élèves
    @GetMapping
    public ResponseEntity<List<Eleve>> getAllEleves() {
        List<Eleve> eleves = eleveRepository.findAll();
        return ResponseEntity.ok(eleves);
    }

    // ✅ Récupérer un élève par username (email dans ton cas)
    @GetMapping("/{username}")
    public ResponseEntity<?> getEleveByUsername(@PathVariable String username) {
        Optional<Eleve> eleve = eleveRepository.findByUsername(username);
        if (eleve.isPresent()) {
            return ResponseEntity.ok(eleve.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Aucun élève trouvé avec le username : " + username);
        }
    }

    // (Optionnel) Créer un élève (si besoin)
    @PostMapping
    public ResponseEntity<Eleve> createEleve(@RequestBody Eleve eleve) {
        Eleve saved = eleveRepository.save(eleve);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // (Optionnel) Supprimer un élève
    @DeleteMapping("/{username}")
    public ResponseEntity<?> deleteEleve(@PathVariable String username) {
        Optional<Eleve> eleve = eleveRepository.findByUsername(username);
        if (eleve.isPresent()) {
            eleveRepository.delete(eleve.get());
            return ResponseEntity.ok("Élève supprimé.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Élève non trouvé.");
        }
    }
}
