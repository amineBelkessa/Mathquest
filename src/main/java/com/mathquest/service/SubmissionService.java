package com.mathquest.service;

import com.mathquest.dto.ProgressionDTO;
import com.mathquest.dto.SubmissionResultDTO;
import com.mathquest.model.Eleve;
import com.mathquest.model.Exercice;
import com.mathquest.model.Submission;
import com.mathquest.repository.EleveRepository;
import com.mathquest.repository.ExerciceRepository;
import com.mathquest.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.*;

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

    public Submission saveSubmission(String username, Submission submission) {
        Optional<Eleve> eleveOpt = eleveRepository.findByUsername(username);
        if (eleveOpt.isEmpty()) throw new IllegalArgumentException("❌ Utilisateur introuvable en base !");

        Optional<Exercice> optExercice = exerciceRepository.findById(submission.getExerciceId());
        if (optExercice.isEmpty()) throw new IllegalArgumentException("❌ Exercice non trouvé !");

        Exercice exercice = optExercice.get();
        List<Exercice.Question> questions = exercice.getQuestions();

        int bonnesReponses = 0;
        for (int i = 0; i < questions.size(); i++) {
            if (i < submission.getReponses().size()) {
                String reponseSoumise = submission.getReponses().get(i).getReponseUtilisateur().trim();
                String bonneReponse = questions.get(i).getReponseCorrecte().trim();
                boolean isCorrect = bonneReponse.equalsIgnoreCase(reponseSoumise);
                submission.getReponses().get(i).setCorrecte(isCorrect);
                if (isCorrect) bonnesReponses++;
            }
        }

        int score = (int) (((double) bonnesReponses / questions.size()) * 100);
        submission.setScore(score);
        submission.setCorrige(true);

        return submissionRepository.save(submission);
    }

    public List<Submission> getSubmissionsByUsername(String username) {
        return submissionRepository.findByUsername(username);
    }

    public List<Submission> getSubmissionsBySalon(String codeSalon) {
        return submissionRepository.findByCodeSalon(codeSalon);
    }

    public List<SubmissionResultDTO> getSubmissionResultsForUser(String username) {
        List<Submission> submissions = submissionRepository.findByUsername(username);

        return submissions.stream().map(sub -> {
            SubmissionResultDTO dto = new SubmissionResultDTO();
            Optional<Exercice> optExo = exerciceRepository.findById(sub.getExerciceId());

            dto.setExerciceTitre(optExo.map(Exercice::getTitre).orElse("Exercice inconnu"));
            dto.setNiveau(optExo.map(Exercice::getNiveau).orElse("Niveau inconnu"));
            dto.setScore(sub.getScore());
            dto.setDateSoumission(sub.getDateSoumission());
            dto.setReponsesCorrectes(sub.getReponses().stream().map(r -> r.isCorrecte()).toList());
            dto.setReponsesUtilisateur(sub.getReponses().stream().map(r -> r.getReponseUtilisateur()).toList());

            List<String> reponsesCorrectesTextuelles = new ArrayList<>();
            if (optExo.isPresent()) {
                List<Exercice.Question> questions = optExo.get().getQuestions();
                for (int i = 0; i < sub.getReponses().size(); i++) {
                    reponsesCorrectesTextuelles.add(i < questions.size() ? questions.get(i).getReponseCorrecte() : "Inconnue");
                }
            }
            dto.setReponsesCorrectesTextuelles(reponsesCorrectesTextuelles);

            return dto;
        }).toList();
    }

    public List<Exercice> getSuggestionsForUser(String username) {
        List<Submission> submissions = submissionRepository.findByUsername(username);
        Map<String, List<Integer>> typeScoresMap = new HashMap<>();
        Set<String> seenExoIds = new HashSet<>();
        List<Exercice> suggestions = new ArrayList<>();

        System.out.println("📊 Suggestions - utilisateur : " + username);

        // 🔁 Regrouper les scores par type
        for (Submission submission : submissions) {
            Optional<Exercice> optExo = exerciceRepository.findById(submission.getExerciceId());
            if (optExo.isPresent()) {
                Exercice exo = optExo.get();
                String type = exo.getTypeExercice();
                if (type != null && !type.isBlank()) {
                    String normalizedType = type.trim().toLowerCase();
                    typeScoresMap.computeIfAbsent(normalizedType, k -> new ArrayList<>()).add(submission.getScore());
                }
            }
        }

        for (var entry : typeScoresMap.entrySet()) {
            double avg = entry.getValue().stream().mapToInt(i -> i).average().orElse(0);
            System.out.println("➡️ Type : " + entry.getKey() + " | Moyenne : " + avg);
        }

        // 🔽 Étape 1 : Suggestions sur types < 60
        for (Map.Entry<String, List<Integer>> entry : typeScoresMap.entrySet()) {
            String type = entry.getKey();
            double moyenne = entry.getValue().stream().mapToInt(i -> i).average().orElse(100);

            if (moyenne < 60) {
                List<Exercice> exercices = exerciceRepository.findByTypeExerciceRegex("(?i)^" + type + "$");
                exercices.stream()
                        .filter(e -> seenExoIds.add(e.getId()))
                        .limit(2)
                        .forEach(suggestions::add);
            }
        }

        // 🔽 Étape 2 : Si aucune suggestion, proposer les types les plus faibles
        if (suggestions.isEmpty()) {
            typeScoresMap.entrySet().stream()
                    .sorted(Comparator.comparingDouble(e -> e.getValue().stream().mapToInt(i -> i).average().orElse(100)))
                    .limit(2)
                    .forEach(entry -> {
                        List<Exercice> exercices = exerciceRepository.findByTypeExerciceRegex("(?i)^" + entry.getKey() + "$");
                        exercices.stream()
                                .filter(e -> seenExoIds.add(e.getId()))
                                .limit(2)
                                .forEach(suggestions::add);
                    });
        }

        System.out.println("✅ Suggestions retournées :");
        suggestions.forEach(s -> System.out.println(" - " + s.getTitre() + " (" + s.getTypeExercice() + ")"));

        return suggestions;
    }

    public List<ProgressionDTO> getProgressionForEleve(String identifier) {
        String username = identifier;
        Optional<Eleve> eleveById = eleveRepository.findById(identifier);
        if (eleveById.isPresent()) {
            username = eleveById.get().getUsername();
        }

        List<Submission> submissions = submissionRepository.findByUsername(username);
        submissions.sort((a, b) -> b.getDateSoumission().compareTo(a.getDateSoumission()));

        List<ProgressionDTO> progressionList = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        for (Submission sub : submissions) {
            Optional<Exercice> optExo = exerciceRepository.findById(sub.getExerciceId());

            progressionList.add(new ProgressionDTO(
                    sub.getDateSoumission().replace("T", " ").substring(0, 16),
                    sub.getScore(),
                    optExo.map(Exercice::getTitre).orElse("Titre inconnu"),
                    optExo.map(Exercice::getTypeExercice).orElse("Type inconnu"),
                    optExo.map(Exercice::getNiveau).orElse("Niveau inconnu")
            ));
        }

        return progressionList;
    }
}
