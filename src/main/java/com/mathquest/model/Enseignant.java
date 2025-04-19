package com.mathquest.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "enseignants")
public class Enseignant extends User {
    public Enseignant(String username, String email, String password) {
        super(username, email, password);
    }
}
