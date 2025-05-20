import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const plans = [
    {
        name: "Gratuit",
        price: "0€",
        description: "Pour découvrir MathQuest",
        features: [
            "Accès aux exercices publics",
            "Suivi de progression de base",
            "Classement limité",
        ],
        bg: "bg-white",
        border: "border-gray-300",
    },
    {
        name: "Standard",
        price: "9,99€/mois",
        description: "Pour progresser régulièrement",
        features: [
            "Accès illimité aux exercices",
            "Salons collaboratifs",
            "Suivi avancé",
            "Classements nationaux",
        ],
        bg: "bg-indigo-50",
        border: "border-indigo-400",
    },
    {
        name: "Premium",
        price: "19,99€/mois",
        description: "Pour un accompagnement complet",
        features: [
            "Tout le contenu Standard",
            "Support prioritaire",
            "Espace parent dédié",
            "Coaching personnalisé",
        ],
        bg: "bg-yellow-50",
        border: "border-yellow-400",
    },
];

const Tarifs: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 text-center mb-6">Nos Offres</h1>
                <p className="text-gray-600 mb-12 text-lg">
                    Choisissez le plan qui correspond à vos besoins, que vous soyez élève, enseignant ou parent.
                </p>

                <div className="grid md:grid-cols-3 gap-10">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`rounded-2xl shadow-md hover:shadow-xl transition p-6 border ${plan.border} ${plan.bg}`}
                        >
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                            <p className="text-indigo-600 text-3xl font-extrabold mb-1">{plan.price}</p>
                            <p className="text-sm text-gray-500 mb-4 italic">{plan.description}</p>
                            <ul className="text-left space-y-2 mb-6">
                                {plan.features.map((feat, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-700">
                                        <FaCheckCircle className="text-green-500" />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-full transition">
                                Choisir
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tarifs;
