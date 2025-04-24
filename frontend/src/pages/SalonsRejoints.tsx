import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/auth.service";
import { getExerciceById } from "../services/exercice.service";

interface Salon {
    nom: string;
    code: string;
    dateDebut: string;
    dateFin: string;
    exercicesIds: string[];
}

interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
    niveau: string;
    description?: string;
}

const SalonsRejoints: React.FC = () => {
    const [salons, setSalons] = useState<Salon[]>([]);
    const [exercicesParSalon, setExercicesParSalon] = useState<{ [code: string]: Exercice[] }>({});
    const [error, setError] = useState("");
    const user = getUser();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/salons/eleve/${user.username}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const salonsData: Salon[] = res.data;
                setSalons(salonsData);

                const map: { [code: string]: Exercice[] } = {};

                for (const salon of salonsData) {
                    const exs = await Promise.all(
                        salon.exercicesIds.map((id) => getExerciceById(id))
                    );
                    map[salon.code] = exs;
                }

                setExercicesParSalon(map);
            } catch (err: any) {
                console.error(err);
                setError("Erreur lors du chargement des salons ou exercices.");
            }
        };

        if (user?.username) {
            fetchSalons();
        }
    }, [user?.username]);

    if (error) return <p className="text-red-600 text-center mt-10">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-6">
            <h2 className="text-2xl font-bold text-center">📚 Mes Salons Rejoints</h2>

            {salons.length === 0 ? (
                <p className="text-center text-gray-500">Aucun salon trouvé.</p>
            ) : (
                salons.map((salon) => {
                    const now = new Date();
                    const debut = new Date(salon.dateDebut);
                    const fin = new Date(salon.dateFin);
                    const isActive = now >= debut && now <= fin;

                    return (
                        <div key={salon.code} className="border rounded p-4 shadow-sm">
                            <h3 className="text-lg font-bold">{salon.nom}</h3>
                            <p className="text-sm text-gray-600">Code : {salon.code}</p>
                            <p className="text-sm text-gray-500">
                                Période : {debut.toLocaleString()} - {fin.toLocaleString()}
                            </p>

                            {!isActive ? (
                                <p className="text-yellow-600 font-semibold mt-2">
                                    ⏳ Ce salon est actuellement inactif.
                                </p>
                            ) : exercicesParSalon[salon.code]?.length === 0 ? (
                                <p className="text-gray-500 mt-2">Aucun exercice attribué pour ce salon.</p>
                            ) : (
                                <div className="mt-4 space-y-2">
                                    {exercicesParSalon[salon.code]?.map((ex) => (
                                        <div key={ex.id} className="p-3 border rounded shadow-sm">
                                            <h4 className="font-semibold">{ex.titre}</h4>
                                            <p className="text-sm text-gray-600">
                                                Type : {ex.typeExercice} | Niveau : {ex.niveau}
                                            </p>
                                            {ex.description && <p className="text-sm text-gray-700">{ex.description}</p>}
                                            <p className="text-xs text-gray-400">
                                                Disponible jusqu'à : {fin.toLocaleString()}
                                            </p>

                                            <button
                                                onClick={() => navigate(`/realiser-exercice/${ex.id}`)}
                                                className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                            >
                                                🎯 Réaliser
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default SalonsRejoints;
