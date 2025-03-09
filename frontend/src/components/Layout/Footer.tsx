import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
                {/* SECTION 1 - À PROPOS */}
                <div>
                    <h2 className="text-xl font-bold mb-4">À propos</h2>
                    <p className="text-sm text-gray-400">
                        MathQuest est une plateforme interactive qui aide les étudiants à apprendre les mathématiques de manière ludique et efficace.
                    </p>
                </div>

                {/* SECTION 2 - LIENS UTILES */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Liens utiles</h2>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link to="/about" className="hover:text-blue-400">Qui sommes-nous ?</Link></li>
                        <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
                        <li><Link to="/terms" className="hover:text-blue-400">Conditions d'utilisation</Link></li>
                        <li><Link to="/privacy" className="hover:text-blue-400">Politique de confidentialité</Link></li>
                    </ul>
                </div>

                {/* SECTION 3 - RÉSEAUX SOCIAUX */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Suivez-nous</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-xl">
                            📘
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-xl">
                            🐦
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 text-xl">
                            📸
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 text-xl">
                            💼
                        </a>
                    </div>
                </div>

                {/* SECTION 4 - NEWSLETTER */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Newsletter</h2>
                    <p className="text-sm text-gray-400 mb-2">Recevez les dernières mises à jour et ressources directement par email.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="w-full p-2 rounded-l bg-gray-800 text-white border border-gray-700 focus:outline-none"
                        />
                        <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r text-white">
                            ➜
                        </button>
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} MathQuest. Tous droits réservés.
            </div>
        </footer>
    );
};

export default Footer;
