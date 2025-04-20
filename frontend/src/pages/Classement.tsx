import React, { useEffect, useState } from "react";
import { Classement, getClassement } from "../services/classement.service";
import { Link } from "react-router-dom";

// 🔹 Import des images de badges
import ferBadge from "../assets/badges/fer.png"
import bronzeBadge from "../assets/badges/bronze.png";
import argentBadge from "../assets/badges/argent.png";
import orBadge from "../assets/badges/or.png";
import questmasterBadge from "../assets/badges/questmaster.png";

const getBadge = (score: number): string | null => {
    if (score >= 5000) return questmasterBadge;
    if (score >= 2000) return orBadge;
    if (score >= 1000) return argentBadge;
    if (score >= 500) return bronzeBadge;
    if (score < 500) return ferBadge;
    return null;
};

const Leaderboard = () => {
    const [classement, setClassement] = useState<Classement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadClassement = async () => {
            try {
                const data = await getClassement();
                setClassement(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur inconnue");
            } finally {
                setLoading(false);
            }
        };
        loadClassement();
    }, []);

    if (loading) return <div className="text-center py-4">Chargement du classement...</div>;
    if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
                🏆 Classement des Champions de MathQuest 🏆
            </h2>

            <div className="grid grid-cols-12 gap-4 font-semibold mb-4 px-4">
                <div className="col-span-1">#</div>
                <div className="col-span-5">Élève</div>
                <div className="col-span-3">Score Total</div>
                <div className="col-span-2">Exercices</div>
                <div className="col-span-1">Badge</div>
            </div>

            {classement.map((entry, index) => {
                const badge = getBadge(entry.totalScore);
                return (
                    <div
                        key={entry.username}
                        className="grid grid-cols-12 gap-4 items-center p-4 mb-2 rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className="col-span-1 text-xl font-bold">{index + 1}</div>
                        <div className="col-span-5">
                            <Link
                                to={`/profil/${entry.username}`}
                                className="text-blue-600 hover:text-blue-800"
                            >
                                {entry.username}
                            </Link>
                        </div>
                        <div className="col-span-3">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
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
    );
};

export default Leaderboard;
