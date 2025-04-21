import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClassement } from "../services/classement.service";
import { getUser } from "../services/auth.service";


import bronzeBadge from "../assets/badges/bronze.png";
import argentBadge from "../assets/badges/argent.png";
import orBadge from "../assets/badges/or.png";
import ferBadge from "../assets/badges/fer.png";
import questmasterBadge from "../assets/badges/questmaster.png";

const DashboardEleve = () => {
    const navigate = useNavigate();
    const [userScore, setUserScore] = useState<number>(0);
    const user = getUser();

    const cardStyle =
        "bg-white text-black p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300 text-center";

    // Fonction pour déterminer le badge en fonction du score
    const getBadge = (score: number) => {
        if (score >= 1000) return { src: questmasterBadge, label: "QuestMaster" };
        if (score >= 750) return { src: ferBadge, label: "Fer" };
        if (score >= 500) return { src: orBadge, label: "Or" };
        if (score >= 250) return { src: argentBadge, label: "Argent" };
        if (score >= 100) return { src: bronzeBadge, label: "Bronze" };
        return null;
    };

    // Charger le score de l'utilisateur connecté
    useEffect(() => {
        const fetchClassement = async () => {
            try {
                const data = await getClassement();
                const currentUser = data.find((entry) => entry.username === user?.username);
                if (currentUser) {
                    setUserScore(currentUser.totalScore);
                }
            } catch (error) {
                console.error("Erreur lors du chargement du classement :", error);
            }
        };

        fetchClassement();
    }, [user?.username]);

    const badge = getBadge(userScore);


    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white px-6">
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
                {/* Titre principal */}
                <h1 className="text-6xl font-extrabold text-white drop-shadow-xl animate-bounce text-center mb-20 leading-snug">
                    🎓 Tableau de bord élève 🎓
                </h1>
                {/* Badge de l'élève */}
                {badge && (
                    <div className="mb-12 flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 rounded-full p-1 shadow-xl">
                            <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                                <img
                                    src={badge.src}
                                    alt={badge.label}
                                    className="w-16 h-16 object-contain"
                                />
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mt-3 text-white drop-shadow-sm">
                            {badge.label}
                        </h2>
                        <p className="text-white text-sm mt-1 drop-shadow-sm">
                            Score : {userScore.toFixed(1)} pts
                        </p>
                    </div>
                )}



                {/* Zone des cartes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                    {/* 1. Consulter les exercices */}
                    <div className={cardStyle}>
                        <h2 className="text-2xl font-bold mb-2">📚 Consulter les exercices</h2>
                        <p className="text-gray-700 mb-6">Accède aux exercices adaptés à ton niveau.</p>
                        <button
                            onClick={() => navigate("/consulter-exercices")}
                            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow"
                        >
                            Voir les exercices
                        </button>
                    </div>

                    {/* 2. Rejoindre une salle */}
                    <div className={cardStyle}>
                        <h2 className="text-2xl font-bold mb-2">🎯 Rejoindre une salle</h2>
                        <p className="text-gray-700 mb-6">Entre un code de salle pour participer à une session en direct.</p>
                        <button
                            onClick={() => navigate("/rejoindre-salle")}
                            className="px-6 py-2 bg-yellow-400 font-semibold text-black rounded-lg hover:bg-yellow-500 shadow"
                        >
                            Rejoindre
                        </button>
                    </div>

                    {/* 3. Ma progression */}
                    <div className={cardStyle}>
                        <h2 className="text-2xl font-bold mb-2">📈 Ma progression</h2>
                        <p className="text-gray-700 mb-6">Tu progresses bien ! Continue comme ça 💪</p>
                        <button
                            onClick={() => navigate("/eleve/mes-resultats")}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                        >
                            Voir mes résultats
                        </button>
                    </div>

                    {/* 4. Classement */}
                    <div className={cardStyle}>
                        <h2 className="text-2xl font-bold mb-2">🥇 Classement</h2>
                        <p className="text-gray-700 mb-6">Regarde ton classement parmi les élèves et ton badge !</p>
                        <button
                            onClick={() => navigate("/eleve/classement")}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                        >
                            Voir le classement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default DashboardEleve;
