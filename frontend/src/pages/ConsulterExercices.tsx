import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExercices } from "../services/exercice.service";

interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
    niveau: string;
    description?: string;
}

const ConsulterExercices: React.FC = () => {
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Exercice[] = await getExercices();
                setExercices(data);
            } catch (err) {
                setError("❌ Impossible de charger la liste des exercices.");
            }
        };
        fetchData();
    }, []);

    const handleRealiserExercice = (id: string) => {
        navigate(`/realiser-exercice/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4">📚 Exercices disponibles</h1>
                <p className="text-gray-600 text-lg">
                    Choisis un exercice selon ton niveau et ton type préféré. Améliore-toi chaque jour !
                </p>
            </div>

            {error && (
                <div className="text-red-600 text-center font-semibold mb-4">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {exercices.map((ex) => (
                    <div
                        key={ex.id}
                        className="bg-white shadow-lg rounded-2xl p-6 text-left border border-gray-200 hover:shadow-2xl transition duration-300"
                    >
                        <h2 className="text-2xl font-bold text-indigo-700 mb-2">{ex.titre}</h2>
                        <p className="text-gray-600 text-sm mb-2">
                            <span className="font-medium text-gray-800">Type :</span> {ex.typeExercice}<br />
                            <span className="font-medium text-gray-800">Niveau :</span> {ex.niveau}
                        </p>
                        {ex.description && (
                            <p className="text-gray-500 mb-4 text-sm">{ex.description}</p>
                        )}
                        <button
                            onClick={() => handleRealiserExercice(ex.id)}
                            className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg transition"
                        >
                            Réaliser l'exercice
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsulterExercices;
