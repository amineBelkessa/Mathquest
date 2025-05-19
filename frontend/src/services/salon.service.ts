import axios from "axios";

const API_URL = "http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/salons";

// 🔐 Header avec token
const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// 🔹 DTO de création
export interface SalonDTO {
    nom: string;
    professeurEmail: string;
    dateDebut: string;
    dateFin: string;
}

// ✅ Créer un salon
export const createSalon = async (salonData: SalonDTO) => {
    const response = await axios.post(API_URL, salonData, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// ✅ Rejoindre un salon par code
export const rejoindreSalon = async (code: string, username: string) => {
    const response = await axios.post(
        `${API_URL}/${code}/rejoindre?emailEleve=${username}`,
        {},
        { headers: getAuthHeaders() }
    );

    if (response.status !== 200) {
        throw new Error("Erreur lors de la tentative de rejoindre le salon.");
    }

    return response.data;
};

// ✅ Ajouter un exercice à un salon
export const ajouterExerciceAuSalon = async (codeSalon: string, exerciceId: string) => {
    const response = await axios.post(
        `${API_URL}/${codeSalon}/ajouter-exercice?exerciceId=${exerciceId}`,
        {},
        { headers: getAuthHeaders() }
    );

    if (response.status !== 200) {
        throw new Error("Erreur lors de l'ajout de l'exercice au salon.");
    }

    return response.data;
};

// ✅ Obtenir les salons créés par un parent/professeur
export const getSalonsByProf = async (email: string) => {
    const response = await axios.get(`${API_URL}/prof/${email}`, {
        headers: getAuthHeaders(),
    });
    return response.data;
};

// ✅ Récupérer les exercices d’un salon
export const getExercicesParSalon = async (codeSalon: string) => {
    const response = await axios.get(`${API_URL}/${codeSalon}/exercices`, {
        headers: getAuthHeaders(),
    });

    if (response.status !== 200) {
        throw new Error("Impossible de récupérer les exercices du salon.");
    }

    return response.data;
};

// ✅ ➕ Obtenir les salons déjà rejoints par un élève
export const getSalonsRejointsParEleve = async (emailEleve: string) => {
    const response = await axios.get(`${API_URL}/eleve/${emailEleve}`, {
        headers: getAuthHeaders(),
    });

    if (response.status !== 200) {
        throw new Error("Impossible de récupérer les salons de l’élève.");
    }

    return response.data;
};
