// classement.service.ts
const API_URL = "http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api";

export interface Classement {
    username: string;
    totalScore: number;
    totalSubmissions: number;
}

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

export async function getClassement(): Promise<Classement[]> {
    try {
        const response = await fetch(`${API_URL}/classement`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération du classement:", error);
        throw new Error("Impossible de charger le classement");
    }
}

// Optionnel : Pour rafraîchir le classement périodiquement
export async function getLiveClassement(updateCallback: (data: Classement[]) => void) {
    const eventSource = new EventSource(`${API_URL}/classement/stream`);

    eventSource.onmessage = (event) => {
        const data: Classement[] = JSON.parse(event.data);
        updateCallback(data);
    };

    eventSource.onerror = (err) => {
        console.error("Erreur SSE:", err);
        eventSource.close();
    };
}