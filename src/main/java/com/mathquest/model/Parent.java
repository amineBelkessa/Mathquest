package com.mathquest.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "parents")  // Spécifie la collection MongoDB
public class Parent extends User {

    private List<String> listeEnfants;  // Liste des IDs des enfants

    public Parent(String username, String email, String password) {
        super(username, email, password);
    }

    // Getters et Setters
    public List<String> getListeEnfants() {
        return listeEnfants;
    }

    public void setListeEnfants(List<String> listeEnfants) {
        this.listeEnfants = listeEnfants;
    }
}
