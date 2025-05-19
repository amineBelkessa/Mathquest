import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/auth.service";

const BoutonAccueil = ({ to, children, color }: { to: string; children: React.ReactNode; color: string }) => (
    <Link
        to={to}
        className={`px-6 py-3 ${color} text-white font-semibold rounded-lg shadow-lg hover:brightness-110 transition`}
    >
        {children}
    </Link>
);

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
                {user?.username && (
                    <p className="mb-2 text-lg text-white font-medium drop-shadow-sm">
                        Bienvenue, <span className="font-bold">{user.username}</span> 🎉
                    </p>
                )}
                <h1 className="text-6xl font-extrabold drop-shadow-lg">
                    Maîtrisez les maths avec fun !
                </h1>
                <p className="mt-4 text-lg text-gray-200 drop-shadow-sm">
                    Des défis interactifs, des jeux et une progression adaptée à votre niveau. Relevez le challenge et devenez un génie des nombres !
                </p>

                {/* 🎯 Actions selon rôle */}
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {user?.role === "admin" && (
                        <BoutonAccueil to="/admin/utilisateurs" color="bg-red-500">📋 Gérer les élèves</BoutonAccueil>
                    )}

                    {user?.role === "parent" && (
                        <>
                            <BoutonAccueil to="/gerer-salon" color="bg-purple-500">🎓 Gérer les salons</BoutonAccueil>
                            <BoutonAccueil to="/creer-salon" color="bg-indigo-500">➕ Créer un salon</BoutonAccueil>
                            <BoutonAccueil to="/performances/test" color="bg-blue-500">📈 Voir les performances</BoutonAccueil>
                        </>
                    )}

                    {user?.role === "eleve" && (
                        <>
                            <BoutonAccueil to="/rejoindre-salon" color="bg-green-500">🎯 Rejoindre un salon</BoutonAccueil>
                            <BoutonAccueil to="/mes-salons" color="bg-blue-500">📚 Mes salons</BoutonAccueil>
                            <BoutonAccueil to="/consulter-exercices" color="bg-yellow-500">📘 Voir mes exercices</BoutonAccueil>
                        </>
                    )}

                    {!user && (
                        <>
                            <BoutonAccueil to="/login" color="bg-yellow-400 text-black">Se connecter</BoutonAccueil>
                            <BoutonAccueil to="/register" color="bg-green-400 text-black">S'inscrire</BoutonAccueil>
                        </>
                    )}
                </div>
            </section>

            {/* 💡 Avantages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-4">
                {[
                    { titre: "🎮 Jeux interactifs", texte: "Apprenez en vous amusant avec des mini-jeux captivants." },
                    { titre: "🧠 Quiz intelligents", texte: "Testez vos connaissances et améliorez votre logique." },
                    { titre: "📈 Progression suivie", texte: "Suivez vos progrès et débloquez de nouveaux niveaux." },
                ].map(({ titre, texte }, i) => (
                    <div
                        key={i}
                        className="bg-white text-black p-6 rounded-xl shadow-lg hover:scale-105 transition text-center flex flex-col items-center"
                    >
                        <h2 className="text-2xl font-bold">{titre}</h2>
                        <p className="mt-2 text-gray-700">{texte}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
