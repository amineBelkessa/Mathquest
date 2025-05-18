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

@RestController
@RequestMapping("/api/progres")
public class ProgressionController {

    private final SubmissionService submissionService;

    @Autowired
    public ProgressionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    /**
     * ✅ Récupérer l'historique des résultats d'un élève
     */
    @GetMapping("/{username}")
    public ResponseEntity<List<SubmissionResultDTO>> getProgres(@PathVariable String username) {
        System.out.println("🔹 Récupération de la progression pour l'élève : " + username);
        List<SubmissionResultDTO> results = submissionService.getSubmissionResultsForUser(username);
        if (results.isEmpty()) {
            System.out.println("❌ Aucun résultat trouvé pour l'élève : " + username);
            return ResponseEntity.notFound().build();
        }
        System.out.println("✅ Résultats récupérés pour l'élève : " + username);
        return ResponseEntity.ok(results);
    }

    /**
     * ✅ Récupérer les suggestions d'exercices pour un élève
     */
    @GetMapping("/suggestions/{username}")
    public ResponseEntity<List<Exercice>> getSuggestions(@PathVariable String username) {
        try {
            System.out.println("🔹 Récupération des suggestions pour l'élève : " + username);
            List<Exercice> suggestions = submissionService.getSuggestionsForUser(username);
            System.out.println("📊 Suggestions récupérées : " + suggestions.size());
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            System.out.println("❌ Erreur lors de la récupération des suggestions : " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * ✅ Récupérer la progression pour affichage graphique (ProgressionDTO)
     */
    @GetMapping("/results/eleveProgression")
    public ResponseEntity<?> getEleveProgression(@RequestParam String username) {
        System.out.println("🔍 Récupération des progrès pour : " + username);
        try {
            List<ProgressionDTO> progressionList = submissionService.getProgressionForEleve(username);
            if (progressionList.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Aucune donnée de progression trouvée pour cet élève.");
            }
            return ResponseEntity.ok(progressionList);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Erreur : " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la récupération des données de progression : " + e.getMessage());
        }
    }
}
