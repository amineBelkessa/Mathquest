import axios from "axios";

const API_URL = "http://localhost:8080/api";

export async function register(username: string, email: string, password: string, role: string): Promise<string> {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }), // Envoi du rôle au backend
    });

    if (!response.ok) {
        throw new Error("Erreur d'inscription");
    }

    return response.text(); // Retourne le token si l'inscription réussit
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });

        if (response.data.token && response.data.username && response.data.role) {
            localStorage.setItem("token", response.data.token); // ✅ Stocke uniquement le token
            localStorage.setItem("user", JSON.stringify({ username: response.data.username, role: response.data.role })); // ✅ Stocke user séparément
        } else {
            throw new Error("Réponse du serveur invalide");
        }

        return response.data;
    } catch (error) {
        throw new Error("Email ou mot de passe incorrect !");
    }
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const getUser = () => {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Erreur de parsing JSON:", error);
        return null;
    }
};