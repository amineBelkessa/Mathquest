package com.mathquest.service;

import com.mathquest.model.Exercice;
import com.mathquest.model.Submission;
import com.mathquest.model.Eleve;
import com.mathquest.dto.SubmissionResultDTO;
import com.mathquest.repository.ExerciceRepository;
import com.mathquest.repository.SubmissionRepository;
import com.mathquest.repository.EleveRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

        Optional<Exercice> optExercice = exerciceRepository.findById(submission.getExerciceId());
        if (optExercice.isEmpty()) {
            throw new IllegalArgumentException("❌ Exercice non trouvé !");
        }

        Exercice exercice = optExercice.get();
        List<Exercice.Question> questions = exercice.getQuestions();

        int totalQuestions = questions.size();
        int bonnesReponses = 0;

        for (int i = 0; i < totalQuestions; i++) {
            if (i < submission.getReponses().size()) {
                String reponseSoumise = submission.getReponses().get(i).getReponseUtilisateur().trim();
                String bonneReponse = questions.get(i).getReponseCorrecte().trim();
                boolean isCorrect = bonneReponse.equalsIgnoreCase(reponseSoumise);
                submission.getReponses().get(i).setCorrecte(isCorrect);
                if (isCorrect) bonnesReponses++;
            }
        }

        int score = (int) (((double) bonnesReponses / totalQuestions) * 100);
        submission.setScore(score);
        submission.setCorrige(true);

        return submissionRepository.save(submission);
    }

    /**
     * Récupérer toutes les soumissions d'un utilisateur spécifique.
     */
    public List<Submission> getSubmissionsByUsername(String username) {
        return submissionRepository.findByUsername(username);
    }

    /**
     * Préparer les données à afficher dans l’historique de résultats de l’élève.
     */
    public List<SubmissionResultDTO> getSubmissionResultsForUser(String username) {
        List<Submission> submissions = submissionRepository.findByUsername(username);

        return submissions.stream().map(sub -> {
            SubmissionResultDTO dto = new SubmissionResultDTO();
            Optional<Exercice> optExo = exerciceRepository.findById(sub.getExerciceId());

            dto.setExerciceTitre(optExo.map(Exercice::getTitre).orElse("Exercice inconnu"));
            dto.setNiveau(optExo.map(Exercice::getNiveau).orElse("Niveau inconnu")); // ✅ Ajout du niveau
            dto.setScore(sub.getScore());
            dto.setDateSoumission(sub.getDateSoumission().toString());
            dto.setReponsesCorrectes(sub.getReponses().stream()
                    .map(r -> r.isCorrecte())
                    .toList());
            dto.setReponsesUtilisateur(sub.getReponses().stream()
                    .map(r -> r.getReponseUtilisateur())
                    .toList());

            // 🧠 Bonne gestion des réponses correctes textuelles
            List<String> reponsesCorrectesTextuelles = new ArrayList<>();
            if (optExo.isPresent()) {
                List<Exercice.Question> questions = optExo.get().getQuestions();
                for (int i = 0; i < sub.getReponses().size(); i++) {
                    if (i < questions.size()) {
                        reponsesCorrectesTextuelles.add(questions.get(i).getReponseCorrecte());
                    } else {
                        reponsesCorrectesTextuelles.add("Inconnue");
                    }
                }
            }
            dto.setReponsesCorrectesTextuelles(reponsesCorrectesTextuelles);

            return dto;
        }).toList();
    }

}
