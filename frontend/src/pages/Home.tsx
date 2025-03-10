import React from "react";
import { Link } from "react-router-dom";




export default function Home() {

    return (
        <div className="min-h-screen bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 flex flex-col items-center justify-center text-white">
            {/* Header */}
            <header className="w-full py-6 text-center text-5xl font-extrabold drop-shadow-lg animate-bounce">
                🌟 MathQuest 🌟
            </header>

            {/* Hero Section */}
            <section className="flex flex-col items-center text-center mt-10 max-w-3xl">
                <h1 className="text-6xl font-extrabold drop-shadow-lg">
                    Maîtrisez les maths avec fun !
                </h1>
                <p className="mt-4 text-lg text-gray-200 drop-shadow-sm">
                    Des défis interactifs, des jeux et une progression adaptée à votre niveau. Relevez le challenge et devenez un génie des nombres !
                </p>

                <div className="mt-6 space-x-4 flex">
                    <Link to="/login" className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition">
                        Se connecter
                    </Link>
                    <Link to="/register" className="px-6 py-3 bg-green-400 text-black font-semibold rounded-lg shadow-lg hover:bg-green-500 transition">
                        S'inscrire
                    </Link>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
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
            <footer className="w-full py-0 mt-4 bg-gray-900 text-white text-center text-lg">
            </footer>
        </div>
    );
}
