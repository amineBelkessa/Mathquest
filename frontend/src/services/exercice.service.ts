// URL de base de votre API Spring Boot
const API_URL = "http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api";
// 🔹 Typage des modèles utilisés
export interface Question {
    _id?: string;
    formatQuestion: string;
    question: string;
    suggestions: string[];
    reponseCorrecte: string;
}

export interface Reponse {
    questionId: string;
    reponseUtilisateur: string;
    correcte?: boolean;
}

export interface Submission {
    exerciceId: string;
    username: string;
    reponses: Reponse[];
    score?: number;
    corrige?: boolean;
    dateSoumission?: string;
}

export interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
    niveau: string;
    description?: string;
    tempsEstime?: number;
    questions: Question[];
    pdfPath?: string;
}

// Fonction utilitaire pour récupérer le JWT
const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

// 🔹 Récupère tous les exercices (avec JWT)
export async function getExercices(): Promise<Exercice[]> {
    const response = await fetch(`${API_URL}/exercices`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error("Erreur lors de la récupération des exercices");
    return response.json();
}

// 🔹 Récupère un exercice par ID (avec JWT)
export async function getExerciceById(id: string): Promise<Exercice> {
    const response = await fetch(`${API_URL}/exercices/${id}`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error(`Erreur lors de la récupération de l'exercice avec l'ID ${id}`);
    return response.json();
}

// 🔹 Crée un nouvel exercice sans PDF (avec JWT)
export async function createExercice(exerciceData: Omit<Exercice, "id">): Promise<Exercice> {
    const response = await fetch(`${API_URL}/exercices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: JSON.stringify(exerciceData)
    });
    if (!response.ok) throw new Error("Erreur lors de la création de l'exercice");
    return response.json();
}

// 🔹 Crée un nouvel exercice avec PDF (avec JWT)
export async function createExerciceWithPdf(exerciceData: Omit<Exercice, "id">, pdfFile?: File | null): Promise<Exercice> {
    const formData = new FormData();
    if (pdfFile) formData.append("pdfFile", pdfFile);
    const blob = new Blob([JSON.stringify(exerciceData)], { type: "application/json" });
    formData.append("exerciceData", blob);

    const response = await fetch(`${API_URL}/exercices`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData
    });
    if (!response.ok) throw new Error("Erreur lors de la création de l'exercice avec PDF");
    return response.json();
}

// 🔹 Récupère tous les types d'exercices distincts (avec JWT)
export async function getAllTypes(): Promise<string[]> {
    const response = await fetch(`${API_URL}/exercices/types`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error("Erreur lors de la récupération des types d'exercices");
    return response.json();
}

// 🔹 Récupère les exercices d'un type spécifique (avec JWT)
export async function getExercicesByType(typeExercice: string): Promise<Exercice[]> {
    const response = await fetch(`${API_URL}/exercices/type/${typeExercice}`, { headers: getAuthHeaders() });
    if (!response.ok) throw new Error(`Erreur lors de la récupération des exercices du type ${typeExercice}`);
    return response.json();
}

// 🔹 Corrige un exercice soumis (avec JWT)
export interface ScoreResponse {
    score: number;
    bonnes: number;
    total: number;
}

export async function corrigerExercice(id: string, reponses: Reponse[]): Promise<ScoreResponse> {
    const response = await fetch(`${API_URL}/exercices/${id}/soumettre`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: JSON.stringify(reponses)
    });

    if (!response.ok) throw new Error("Erreur lors de la correction de l'exercice");
    return response.json();
}

// 🔹 Soumet un exercice (avec JWT)
export async function soumettreExercice(submissionData: Submission) {
    const response = await fetch(`${API_URL}/submissions/${submissionData.username}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders()
        },
        body: JSON.stringify(submissionData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
    }

    return response.json();
}
