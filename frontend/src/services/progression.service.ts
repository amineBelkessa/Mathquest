import axios from "axios";


const API_URL = "http://localhost:8080/api/progres";


// 🔹 Fonction pour récupérer la progression d'un élève
export async function getProgressionData(username: string): Promise<any> {
    try {
        console.log("Appel API avec username: ", username);
        const response = await axios.get(`${API_URL}/results/eleveProgression`, {
            params: { username }
        });

        console.log("Réponse API pour la progression: ", response.data);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Erreur lors de la récupération des données de progression");
        }
    } catch (error) {
        console.error("Erreur dans le service de progression:", error);
        throw new Error("Impossible de charger la progression des exercices.");
    }
}

// 🔹 Fonction pour récupérer des suggestions d'exercices pour un élève
export async function getSuggestionsForUser(username: string) {
    try {
        console.log("Appel de l'API pour récupérer les suggestions...");
        const response = await axios.get(`${API_URL}/suggestions/${username}`);
        console.log("Réponse des suggestions:", response.data);

        const suggestions = response.data;
        let filteredSuggestions: any[] = [];

        // Regrouper les suggestions par type d'exercice
        const typeMap: { [key: string]: any[] } = {};

        suggestions.forEach((suggestion: any) => {
            if (!typeMap[suggestion.typeExercice]) {
                typeMap[suggestion.typeExercice] = [];
            }
            typeMap[suggestion.typeExercice].push(suggestion);
        });

        // Ne garder que 2 suggestions maximum par type
        Object.keys(typeMap).forEach((type) => {
            const exercises = typeMap[type];
            filteredSuggestions.push(...exercises.slice(0, 2));
        });

        return filteredSuggestions;
    } catch (error) {
        console.error("Erreur dans le service de suggestions:", error);
        throw error;
    }
}
