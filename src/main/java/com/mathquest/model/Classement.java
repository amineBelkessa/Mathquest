package com.mathquest.model;

public class Classement {
    private String username;
    private double totalScore;
    private int totalSubmissions;

    public Classement(String username, double totalScore, int totalSubmissions) {
        this.username = username;
        this.totalScore = totalScore;
        this.totalSubmissions = totalSubmissions;
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
}
