import axios from "axios";

// http://localhost:8080/api   local
// http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api  sur le serveur
const API_URL = "http://localhost:8080/api";

// 🔐 Enregistrement
export async function register(username: string, email: string, password: string, role: string): Promise<string> {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, role }),
    });

    if (!response.ok) {
        throw new Error("Erreur d'inscription");
    }

    return response.text();
}

// 🔐 Connexion
export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        console.log("📌 Réponse du backend lors de la connexion :", response.data);

        const { token, username, role, id } = response.data;

        if (token && username && role && id) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({ id, username, role })); // 👈 Ajout du champ `id`
        } else {
            throw new Error("Réponse du serveur invalide (données manquantes)");
        }

        return response.data;
    } catch (error) {
        throw new Error("Email ou mot de passe incorrect !");
    }
};

// 🔓 Déconnexion
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// 👤 Récupérer l'utilisateur connecté
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
