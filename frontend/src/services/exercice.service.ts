// URL de base de votre API Spring Boot
const API_URL = "http://localhost:8080/api";

// 🔹 Typage des modèles utilisés
export interface Question {
    _id?: string; // Facultatif car généré par MongoDB
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
    username: string; // Utilisateur qui soumet
    reponses: Reponse[];
    score?: number;
    corrige?: boolean;
    dateSoumission?: string;
}

export interface Exercice {
    id: string; // Ne doit PAS être optionnel, tous les exercices doivent en avoir un
    titre: string;
    typeExercice: string;
    niveau: string;
    description?: string;
    tempsEstime?: number;
    questions: Question[];
    pdfPath?: string;
}

// 🔹 Récupère tous les exercices
export async function getExercices(): Promise<Exercice[]> {
    const response = await fetch(`${API_URL}/exercices`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des exercices");
    return response.json();
}

// 🔹 Récupère un exercice par ID
export async function getExerciceById(id: string): Promise<Exercice> {
    const response = await fetch(`${API_URL}/exercices/${id}`);
    if (!response.ok) throw new Error(`Erreur lors de la récupération de l'exercice avec l'ID ${id}`);
    return response.json();
}

// 🔹 Crée un nouvel exercice sans PDF
export async function createExercice(exerciceData: Omit<Exercice, "id">): Promise<Exercice> {
    const response = await fetch(`${API_URL}/exercices`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(exerciceData)
    });
    if (!response.ok) throw new Error("Erreur lors de la création de l'exercice");
    return response.json();
}

// 🔹 Crée un nouvel exercice avec PDF
export async function createExerciceWithPdf(exerciceData: Omit<Exercice, "id">, pdfFile?: File | null): Promise<Exercice> {
    const formData = new FormData();

    if (pdfFile) formData.append("pdfFile", pdfFile);

    const blob = new Blob([JSON.stringify(exerciceData)], { type: "application/json" });
    formData.append("exerciceData", blob);

    const response = await fetch(`${API_URL}/exercices`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) throw new Error("Erreur lors de la création de l'exercice avec PDF");
    return response.json();
}

// 🔹 Récupère tous les types d'exercices distincts
export async function getAllTypes(): Promise<string[]> {
    const response = await fetch(`${API_URL}/exercices/types`);
    if (!response.ok) throw new Error("Erreur lors de la récupération des types d'exercices");
    return response.json();
}

// 🔹 Récupère les exercices d'un type spécifique
export async function getExercicesByType(typeExercice: string): Promise<Exercice[]> {
    const response = await fetch(`${API_URL}/exercices/type/${typeExercice}`);
    if (!response.ok) throw new Error(`Erreur lors de la récupération des exercices du type ${typeExercice}`);
    return response.json();
}

// 🔹 Corrige un exercice soumis
export interface ScoreResponse {
    score: number;
    bonnes: number;
    total: number;
}

export async function corrigerExercice(id: string, reponses: Reponse[]): Promise<ScoreResponse> {
    const response = await fetch(`${API_URL}/exercices/corriger/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reponses })
    });

    if (!response.ok) throw new Error("Erreur lors de la correction de l'exercice");
    return response.json();
}

// 🔹 Soumet un exercice (seuls les élèves peuvent soumettre)
export async function soumettreExercice(submissionData: Submission) {
    console.log("📤 Tentative de soumission :", submissionData);

    const response = await fetch(`${API_URL}/submissions/${submissionData.username}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}` // 🔹 Ajoute le token si nécessaire
        },
        body: JSON.stringify(submissionData),
    });

    console.log("🔹 Réponse serveur :", response);

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Erreur lors de la soumission (${response.status}) :`, errorText);
        throw new Error(errorText);
    }

    return await response.json();
}



