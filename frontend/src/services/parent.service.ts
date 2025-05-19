import axios from "axios";

const API_URL = "http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/parent";

// 🔹 Récupérer la liste des enfants d’un parent
export const getEnfants = async (parentId: string) => {
    try {
        console.log("Appel API pour récupérer les enfants du parent ID :", parentId);
        const response = await axios.get(`${API_URL}/${parentId}/enfants`);
        console.log("Réponse reçue des enfants : ", response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des enfants:", error);
        throw new Error("Erreur lors de la récupération des enfants");
    }
};

// 🔹 Ajouter un enfant à un parent
export const addEnfant = async (parentId: string, enfantId: string) => {
    try {
        const response = await axios.post(`${API_URL}/add-enfant`, {
            parentId,
            enfantId,
        });
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de l'ajout de l'enfant.");
    }
};

// 🔹 Supprimer un enfant d’un parent
export const removeEnfant = async (parentId: string, enfantId: string) => {
    try {
        const response = await axios.delete(`${API_URL}/remove-enfant`, {
            params: { parentId, enfantId },
        });
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la suppression de l'enfant.");
    }
};

// 🔹 Récupérer la progression d’un enfant
export const getChildrenProgressionData = async (enfantId: string) => {
    try {
        console.log("Appel API pour récupérer la progression de l'enfant avec ID :", enfantId);

        const response = await axios.get(`${API_URL}/results/eleveProgression`, {
            params: { username: enfantId }
        });

        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de la progression de l'enfant:", error);
        throw new Error("Erreur lors de la récupération de la progression");
    }
};
