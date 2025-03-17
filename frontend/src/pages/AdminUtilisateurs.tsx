import React, { useEffect, useState } from "react";
import {fetchEleves} from "../services/admin.service";

const AdminUtilisateurs: React.FC = () => {
    const [eleves, setEleves] = useState([]);

    useEffect(() => {
        fetchEleves()
            .then(setEleves)
            .catch(error => console.error("Erreur de chargement des élèves :", error));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Liste des utilisateurs</h1>
            <p className="text-gray-700 mb-4">📌 Pour l’instant, seuls les élèves sont affichés. À l'avenir, on ajoutera les parents et les admins.</p>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Nom</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                </tr>
                </thead>
                <tbody>
                {eleves.length > 0 ? (
                    eleves.map((eleve: any) => (
                        <tr key={eleve.id} className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">{eleve.username}</td>
                            <td className="border border-gray-300 px-4 py-2">{eleve.email}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={2} className="border border-gray-300 px-4 py-2 text-center text-gray-500">
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
