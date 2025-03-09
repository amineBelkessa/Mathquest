const API_URL = "http://localhost:8080/api"; // URL du backend

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

export async function login(email: string, password: string): Promise<string> {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.text(); // ✅ Utilisation de text() au lieu de json()

    if (!response.ok) {
        throw new Error("Identifiants incorrects");
    }

    localStorage.setItem("user", data); // Stocker le token JWT
    return data;
}

export function logout(): void {
    localStorage.removeItem("user");
}
