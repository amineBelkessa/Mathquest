package com.mathquest.dto;

import java.util.List;

public class SubmissionResultDTO {
    private String exerciceTitre;
    private int score;
    private String niveau;  // ✅ Ajout du champ manquant
    private String dateSoumission;
    private List<Boolean> reponsesCorrectes;
    private List<String> reponsesUtilisateur;
    private List<String> reponsesCorrectesTextuelles;

    public SubmissionResultDTO() {}

    public SubmissionResultDTO(
            String exerciceTitre,
            int score,
            String niveau,
            String dateSoumission,
            List<Boolean> reponsesCorrectes,
            List<String> reponsesUtilisateur,
            List<String> reponsesCorrectesTextuelles
    ) {
        this.exerciceTitre = exerciceTitre;
        this.score = score;
        this.niveau = niveau;
        this.dateSoumission = dateSoumission;
        this.reponsesCorrectes = reponsesCorrectes;
        this.reponsesUtilisateur = reponsesUtilisateur;
        this.reponsesCorrectesTextuelles = reponsesCorrectesTextuelles;
    }

    public String getExerciceTitre() {
        return exerciceTitre;
    }

    public void setExerciceTitre(String exerciceTitre) {
        this.exerciceTitre = exerciceTitre;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public String getDateSoumission() {
        return dateSoumission;
    }

    public void setDateSoumission(String dateSoumission) {
        this.dateSoumission = dateSoumission;
    }

    public List<Boolean> getReponsesCorrectes() {
        return reponsesCorrectes;
    }

    public void setReponsesCorrectes(List<Boolean> reponsesCorrectes) {
        this.reponsesCorrectes = reponsesCorrectes;
    }

    public List<String> getReponsesUtilisateur() {
        return reponsesUtilisateur;
    }

    public void setReponsesUtilisateur(List<String> reponsesUtilisateur) {
        this.reponsesUtilisateur = reponsesUtilisateur;
    }

    public List<String> getReponsesCorrectesTextuelles() {
        return reponsesCorrectesTextuelles;
    }

    public void setReponsesCorrectesTextuelles(List<String> reponsesCorrectesTextuelles) {
        this.reponsesCorrectesTextuelles = reponsesCorrectesTextuelles;
    }
}
