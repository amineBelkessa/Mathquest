import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services/auth.service";

const Header = () => {
    const navigate = useNavigate();
    const user = getUser();

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
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* 🔹 Logo */}
                <div
                    className="text-2xl font-bold text-gray-900 cursor-pointer"
                    onClick={handleAccueil}
                >
                    MathQuest<span className="text-blue-500">.</span>
                </div>

                {/* 🔸 Navigation principale */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium items-center">
                    <button onClick={handleAccueil} className="hover:text-blue-500">Accueil</button>
                    <Link to="/presentation" className="hover:text-blue-500">Présentation</Link>
                    <Link to="/fonctionnalites" className="hover:text-blue-500">Fonctionnalités</Link>
                    <Link to="/temoignages" className="hover:text-blue-500">Témoignages</Link>
                    <Link to="/tarifs" className="hover:text-blue-500">Tarifs</Link>
                    <Link to="/contact" className="hover:text-blue-500">Contact</Link>

                    {user?.role === "eleve" && (
                        <Link to="/mes-salons" className="hover:text-blue-500">📚 Mes Salons</Link>
                    )}
                </nav>

                {/* 🔐 Auth */}
                <div className="hidden md:flex items-center space-x-4">
                    {user?.username ? (
                        <>
                            <span className="font-medium text-gray-700">
                                {user.username} ({user.role})
                            </span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                            >
                                Déconnexion
                            </button>
                        </>
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

                {/* ☰ Menu Mobile placeholder */}
                <div className="md:hidden">
                    <button className="text-gray-700 text-2xl">☰</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
