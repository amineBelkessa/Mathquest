import React, { useEffect, useState } from "react";
import { Classement, getClassement } from "../services/classement.service";
import { Link } from "react-router-dom";

// 🔹 Import des images de badges
import ferBadge from "../assets/badges/fer.png";
import bronzeBadge from "../assets/badges/bronze.png";
import argentBadge from "../assets/badges/argent.png";
import orBadge from "../assets/badges/or.png";
import questmasterBadge from "../assets/badges/questmaster.png";

const niveaux = [
    "CP", "CE1", "CE2", "CM1", "CM2",
    "6e", "5e", "4e", "3e",
    "2nde", "1re", "Terminale",
];

const getBadgeForClassement = (score: number): string | null => {
    if (score >= 5000) return questmasterBadge;
    if (score >= 2000) return orBadge;
    if (score >= 1000) return argentBadge;
    if (score >= 500) return bronzeBadge;
    return ferBadge;
};

const Leaderboard = () => {
    const [classement, setClassement] = useState<Classement[]>([]);
    const [filteredClassement, setFilteredClassement] = useState<Classement[]>([]);
    const [selectedNiveau, setSelectedNiveau] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadClassement = async () => {
            try {
                const data = await getClassement();
                setClassement(data);
                setFilteredClassement(data); // Affiche tous au départ
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur inconnue");
            } finally {
                setLoading(false);
            }
        };
        loadClassement();
    }, []);

    const handleFiltrer = (niveau: string) => {
        setSelectedNiveau(niveau);
        const filtered = classement.filter(user => user.niveau === niveau);
        setFilteredClassement(filtered);
    };

    const handleResetFiltre = () => {
        setSelectedNiveau(null);
        setFilteredClassement(classement);
    };

    if (loading) return <div className="text-center py-4">Chargement du classement...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto text-center mb-8">
                <h2 className="text-4xl font-extrabold text-blue-700 mb-2">
                    🏆 Classement des Champions de MathQuest 🏆
                </h2>
                <p className="text-gray-600 text-lg">
                    Consulte le classement des meilleurs élèves par niveau.
                </p>
            </div>

            {/* Filtres par niveau (identiques à consulter-exercices) */}
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

            {filteredClassement.length === 0 ? (
                <p className="text-center text-gray-500">
                    Aucun participant trouvé pour ce niveau.
                </p>
            ) : (
                <div className="bg-white shadow-lg rounded-2xl p-6 max-w-6xl mx-auto">
                    <div className="grid grid-cols-12 gap-4 font-semibold mb-4 px-4">
                        <div className="col-span-1">#</div>
                        <div className="col-span-5">Élève</div>
                        <div className="col-span-3">Score Total</div>
                        <div className="col-span-2">Exercices</div>
                        <div className="col-span-1">Badge</div>
                    </div>

                    {filteredClassement.map((entry, index) => {
                        const badge = getBadgeForClassement(entry.totalScore);
                        return (
                            <div
                                key={entry.username}
                                className="grid grid-cols-12 gap-4 items-center p-4 mb-2 rounded-lg hover:bg-gray-50 transition"
                            >
                                <div className="col-span-1 text-xl font-bold">{index + 1}</div>
                                <div className="col-span-5">
                                    <Link
                                        to={`/profil/${entry.username}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {entry.username}
                                    </Link>
                                </div>
                                <div className="col-span-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {entry.totalScore.toFixed(1)} pts
                  </span>
                                </div>
                                <div className="col-span-2 text-gray-600">
                                    {entry.totalSubmissions} ex.
                                </div>
                                <div className="col-span-1">
                                    {badge && (
                                        <img
                                            src={badge}
                                            alt="Badge"
                                            className="w-8 h-8 object-contain mx-auto"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
