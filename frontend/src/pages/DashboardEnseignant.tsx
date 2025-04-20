import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardEnseignant: React.FC = () => {
    const navigate = useNavigate();

    const actions = [
        {
            title: "Créer un exercice",
            description: "Ajoutez des questions, des réponses et publiez un nouvel exercice.",
            icon: "📝",
            color: "bg-indigo-100 text-indigo-700",
            action: () => navigate("/enseignant/creer-exercice"), // ✅ Correction ici
        },
        {
            title: "Créer une salle",
            description: "Générez un code que les élèves pourront utiliser pour rejoindre.",
            icon: "🏫",
            color: "bg-yellow-100 text-yellow-700",
            action: () => navigate("/creer-salle"),
        },
        {
            title: "Résultats des élèves",
            description: "Consultez les soumissions, scores et progrès des élèves.",
            icon: "📊",
            color: "bg-green-100 text-green-700",
            action: () => navigate("/resultats-eleves"),
        },
        {
            title: "Statistiques globales",
            description: "Obtenez des statistiques globales sur la performance des élèves.",
            icon: "📈",
            color: "bg-pink-100 text-pink-700",
            action: () => navigate("/statistiques"),
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
                👨‍🏫 Tableau de bord <span className="text-indigo-600">Enseignant</span> 👩‍🏫
            </motion.h2>

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
                                {card.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm pl-1">{card.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DashboardEnseignant;
