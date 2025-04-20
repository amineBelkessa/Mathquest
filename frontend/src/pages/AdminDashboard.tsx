import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard: React.FC = () => {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-10">🛠️ Tableau de bord Admin 🛠️</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link to="/admin/utilisateurs" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border">
                    <h2 className="text-xl font-semibold text-blue-600">📋 Gérer les élèves</h2>
                    <p className="text-gray-600 mt-2">Afficher, supprimer ou consulter les comptes élèves.</p>
                </Link>

                <Link to="/admin/creer-compte" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border">
                    <h2 className="text-xl font-semibold text-green-600">➕ Créer un compte</h2>
                    <p className="text-gray-600 mt-2">Créer un nouveau compte utilisateur avec le rôle souhaité.</p>
                </Link>

            </div>
        </div>
    );
};

export default AdminDashboard;
