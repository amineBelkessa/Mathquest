// src/services/auth.service.js

const API_URL = "http://srv-dpi-proj-mathquest-test.univ-rouen.fr:8080/api";
 // URL du backend

export async function register(username, email, password) {
    const response = await fetch(API_URL + "/register", {
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

export async function login(email, password) {
    const response = await fetch(API_URL + "/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Identifiants incorrects");
    }

    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data)); // Stocker le token en local
    return data;
}

export function logout() {
    localStorage.removeItem("user");
}
