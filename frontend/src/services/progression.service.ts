import axios from "axios";

const API_URL = "http://srv-dpi-proj-mathquest-prod.univ-rouen.fr/api/progres";

// 🔹 Récupérer la progression d’un élève
export async function getProgressionData(username: string): Promise<any> {
    try {
        const response = await axios.get(`${API_URL}/results/eleveProgression`, {
            params: { username },
        });
        if (response.status === 200) return response.data;
        else throw new Error("Erreur lors de la récupération de la progression.");
    } catch (error) {
        console.error("Erreur progression:", error);
        throw new Error("Impossible de charger la progression.");
    }
}

// 🔹 Récupérer des suggestions d’exercices (à partir des soumissions de l’élève)
export async function getSuggestionsForUser(username: string) {
    try {
        const response = await axios.get(`${API_URL}/suggestions/${username}`);
        const suggestions = response.data;

        // 💡 Affichage seulement informatif (filtrage unique par exercice)
        const uniqueSuggestionsMap = new Map();

        suggestions.forEach((ex: any) => {
            if (!uniqueSuggestionsMap.has(ex.id)) {
                uniqueSuggestionsMap.set(ex.id, {
                    id: ex.id,
                    titre: ex.titre,
                    niveau: ex.niveau,
                    typeExercice: ex.typeExercice,
                });
            }
        });

        return Array.from(uniqueSuggestionsMap.values());
    } catch (error) {
        console.error("Erreur suggestions:", error);
        return [];
    }
}
