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

const niveaux = [
    "CP", "CE1", "CE2", "CM1", "CM2",
    "6e", "5e", "4e", "3e",
    "2nde", "1re", "Terminale",
];

const ConsulterExercices: React.FC = () => {
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [filtered, setFiltered] = useState<Exercice[]>([]);
    const [selectedNiveau, setSelectedNiveau] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data: Exercice[] = await getExercices();
                setExercices(data);
                setFiltered(data); // Affiche tout au départ
            } catch (err) {
                setError("❌ Impossible de charger la liste des exercices.");
            }
        };
        fetchData();
    }, []);

    const handleFiltrer = (niveau: string) => {
        setSelectedNiveau(niveau);
        const result = exercices.filter((ex) => ex.niveau === niveau);
        setFiltered(result);
    };

    const handleResetFiltre = () => {
        setSelectedNiveau(null);
        setFiltered(exercices);
    };

    const handleRealiserExercice = (id: string) => {
        navigate(`/realiser-exercice/${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">📚 Exercices disponibles</h1>
                <p className="text-gray-600 text-lg">
                    Choisis un exercice selon ton niveau et ton type préféré. Améliore-toi chaque jour !
                </p>
            </div>

            {/* Filtres par niveau */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                <button
                    onClick={handleResetFiltre}
                    className={`px-4 py-2 rounded-full border font-semibold ${
                        selectedNiveau === null
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                >
                    Tous les niveaux
                </button>
                {niveaux.map((niveau) => (
                    <button
                        key={niveau}
                        onClick={() => handleFiltrer(niveau)}
                        className={`px-4 py-2 rounded-full border font-semibold ${
                            selectedNiveau === niveau
                                ? "bg-indigo-600 text-white"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {niveau}
                    </button>
                ))}
            </div>

            {error && (
                <div className="text-red-600 text-center font-semibold mb-4">{error}</div>
            )}

            {/* Liste filtrée */}
            {filtered.length === 0 ? (
                <p className="text-center text-gray-500">Aucun exercice trouvé pour ce niveau.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {filtered.map((ex) => (
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
            )}
        </div>
    );
};

export default ConsulterExercices;
