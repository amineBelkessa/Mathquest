package com.mathquest.controller;

import com.mathquest.model.Submission;
import com.mathquest.service.SubmissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.mathquest.dto.SubmissionResultDTO;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    /**
     * Enregistrer une soumission d'exercice (seuls les élèves peuvent soumettre).
     */
    @PostMapping("/{username}")
    public ResponseEntity<Submission> submitExercice(@PathVariable String username, @RequestBody Submission submission) {
        System.out.println("🔹 Tentative de soumission par : " + username);
        Submission savedSubmission = submissionService.saveSubmission(username, submission);
        return new ResponseEntity<>(savedSubmission, HttpStatus.CREATED);
    }

    /**
     * Récupérer les soumissions d'un utilisateur spécifique.
     */
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Submission>> getUserSubmissions(@PathVariable String username) {
        List<Submission> submissions = submissionService.getSubmissionsByUsername(username);
        return ResponseEntity.ok(submissions);
    }

    /**
     * Récupérer toutes les soumissions liées à un salon.
     */
    @GetMapping("/salon/{codeSalon}")
    public ResponseEntity<?> getSubmissionsBySalon(@PathVariable String codeSalon) {
        try {
            List<Submission> submissions = submissionService.getSubmissionsBySalon(codeSalon);
            return ResponseEntity.ok(submissions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la récupération des soumissions du salon : " + e.getMessage());
        }
    }

    /**
     * Afficher l’historique des résultats d’un utilisateur
     */
    @GetMapping("/results/{username}")
    public ResponseEntity<List<SubmissionResultDTO>> getResults(@PathVariable String username) {
        List<SubmissionResultDTO> results = submissionService.getSubmissionResultsForUser(username);
        return ResponseEntity.ok(results);
    }
}
