import React, { useEffect, useState } from "react";
import { fetchEleves, deleteEleve } from "../services/admin.service";

const AdminUtilisateurs: React.FC = () => {
    const [eleves, setEleves] = useState([]);

    const loadEleves = () => {
        fetchEleves()
            .then(setEleves)
            .catch(error => console.error("Erreur de chargement des élèves :", error));
    };

    useEffect(() => {
        loadEleves();
    }, []);

    const handleDelete = async (id: string) => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce compte ?");
        if (!confirmation) return;

        try {
            await deleteEleve(id);
            loadEleves(); // 🔄 Recharger la liste après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            alert("Impossible de supprimer cet utilisateur.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Liste des utilisateurs</h1>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Nom</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
                </thead>
                <tbody>
                {eleves.length > 0 ? (
                    eleves.map((eleve: any) => (
                        <tr key={eleve.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{eleve.username}</td>
                            <td className="border border-gray-300 px-4 py-2">{eleve.email}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <button
                                    onClick={() => handleDelete(eleve.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                >
                                    🗑 Supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                            Aucun élève trouvé.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUtilisateurs;
