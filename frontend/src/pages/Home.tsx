import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/auth.service";

export default function Home() {
    const user = getUser();

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 flex flex-col items-center justify-center text-white">
            {/* 🌟 Logo + Titre */}
            <header className="w-full py-6 text-center text-5xl font-extrabold drop-shadow-lg animate-bounce">
                🌟 MathQuest 🌟
            </header>

            {/* 💬 Slogan */}
            <section className="flex flex-col items-center text-center mt-10 max-w-3xl">
                <h1 className="text-6xl font-extrabold drop-shadow-lg">
                    Maîtrisez les maths avec fun !
                </h1>
                <p className="mt-4 text-lg text-gray-200 drop-shadow-sm">
                    Des défis interactifs, des jeux et une progression adaptée à votre niveau. Relevez le challenge et devenez un génie des nombres !
                </p>

                {/* 🎯 Boutons d’action selon le rôle */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {/* ✅ Admin */}
                    {user?.role === "admin" && (
                        <Link
                            to="/admin/utilisateurs"
                            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition"
                        >
                            📋 Gérer les élèves
                        </Link>
                    )}

                    {/* ✅ Parent */}
                    {user?.role === "parent" && (
                        <>
                            <Link
                                to="/gerer-salon"
                                className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition"
                            >
                                🎓 Gérer les salons
                            </Link>
                            <Link
                                to="/creer-salon"
                                className="px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-600 transition"
                            >
                                ➕ Créer un salon
                            </Link>
                            <Link
                                to="/gerer-salon"
                                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
                            >
                                📈 Voir les performances
                            </Link>
                        </>
                    )}

                    {/* ✅ Élève */}
                    {user?.role === "eleve" && (
                        <>
                            <Link
                                to="/rejoindre-salon"
                                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition"
                            >
                                🎯 Rejoindre un salon
                            </Link>
                            <Link
                                to="/mes-salons"
                                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
                            >
                                📚 Mes salons
                            </Link>
                            <Link
                                to="/consulter-exercices"
                                className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition"
                            >
                                📘 Voir mes exercices
                            </Link>
                        </>
                    )}

                    {/* ✅ Invité */}
                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition"
                            >
                                Se connecter
                            </Link>
                            <Link
                                to="/register"
                                className="px-6 py-3 bg-green-400 text-black font-semibold rounded-lg shadow-lg hover:bg-green-500 transition"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </section>

            {/* 💡 Atouts de MathQuest */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-4">
                <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:scale-105 transition text-center flex flex-col items-center">
                    <h2 className="text-2xl font-bold">🎮 Jeux interactifs</h2>
                    <p className="mt-2 text-gray-700">Apprenez en vous amusant avec des mini-jeux captivants.</p>
                </div>
                <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:scale-105 transition text-center flex flex-col items-center">
                    <h2 className="text-2xl font-bold">🧠 Quiz intelligents</h2>
                    <p className="mt-2 text-gray-700">Testez vos connaissances et améliorez votre logique.</p>
                </div>
                <div className="bg-white text-black p-6 rounded-xl shadow-lg hover:scale-105 transition text-center flex flex-col items-center">
                    <h2 className="text-2xl font-bold">📈 Progression suivie</h2>
                    <p className="mt-2 text-gray-700">Suivez vos progrès et débloquez de nouveaux niveaux.</p>
                </div>
            </div>

            {/* Footer */}
            <footer className="w-full py-6 mt-12 bg-gray-900 text-white text-center text-lg">
                © {new Date().getFullYear()} MathQuest. Tous droits réservés.
            </footer>
        </div>
    );
}
