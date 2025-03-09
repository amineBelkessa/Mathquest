// src/services/auth.service.ts

const API_URL = "http://localhost:8080/api"; // URL du backend en local

export async function register(username: string, email: string, password: string): Promise<string> {
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

export async function login(email: string, password: string): Promise<string> {
    const response = await fetch(API_URL + "/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.text(); // ✅ Use text(), NOT json()

    if (!response.ok) {
        throw new Error("Identifiants incorrects");
    }

    localStorage.setItem("user", data); // Stocker le token JWT
    return data;
}

export function logout(): void {
    localStorage.removeItem("user");
}
