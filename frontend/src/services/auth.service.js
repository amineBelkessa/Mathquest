// src/services/auth.service.js

const API_URL = "http://localhost:8080/api/auth"; // URL du backend

export const register = async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
        throw new Error("Erreur lors de l’inscription");
    }
    const token = await response.text();
    return token; // on récupère le token
};

export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
        throw new Error("Erreur lors de la connexion");
    }
    const token = await response.text();
    return token;
};
