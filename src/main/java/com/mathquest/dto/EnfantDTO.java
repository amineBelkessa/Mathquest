package com.mathquest.dto;

public class EnfantDTO {
    private String id;
    private String username;

    public EnfantDTO(String id, String username) {
        this.id = id;
        this.username = username;
    }

    // Getters et Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
