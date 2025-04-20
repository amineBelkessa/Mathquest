// pages/Classement.tsx
import React, { useEffect, useState } from "react";
import {Classement, getClassement} from "../services/classement.service";
import { Link } from "react-router-dom";

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
                🏆 Classement des Champions 🏆
            </h2>

            <div className="grid grid-cols-12 gap-4 font-semibold mb-4 px-4">
                <div className="col-span-1">#</div>
                <div className="col-span-6">Élève</div>
                <div className="col-span-3">Score Total</div>
                <div className="col-span-2">Exercices</div>
            </div>

            {classement.map((entry, index) => (
                <div
                    key={entry.username}
                    className="grid grid-cols-12 gap-4 items-center p-4 mb-2 rounded-lg hover:bg-gray-50 transition"
                >
                    <div className="col-span-1 text-xl font-bold">
                        {index + 1}
                        {index === 0 && " 🥇"}
                        {index === 1 && " 🥈"}
                        {index === 2 && " 🥉"}
                    </div>
                    <div className="col-span-6">
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
                </div>
            ))}
        </div>
    );
};

export default Leaderboard;