import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getClassement } from "../services/classement.service";
import { getUser } from "../services/auth.service";

import bronzeBadge from "../assets/badges/bronze.png";
import argentBadge from "../assets/badges/argent.png";
import orBadge from "../assets/badges/or.png";
import ferBadge from "../assets/badges/fer.png";
import questmasterBadge from "../assets/badges/questmaster.png";

const DashboardEleve: React.FC = () => {
    const navigate = useNavigate();
    const [userScore, setUserScore] = useState<number>(0);
    const user = getUser();

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

    const getBadge = (score: number) => {
        if (score >= 3000) return { src: questmasterBadge, label: "QuestMaster" };
        if (score >= 2000) return { src: orBadge, label: "Or" };
        if (score >= 1000) return { src: argentBadge, label: "Argent" };
        if (score >= 500) return { src: bronzeBadge, label: "Bronze" };
        if (score < 500) return { src: ferBadge, label: "Fer" };
        return null;
    };

    const badge = getBadge(userScore);

    const actions = [
        {
            title: "📚 Consulter les exercices",
            description: "Accède aux exercices adaptés à ton niveau.",
            color: "bg-indigo-100 text-indigo-700",
            action: () => navigate("/consulter-exercices"),
        },
        {
            title: "🎯 Rejoindre une salle",
            description: "Entre un code pour participer à une session en direct.",
            color: "bg-yellow-100 text-yellow-700",
            action: () => navigate("/rejoindre-salle"),
        },
        {
            title: "📈 Ma progression",
            description: "Suis ton évolution et améliore-toi chaque jour.",
            color: "bg-green-100 text-green-700",
            action: () => navigate("/eleve/mes-resultats"),
        },
        {
            title: "🥇 Classement",
            description: "Compare ton score avec les autres élèves.",
            color: "bg-pink-100 text-pink-700",
            action: () => navigate("/eleve/classement"),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-extrabold text-center text-indigo-800 mb-12 tracking-tight"
            >
                🎓 Tableau de bord <span className="text-indigo-600">Élève</span> 🎓
            </motion.h2>

            {badge && (
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 flex flex-col items-center"
                >
                    <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 rounded-full p-1 shadow-xl">
                        <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                            <img src={badge.src} alt={badge.label} className="w-16 h-16 object-contain" />
                        </div>
                    </div>
                    <h2 className="text-xl font-bold mt-3 text-indigo-700">{badge.label}</h2>
                    <p className="text-gray-600 text-sm mt-1">Score : {userScore.toFixed(1)} pts</p>
                </motion.div>
            )}

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
                {actions.map((card, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer rounded-2xl bg-white shadow-lg hover:shadow-xl border border-gray-100 transition-all duration-200 p-6"
                        onClick={card.action}
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`text-3xl p-3 rounded-xl ${card.color}`}>
                                {card.title.slice(0, 2)}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {card.title.slice(2)}
                                </h3>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm pl-1">{card.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DashboardEleve;
