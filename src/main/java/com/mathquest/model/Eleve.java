package com.mathquest.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "eleves")  // Spécifie la collection MongoDB
public class Eleve extends User {
    public Eleve(String username, String email, String password) {
        super(username, email, password);
    }
}
