import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* LOGO */}
                <div className="text-2xl font-bold text-gray-900">
                    MathQuest<span className="text-blue-500">.</span>
                </div>

                {/* MENU DE NAVIGATION */}
                <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-blue-500">Accueil</Link>
                    <Link to="/news" className="hover:text-blue-500">News</Link>
                    <Link to="/agenda" className="hover:text-blue-500">Agenda</Link>
                    <Link to="/students" className="hover:text-blue-500">Étudiants</Link>
                    <Link to="/jobs" className="hover:text-blue-500">Jobs</Link>
                    <Link to="/shop" className="hover:text-blue-500">Shop</Link>
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

                {/* BOUTONS LOGIN / REGISTER */}
                <div className="hidden md:flex space-x-4">
                    <Link to="/login" className="text-blue-500 font-medium">Connexion</Link>
                    <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                        S'inscrire
                    </Link>
                </div>

                {/* MOBILE MENU */}
                <button className="md:hidden text-gray-700 focus:outline-none">
                    ☰
                </button>
            </div>
        </header>
    );
};

export default Header;
