package com.mathquest.model;

public class Classement {
    private String username;
    private double totalScore;
    private int totalSubmissions;
    private String niveau;

    public Classement(String username, double totalScore, int totalSubmissions, String niveau) {
        this.username = username;
        this.totalScore = totalScore;
        this.totalSubmissions = totalSubmissions;
        this.niveau = niveau;
    }

    public String getUsername() {
        return username;
    }

    public double getTotalScore() {
        return totalScore;
    }

    public int getTotalSubmissions() {
        return totalSubmissions;
    }

    public String getNiveau() {
        return niveau;
    }
}
