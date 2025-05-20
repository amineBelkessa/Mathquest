import React from "react";
import { useNavigate } from "react-router-dom";

const ParentDashboard: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const parentId = user?.id || "ID non disponible";

    const cardStyle =
        "bg-white text-black p-8 rounded-3xl shadow-2xl hover:scale-105 transition duration-300 text-center";

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white px-6">
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
                <h1 className="text-6xl font-extrabold text-white drop-shadow-xl animate-bounce text-center mb-20 leading-snug">
                    🎓 Tableau de bord parent 🎓
                </h1>

                <div className="text-lg text-center mb-6">
                    <p><strong>Ton ID de parent est :</strong> {parentId}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
                    <div className={cardStyle}>
                        <h2 className="text-2xl font-bold mb-2">👶 Gérer mes enfants</h2>
                        <p className="text-gray-700 mb-6">Ajoute ou supprime les comptes de tes enfants.</p>
                        <button
                            onClick={() => navigate("/parent/gererenfants")}
                            className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow"
                        >
                            Gérer mes enfants
                        </button>
                    </div>

                    <div className={cardStyle}>
                        <h2 className="text-2xl font-bold mb-2">📈 Voir la progression</h2>
                        <p className="text-gray-700 mb-6">Consulte la progression de tes enfants.</p>
                        <button
                            onClick={() => navigate("/parent/enfants")}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow"
                        >
                            Voir la progression
                        </button>
                    </div>

                    <div className={cardStyle}>
                        <h2 className="text-2xl font-bold mb-2">🏆 Consulter classement</h2>
                        <p className="text-gray-700 mb-6">Voir les classements des enfants basés sur leur performance.</p>
                        <button
                            onClick={() => navigate("/parent/classement")}
                            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow"
                        >
                            Consulter classement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParentDashboard;
