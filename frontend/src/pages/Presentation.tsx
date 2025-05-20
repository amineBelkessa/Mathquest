import React from "react";
import { motion } from "framer-motion";

const Presentation: React.FC = () => {
    const sections = [
        {
            emoji: "🎯",
            title: "Notre mission",
            text: "Offrir aux élèves un environnement motivant pour apprendre les mathématiques, avec un accompagnement pédagogique et des outils adaptés à leur niveau.",
        },
        {
            emoji: "📊",
            title: "Suivi personnalisé",
            text: "Les enseignants et parents peuvent suivre en temps réel la progression des élèves, leurs scores, et adapter les contenus selon leurs besoins.",
        },
        {
            emoji: "🧠",
            title: "Apprentissage actif",
            text: "Des exercices dynamiques, un système de classements et des récompenses motivent les élèves à progresser tout en s'amusant.",
        },
        {
            emoji: "👩‍🏫",
            title: "Pour tous les profils",
            text: "MathQuest s'adresse aux écoles, enseignants, parents et élèves de la primaire au lycée. Chaque utilisateur dispose d'un espace dédié et d'outils personnalisés.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6 md:px-20">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto"
            >
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 text-center mb-6">
                    Qu'est-ce que MathQuest ?
                </h1>

                <p className="text-lg text-center text-gray-600 mb-12">
                    MathQuest est une plateforme interactive pensée pour faire aimer les mathématiques
                    aux élèves de tous niveaux, grâce à des exercices ludiques, un suivi intelligent et
                    une pédagogie moderne.
                </p>

                <div className="grid md:grid-cols-2 gap-10">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
                        >
                            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
                                {section.emoji} {section.title}
                            </h2>
                            <p className="text-gray-700">{section.text}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Presentation;
