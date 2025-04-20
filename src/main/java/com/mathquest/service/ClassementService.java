package com.mathquest.service;

import com.mathquest.model.Classement;
import com.mathquest.model.Exercice;
import com.mathquest.model.Submission;
import com.mathquest.repository.ExerciceRepository;
import com.mathquest.repository.SubmissionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ClassementService {

    private static final Logger logger = LoggerFactory.getLogger(ClassementService.class);

    private final SubmissionRepository submissionRepository;
    private final ExerciceRepository exerciceRepository;

    public ClassementService(SubmissionRepository submissionRepository,
                             ExerciceRepository exerciceRepository) {
        this.submissionRepository = submissionRepository;
        this.exerciceRepository = exerciceRepository;
    }

    public List<Classement> getClassement() {
        // 1. Récupérer toutes les soumissions
        List<Submission> allSubmissions = submissionRepository.findAll();

        // 2. Filtrer les soumissions valides
        List<Submission> validSubmissions = allSubmissions.stream()
                .filter(s -> s.getUsername() != null && !s.getUsername().isEmpty())
                .filter(s -> s.getExerciceId() != null && !s.getExerciceId().isEmpty())
                // Suppression du filtre sur score si c'est un int primitif
                .collect(Collectors.toList());

        if (validSubmissions.isEmpty()) {
            logger.warn("Aucune soumission valide trouvée pour le classement");
            return Collections.emptyList();
        }

        // 3. Précharger les exercices
        Map<String, Exercice> exercicesMap = exerciceRepository.findAll()
                .stream()
                .filter(e -> e.getId() != null && e.getNiveau() != null)
                .collect(Collectors.toMap(Exercice::getId, e -> e));

        // 4. Calculer les scores
        Map<String, Double> userScores = new HashMap<>();
        Map<String, Integer> userSubmissionsCount = new HashMap<>();

        for (Submission sub : validSubmissions) {
            Exercice exercice = exercicesMap.get(sub.getExerciceId());
            if (exercice == null) {
                logger.debug("Exercice non trouvé pour submission: {}", sub.getId());
                continue;
            }

            double poids = getPoidsNiveau(exercice.getNiveau());
            double scorePondere = sub.getScore() * poids;

            // Méthode merge pour accumuler les scores
            userScores.merge(sub.getUsername(), scorePondere, Double::sum);
            userSubmissionsCount.merge(sub.getUsername(), 1, Integer::sum);
        }

        // 5. Construire le classement final
        List<Classement> classement = new ArrayList<>();
        for (Map.Entry<String, Double> entry : userScores.entrySet()) {
            classement.add(new Classement(
                    entry.getKey(),
                    entry.getValue(),
                    userSubmissionsCount.get(entry.getKey())
            ));
        }

        // Tri du classement par score décroissant
        classement.sort((a, b) -> Double.compare(b.getTotalScore(), a.getTotalScore()));

        logger.info("Classement généré avec {} participants", classement.size());
        return classement;
    }

    private double getPoidsNiveau(String niveau) {
        if (niveau == null) return 1.0;

        switch (niveau.toLowerCase()) {
            case "avancé":
                return 2.0;
            case "intermédiaire":
                return 1.5;
            default:
                return 1.0;
        }
    }
}