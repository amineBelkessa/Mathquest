package com.mathquest.controller;

import com.mathquest.model.Submission;
import com.mathquest.service.SubmissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    /**
     * 🔹 Enregistrer une soumission d'exercice (seuls les élèves peuvent soumettre).
     */
    @PostMapping("/{username}")
    public ResponseEntity<Submission> submitExercice(@PathVariable String username, @RequestBody Submission submission) {
        System.out.println("🔹 Tentative de soumission par : " + username);
        Submission savedSubmission = submissionService.saveSubmission(username, submission);
        return new ResponseEntity<>(savedSubmission, HttpStatus.CREATED);
    }


    /**
     * 🔹 Récupérer les soumissions d'un utilisateur spécifique.
     */
    @GetMapping("/user/{username}")
    public ResponseEntity<List<Submission>> getUserSubmissions(@PathVariable String username) {
        List<Submission> submissions = submissionService.getSubmissionsByUsername(username);
        return ResponseEntity.ok(submissions);
    }
}
