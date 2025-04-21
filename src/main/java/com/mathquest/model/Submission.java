package com.mathquest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "submissions")
public class Submission {
    @Id
    private String id;
    private String exerciceId;  // 🔹 Lien vers l'exercice concerné
    private String username;    // 🔹 Identifie l'utilisateur qui a soumis l'exercice
    private List<Reponse> reponses; // 🔹 Liste des réponses fournies
    private int score;  // 🔹 Score de l'exercice
    private boolean corrige;  // 🔹 Est-ce que l'exercice a été corrigé ?
    private String dateSoumission; // 🔹 Date et heure de la soumission

    // ✅ Ajout du champ manquant
    private String codeSalon;

    public Submission() {}

    public Submission(String exerciceId, String username, List<Reponse> reponses, int score, boolean corrige, String dateSoumission, String codeSalon) {
        this.exerciceId = exerciceId;
        this.username = username;
        this.reponses = reponses;
        this.score = score;
        this.corrige = corrige;
        this.dateSoumission = dateSoumission;
        this.codeSalon = codeSalon;
    }

    // === ✅ GETTERS & SETTERS ===
    public String getId() { return id; }

    public String getExerciceId() { return exerciceId; }
    public void setExerciceId(String exerciceId) { this.exerciceId = exerciceId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public List<Reponse> getReponses() { return reponses; }
    public void setReponses(List<Reponse> reponses) { this.reponses = reponses; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public boolean isCorrige() { return corrige; }
    public void setCorrige(boolean corrige) { this.corrige = corrige; }

    public String getDateSoumission() { return dateSoumission; }
    public void setDateSoumission(String dateSoumission) { this.dateSoumission = dateSoumission; }

    public String getCodeSalon() { return codeSalon; }
    public void setCodeSalon(String codeSalon) { this.codeSalon = codeSalon; }

    // === ✅ Classe interne pour stocker les réponses ===
    public static class Reponse {
        private String questionId;
        private String reponseUtilisateur;
        private boolean correcte;

        public Reponse() {}

        public Reponse(String questionId, String reponseUtilisateur, boolean correcte) {
            this.questionId = questionId;
            this.reponseUtilisateur = reponseUtilisateur;
            this.correcte = correcte;
        }

        public String getQuestionId() { return questionId; }
        public void setQuestionId(String questionId) { this.questionId = questionId; }

        public String getReponseUtilisateur() { return reponseUtilisateur; }
        public void setReponseUtilisateur(String reponseUtilisateur) { this.reponseUtilisateur = reponseUtilisateur; }

        public boolean isCorrecte() { return correcte; }
        public void setCorrecte(boolean correcte) { this.correcte = correcte; }
    }
}
