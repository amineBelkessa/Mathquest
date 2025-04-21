package com.mathquest.service;

import com.mathquest.model.Exercice;
import com.mathquest.model.Submission;
import com.mathquest.model.Eleve;
import com.mathquest.repository.ExerciceRepository;
import com.mathquest.repository.SubmissionRepository;
import com.mathquest.repository.EleveRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final ExerciceRepository exerciceRepository;
    private final EleveRepository eleveRepository;

    public SubmissionService(SubmissionRepository submissionRepository, ExerciceRepository exerciceRepository, EleveRepository eleveRepository) {
        this.submissionRepository = submissionRepository;
        this.exerciceRepository = exerciceRepository;
        this.eleveRepository = eleveRepository;
    }

    /**
     * Enregistre une soumission et vérifie si l'utilisateur est un élève.
     */
    public Submission saveSubmission(String username, Submission submission) {
        System.out.println("🔍 Vérification de l'utilisateur: " + username);
        Optional<Eleve> eleveOpt = eleveRepository.findByUsername(username);

        if (eleveOpt.isEmpty()) {
            System.out.println("❌ Utilisateur NON trouvé en base !");
            throw new IllegalArgumentException("❌ Utilisateur introuvable en base !");
        }

        Eleve eleve = eleveOpt.get();
        System.out.println("✅ Utilisateur trouvé: " + eleve.getUsername());

        // 🔹 Vérifier que l'exercice existe
        Optional<Exercice> optExercice = exerciceRepository.findById(submission.getExerciceId());
        if (optExercice.isEmpty()) {
            throw new IllegalArgumentException("❌ Exercice non trouvé !");
        }

        Exercice exercice = optExercice.get();
        List<Exercice.Question> questions = exercice.getQuestions();

        int totalQuestions = questions.size();
        int bonnesReponses = 0;

        for (int i = 0; i < totalQuestions; i++) {
            Exercice.Question question = questions.get(i);
            if (i < submission.getReponses().size()) {
                String reponseSoumise = submission.getReponses().get(i).getReponseUtilisateur().trim();
                if (question.getReponseCorrecte().trim().equalsIgnoreCase(reponseSoumise)) {
                    bonnesReponses++;
                    submission.getReponses().get(i).setCorrecte(true);
                } else {
                    submission.getReponses().get(i).setCorrecte(false);
                }
            }
        }

        int score = (int) (((double) bonnesReponses / totalQuestions) * 100);
        submission.setScore(score);
        submission.setCorrige(true);

        return submissionRepository.save(submission);
    }

    /**
     * 🔹 Récupérer toutes les soumissions d'un utilisateur spécifique.
     */
    public List<Submission> getSubmissionsByUsername(String username) {
        return submissionRepository.findByUsername(username);
    }

    /**
     * ✅ Étape 3 — Récupérer toutes les soumissions associées à un salon
     */
    public List<Submission> getSubmissionsBySalon(String codeSalon) {
        return submissionRepository.findByCodeSalon(codeSalon);
    }
}
