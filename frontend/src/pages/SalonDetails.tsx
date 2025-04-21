import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getExerciceById } from "../services/exercice.service";
import { getSubmissionsByUser } from "../services/submission.service";
import { Exercice } from "../types";
import { getUser } from "../services/auth.service";

// 🔹 Typage simplifié du salon
interface Salon {
    nom: string;
    code: string;
    dateDebut: string;
    dateFin: string;
    exercicesIds: string[];
}

interface Submission {
    exerciceId: string;
    score: number;
}

const SalonDetails: React.FC = () => {
    const { code } = useParams();
    const navigate = useNavigate();
    const [salon, setSalon] = useState<Salon | null>(null);
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [soumissions, setSoumissions] = useState<Submission[]>([]);
    const [error, setError] = useState("");

    const user = getUser();

    useEffect(() => {
        const fetchSalon = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/salons/${code}`, {
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
                setError("Salon introuvable ou erreur de chargement.");
            }
        };

        const fetchSubmissions = async () => {
            try {
                const data = await getSubmissionsByUser(user.username);
                setSoumissions(data);
            } catch (err) {
                console.error("Erreur lors du chargement des soumissions :", err);
            }
        };

        if (user?.username) {
            fetchSalon();
            fetchSubmissions();
        }
    }, [code]);

    if (error) {
        return <p className="text-red-600 text-center mt-10">{error}</p>;
    }

    if (!salon) return <p className="text-center mt-10">Chargement du salon...</p>;

    const now = new Date();
    const isActive = now >= new Date(salon.dateDebut) && now <= new Date(salon.dateFin);

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-6">
            <h2 className="text-2xl font-bold text-center">{salon.nom}</h2>
            <p className="text-center text-gray-600">
                Code : <strong>{salon.code}</strong>
            </p>
            <p className="text-center text-sm text-gray-500">
                Disponible du {new Date(salon.dateDebut).toLocaleString()} au{" "}
                {new Date(salon.dateFin).toLocaleString()}
            </p>

            {!isActive ? (
                <p className="text-center text-yellow-600 font-semibold">
                    ⏳ Ce salon est actuellement inactif. Revenez plus tard.
                </p>
            ) : exercices.length === 0 ? (
                <p className="text-center text-gray-500">Aucun exercice attribué pour le moment.</p>
            ) : (
                <div className="space-y-4">
                    {exercices.map((ex) => {
                        const soumission = soumissions.find((s) => s.exerciceId === ex.id);
                        return (
                            <div key={ex.id} className="p-4 border rounded shadow-sm">
                                <h4 className="text-lg font-bold">{ex.titre}</h4>
                                <p className="text-sm text-gray-600">
                                    Type : {ex.typeExercice} | Niveau : {ex.niveau}
                                </p>
                                {ex.description && (
                                    <p className="text-gray-700 mt-1">{ex.description}</p>
                                )}

                                {soumission ? (
                                    <p className="mt-2 text-green-600 font-semibold">
                                        ✅ Déjà soumis — Score : {soumission.score}%
                                    </p>
                                ) : (
                                    <button
                                        onClick={() => navigate(`/realiser-exercice/${ex.id}`)}
                                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        🎯 Réaliser
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SalonDetails;
