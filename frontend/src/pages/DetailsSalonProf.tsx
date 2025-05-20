import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getExerciceById } from "../services/exercice.service";
import { Exercice } from "../types";
import { getUser } from "../services/auth.service";

interface Salon {
    nom: string;
    code: string;
    dateDebut: string;
    dateFin: string;
    exercicesIds: string[];
    elevesEmails: string[];
}

const DetailsSalonProf: React.FC = () => {
    const { code } = useParams();
    const [salon, setSalon] = useState<Salon | null>(null);
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [error, setError] = useState("");
    const user = getUser();

    useEffect(() => {
        const fetchSalon = async () => {
            try {
                const response = await axios.get(`http://srv-dpi-proj-mathquest-prod.univ-rouen.fr/api/salons/${code}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const salonData = response.data;
                setSalon(salonData);

                const now = new Date();
                const debut = new Date(salonData.dateDebut);
                const fin = new Date(salonData.dateFin);

                if (now >= debut && now <= fin) {
                    const promises = salonData.exercicesIds.map((id: string) => getExerciceById(id));
                    const exs = await Promise.all(promises);
                    setExercices(exs);
                }
            } catch (err) {
                setError("Erreur de chargement des données du salon.");
            }
        };

        if (user?.username) fetchSalon();
    }, [code]);

    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;
    if (!salon) return <p className="text-center mt-10">Chargement...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-3xl font-bold text-center mb-2">📚 Détails du Salon</h2>
            <p className="text-center text-lg text-gray-700 mb-4">
                <strong>{salon.nom}</strong> (Code: {salon.code})
            </p>
            <p className="text-center text-sm text-gray-500 mb-6">
                Période : {new Date(salon.dateDebut).toLocaleString()} ➜ {new Date(salon.dateFin).toLocaleString()}
            </p>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">👥 Élèves inscrits ({salon.elevesEmails.length})</h3>
                {salon.elevesEmails.length === 0 ? (
                    <p className="text-gray-500">Aucun élève encore inscrit.</p>
                ) : (
                    <ul className="list-disc pl-6 text-gray-800">
                        {salon.elevesEmails.map((email, index) => (
                            <li key={index}>{email}</li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2">📝 Exercices attribués</h3>
                {exercices.length === 0 ? (
                    <p className="text-gray-500">Aucun exercice attribué pour le moment.</p>
                ) : (
                    <ul className="space-y-2">
                        {exercices.map((ex) => (
                            <li key={ex.id} className="border p-4 rounded shadow-sm">
                                <h4 className="text-lg font-bold">{ex.titre}</h4>
                                <p className="text-sm text-gray-600">
                                    Type : {ex.typeExercice} | Niveau : {ex.niveau}
                                </p>
                                {ex.description && <p className="text-gray-700 mt-1">{ex.description}</p>}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DetailsSalonProf;
