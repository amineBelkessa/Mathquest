import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Interface pour représenter un élève
interface Eleve {
    id: string;
    username: string;
    email: string;
}

const ListeEleves: React.FC = () => {
    const [eleves, setEleves] = useState<Eleve[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEleves = async () => {
            try {
                const response = await axios.get("http://srv-dpi-proj-mathquest-prod.univ-rouen.fr/api/enseignant/eleves");
                setEleves(response.data);
            } catch (err) {
                console.error("❌ Erreur lors du chargement des élèves :", err);
                setError("Impossible de charger les élèves.");
            } finally {
                setLoading(false);
            }
        };

        fetchEleves();
    }, []);

    const handleClick = (username: string) => {
        navigate(`/enseignant/eleves/${username}`);
    };

    return (
        <div className="max-w-6xl mx-auto mt-12 mb-24 px-6">
            <h2 className="text-4xl font-bold text-indigo-700 mb-10 text-center">
                📚 Liste des élèves
            </h2>

            {loading ? (
                <p className="text-center text-gray-600">Chargement en cours...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : eleves.length === 0 ? (
                <p className="text-center text-gray-500">Aucun élève trouvé.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {eleves.map((eleve) => (
                        <div
                            key={eleve.id}
                            onClick={() => handleClick(eleve.username)}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-indigo-100 text-indigo-700 rounded-full p-3 text-xl font-bold">
                                    {eleve.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">
                                        {eleve.username}
                                    </p>
                                    <p className="text-sm text-gray-500">{eleve.email}</p>
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <span className="text-sm text-indigo-600 hover:underline">
                                    📊 Voir les résultats →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListeEleves;
