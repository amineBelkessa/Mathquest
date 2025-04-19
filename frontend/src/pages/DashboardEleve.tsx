import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardEleve = () => {
    const navigate = useNavigate();

    const cardStyle =
        "bg-white text-black p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300 text-center";

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white px-6">
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
                {/* Titre principal */}
                <h1 className="text-6xl font-extrabold text-white drop-shadow-xl animate-bounce text-center mb-20 leading-snug">
                    🎓 Tableau de bord élève 🎓
                </h1>

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
                </div>
            </div>
        </div>
    );
};

export default DashboardEleve;
