// src/services/auth.service.js

const API_URL = "http://localhost:8080/api"; // URL du backend

export async function register(username, email, password) {
    const response = await fetch("http://localhost:8080/api/register", {
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

