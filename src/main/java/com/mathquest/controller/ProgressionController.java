package com.mathquest.controller;

import com.mathquest.dto.ProgressionDTO;
import com.mathquest.dto.SubmissionResultDTO;
import com.mathquest.model.Exercice;
import com.mathquest.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "http://srv-dpi-proj-mathquest-test.univ-rouen.fr",
                "http://srv-dpi-proj-mathquest-prod.univ-rouen.fr"
        },
        allowCredentials = "true"
)
@RestController
@RequestMapping("/api/progres")
public class ProgressionController {

    private final SubmissionService submissionService;

    @Autowired
    public ProgressionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    // 🔄 Historique complet des soumissions d'un élève
    @GetMapping("/{username}")
    public ResponseEntity<List<SubmissionResultDTO>> getProgres(@PathVariable String username) {
        System.out.println("🔹 getProgres() appelé avec : " + username);
        List<SubmissionResultDTO> results = submissionService.getSubmissionResultsForUser(username);
        return ResponseEntity.ok(results); // ✅ Toujours retourner une liste (même vide)
    }

    // 🎯 Suggestions d'exercices pour un élève
    @GetMapping("/suggestions/{username}")
    public ResponseEntity<List<Exercice>> getSuggestions(@PathVariable String username) {
        try {
            System.out.println("🔍 Suggestions demandées pour : " + username);
            List<Exercice> suggestions = submissionService.getSuggestionsForUser(username);
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            System.err.println("❌ Erreur lors des suggestions : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // 📈 Progression détaillée pour affichage graphique
    @GetMapping("/results/eleveProgression")
    public ResponseEntity<List<ProgressionDTO>> getEleveProgression(@RequestParam String username) {
        System.out.println("📊 getEleveProgression() pour : " + username);
        try {
            List<ProgressionDTO> progressionList = submissionService.getProgressionForEleve(username);
            return ResponseEntity.ok(progressionList); // ✅ Même si vide, retourner 200 avec []
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
