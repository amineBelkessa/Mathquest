package com.mathquest.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "exercices")
public class Exercice {

    @Id
    private String id;

    private String titre;
    private String typeExercice;
    private String niveau;
    private String description;
    private Integer tempsEstime;
    private List<Question> questions; // Tableau de questions
    // Nouveau : champ pour stocker le chemin/URL du PDF
    private String pdfPath;
    // Nouveau : champ pour un lien externe (optionnel)
    private String lienDetaille;
    public Exercice() {}

    // (Constructeur si besoin)
    public Exercice(String titre, String typeExercice, String niveau,
                    String description, Integer tempsEstime, List<Question> questions) {
        this.titre = titre;
        this.typeExercice = typeExercice;
        this.niveau = niveau;
        this.description = description;
        this.tempsEstime = tempsEstime;
        this.questions = questions;
    }

    // Getters / Setters
    public String getId() { return id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }

    public String getTypeExercice() { return typeExercice; }
    public void setTypeExercice(String typeExercice) { this.typeExercice = typeExercice; }

    public String getNiveau() { return niveau; }
    public void setNiveau(String niveau) { this.niveau = niveau; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getTempsEstime() { return tempsEstime; }
    public void setTempsEstime(Integer tempsEstime) { this.tempsEstime = tempsEstime; }

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }
    public String getPdfPath() {
        return pdfPath;
    }
    public void setPdfPath(String pdfPath) {
        this.pdfPath = pdfPath;
    }

    public String getLienDetaille() {
        return lienDetaille;
    }
    public void setLienDetaille(String lienDetaille) {
        this.lienDetaille = lienDetaille;
    }
    // Classe interne "Question"
    public static class Question {
        private String formatQuestion;  // "QCM" / "champ_remplir" / autre
        private String question;        // L'énoncé
        private List<String> suggestions;
        private String reponseCorrecte;

        public Question() {}

        public Question(String formatQuestion, String question,
                        List<String> suggestions, String reponseCorrecte) {
            this.formatQuestion = formatQuestion;
            this.question = question;
            this.suggestions = suggestions;
            this.reponseCorrecte = reponseCorrecte;
        }

        public String getFormatQuestion() { return formatQuestion; }
        public void setFormatQuestion(String formatQuestion) { this.formatQuestion = formatQuestion; }

        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }

        public List<String> getSuggestions() { return suggestions; }
        public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }

        public String getReponseCorrecte() { return reponseCorrecte; }
        public void setReponseCorrecte(String reponseCorrecte) { this.reponseCorrecte = reponseCorrecte; }
    }
}
