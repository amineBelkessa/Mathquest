// src/services/auth.service.js

const API_URL = "http://srv-dpi-proj-mathquest-test.univ-rouen.fr:8080"; // URL du backend

export async function register(username, email, password) {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        throw new Error("Erreur d'inscription");
    }

    return response.text(); // Retourne le token
}

