package com.mathquest.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "administrateurs")  // ✅ Collection MongoDB pour les admins
public class Admin extends User {
    public Admin(String username, String email, String password) {
        super(username, email, password);
    }
}
