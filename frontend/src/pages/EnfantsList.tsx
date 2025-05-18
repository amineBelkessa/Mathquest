import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnfants } from "../services/parent.service"; // Service pour récupérer les enfants

const EnfantsList: React.FC = () => {
    const navigate = useNavigate();
    const [enfants, setEnfants] = useState<any[]>([]); // Stocker les enfants récupérés
    const [error, setError] = useState<string>("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const parentId = user?.id || "";

    // Récupérer la liste des enfants
    useEffect(() => {
        const fetchEnfants = async () => {
            try {
                if (parentId) {
                    const data = await getEnfants(parentId); // Appel du service pour récupérer les enfants
                    setEnfants(data); // Mettre à jour l'état des enfants
                }
            } catch (err) {
                setError("Impossible de récupérer les enfants.");
            }
        };

        fetchEnfants();
    }, [parentId]);

    return (
        <div>
            <h2 className="text-3xl font-bold text-center mb-6">📊 Liste des Enfants</h2>
            {error && <p>{error}</p>}
            <table className="min-w-full table-auto border-collapse mb-8">
                <thead>
                <tr>
                    <th className="px-4 py-2 border-b">Nom de l'Enfant</th>
                    <th className="px-4 py-2 border-b">Voir la Progression</th>
                </tr>
                </thead>
                <tbody>
                {enfants.map((enfant, index) => (
                    <tr key={index}>
                        <td className="px-4 py-2 border-b">{enfant.username}</td>
                        <td className="px-4 py-2 border-b">
                            <button
                                onClick={() => navigate(`/parent/progression/${enfant.id}`)} // Rediriger vers la progression de l'enfant
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                            >
                                Voir la progression
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EnfantsList;
