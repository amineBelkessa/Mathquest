package com.mathquest.dto;

public class ProgressionDTO {
    private String date;
    private int score;
    private String exerciceTitre;
    private String typeExercice;
    private String niveau;

    // Constructor
    public ProgressionDTO(String date, int score, String exerciceTitre, String typeExercice, String niveau) {
        this.date = date;
        this.score = score;
        this.exerciceTitre = exerciceTitre;
        this.typeExercice = typeExercice;
        this.niveau = niveau;
    }

    // Getters and Setters
    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getExerciceTitre() {
        return exerciceTitre;
    }

    public void setExerciceTitre(String exerciceTitre) {
        this.exerciceTitre = exerciceTitre;
    }

    public String getTypeExercice() {
        return typeExercice;
    }

    public void setTypeExercice(String typeExercice) {
        this.typeExercice = typeExercice;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }
}
