package com.mathquest.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "parents")  // Spécifie la collection MongoDB
public class Parent extends User {
    public Parent(String username, String email, String password) {
        super(username, email, password);
    }
}
