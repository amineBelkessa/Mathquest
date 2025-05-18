
import './ParentProgression.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnfants } from "../services/parent.service"; // Récupérer la liste des enfants du parent

const ParentDashboard = () => {
    const navigate = useNavigate();
    const [enfants, setEnfants] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const parentId = user.id || "ID non disponible";

    useEffect(() => {
        const fetchEnfants = async () => {
            try {
                const data = await getEnfants(parentId);
                setEnfants(data);
            } catch (err) {
                setError("Erreur lors de la récupération des enfants");
            }
        };
        fetchEnfants();
    }, [parentId]);

    return (

            <div className="flex flex-col items-center justify-center w-full max-w-5xl bg-white shadow-lg rounded-xl">
                {/* Titre et Message */}
                <div className="w-full text-center mb-6">
                    <h2 className="text-3xl font-bold text-indigo-700 mb-4">Suivez la progression de vos enfants</h2>
                    <p className="text-gray-600 text-lg mb-6">Découvrez les performances et les commentaires des enseignants pour mieux accompagner vos enfants dans leur apprentissage.</p>
                </div>

                {/* Liste des enfants */}
                <div className="w-full text-center mb-10">
                    {error && <p className="text-red-500">{error}</p>}
                    <table className="min-w-full text-gray-800 mt-6">
                        <thead className="bg-indigo-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left">Nom de l'enfant</th>
                            <th className="px-6 py-4 text-left">Voir la progression</th>
                            <th className="px-6 py-4 text-left">Recommandation</th>
                            <th className="px-6 py-4 text-left">Commentaires Enseignants </th>
                        </tr>
                        </thead>
                        <tbody>
                        {enfants.map((enfant, index) => (
                            <tr key={index} className="border-b hover:bg-indigo-50">
                                <td className="px-6 py-4">{enfant.username}</td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => navigate(`/eleve/progression/${enfant.id}`)} // Redirection vers la page de progression de l'élève
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        Voir la progression
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => navigate(`/parent/enfant/${enfant.id}/commentaires`)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300"
                                    >
                                        Recommandation
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => navigate(`/parent/enfant/${enfant.id}/messages`)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Voir les remarques
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

    );
};

export default ParentDashboard;
