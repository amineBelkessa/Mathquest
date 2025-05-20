import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services/auth.service";

const Header = () => {
    const navigate = useNavigate();
    const user = getUser(); // ✅ Récupère l'utilisateur connecté

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleAccueil = () => {
        if (user?.role === "enseignant") {
            navigate("/enseignant/dashboard");
        } else if (user?.role === "eleve") {
            navigate("/eleve/dashboard");
        } else if (user?.role === "parent") {
            navigate("/parent/dashboard");
        } else {
            navigate("/");
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* LOGO CLIQUABLE */}
                <div
                    className="text-2xl font-bold text-gray-900 cursor-pointer"
                    onClick={handleAccueil}
                >
                    MathQuest<span className="text-blue-500">.</span>
                </div>

                {/* MENU DE NAVIGATION */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <button onClick={handleAccueil} className="hover:text-blue-500">Accueil</button>
                    <Link to="/presentation" className="hover:text-blue-500">Présentation</Link>
                    <Link to="/fonctionnalites" className="hover:text-blue-500">Fonctionnalités</Link>
                    <Link to="/temoignages" className="hover:text-blue-500">Témoignages</Link>
                    <Link to="/tarifs" className="hover:text-blue-500">Tarifs</Link>
                    <Link to="/contact" className="hover:text-blue-500">Contact</Link>

                    {/* 👨‍🎓 Élève */}
                    {user?.role === "eleve" && (
                        <Link to="/mes-salons" className="hover:text-blue-500">📚 Mes Salons</Link>
                    )}
                </nav>

                {/* BARRE DE RECHERCHE */}
                <div className="relative hidden md:block">
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        🔍
                    </button>
                </div>

                {/* AUTHENTIFICATION */}
                <div className="hidden md:flex space-x-4">
                    {user?.username ? (
                        <div className="flex items-center space-x-4">
                            <span className="font-medium text-gray-700">
                                {user.username} ({user.role})
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                            >
                                Connexion
                            </Link>
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>

                {/* MENU MOBILE (non implémenté ici) */}
                <button className="md:hidden text-gray-700 focus:outline-none">
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Header;
