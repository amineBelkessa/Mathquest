import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSalon, ajouterExerciceAuSalon } from "../services/salon.service";
import { getUser } from "../services/auth.service";
import { getExercices } from "../services/exercice.service";
import axios from "axios";

interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
}

const GererSalon: React.FC = () => {
    const [nomSalon, setNomSalon] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [salons, setSalons] = useState<any[]>([]);
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [exerciceIds, setExerciceIds] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const user = getUser();

    useEffect(() => {
        const fetchSalons = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/salons/prof/${user.username}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSalons(res.data);
            } catch (err) {
                console.error("Erreur de récupération des salons :", err);
            }
        };

        const fetchExercices = async () => {
            try {
                const data = await getExercices();
                setExercices(data);
            } catch (err) {
                console.error("Erreur de chargement des exercices :", err);
            }
        };

        if (user?.username) {
            fetchSalons();
            fetchExercices();
        }
    }, [user?.username]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!dateDebut || !dateFin) {
            setError("Veuillez spécifier une date de début et de fin.");
            return;
        }

        if (new Date(dateDebut) >= new Date(dateFin)) {
            setError("La date de début doit être avant la date de fin.");
            return;
        }

        try {
            const data = await createSalon({
                nom: nomSalon,
                professeurEmail: user.username,
                dateDebut,
                dateFin,
            });
            setSuccess(`Salon créé avec succès ! Code : ${data.code}`);
            setNomSalon("");
            setDateDebut("");
            setDateFin("");
            setSalons((prev) => [...prev, data]);
        } catch (err: any) {
            console.error(err);
            setError("Erreur lors de la création du salon.");
        }
    };

    const handleAjouterExercice = async (codeSalon: string) => {
        const exerciceId = exerciceIds[codeSalon];
        if (!exerciceId) return;

        try {
            await ajouterExerciceAuSalon(codeSalon, exerciceId);
            alert("✅ Exercice ajouté !");
            setExerciceIds((prev) => ({ ...prev, [codeSalon]: "" }));
        } catch (err) {
            alert("❌ Erreur lors de l'ajout !");
        }
    };

    const handleVoirPerformances = (codeSalon: string) => {
        navigate(`/performances/${codeSalon}`);
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow space-y-6">
            <h2 className="text-2xl font-bold mb-4">Créer un nouveau Salon</h2>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Nom du salon"
                    value={nomSalon}
                    onChange={(e) => setNomSalon(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <label className="block font-medium">🕒 Date de début</label>
                <input
                    type="datetime-local"
                    value={dateDebut}
                    onChange={(e) => setDateDebut(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                />
                <label className="block font-medium">🕒 Date de fin</label>
                <input
                    type="datetime-local"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    className="w-full border px-4 py-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Créer
                </button>
            </form>

            <h3 className="text-xl font-semibold mt-8">📚 Mes Salons</h3>

            {salons.length === 0 ? (
                <p className="text-gray-500">Aucun salon encore créé.</p>
            ) : (
                <ul className="space-y-4">
                    {salons.map((salon) => (
                        <li key={salon.id} className="border rounded p-4 shadow-sm">
                            <p><strong>Nom :</strong> {salon.nom}</p>
                            <p><strong>Code :</strong> {salon.code}</p>
                            <p className="text-sm text-gray-500">🕒 {salon.dateDebut} ➜ {salon.dateFin}</p>

                            <div className="mt-2 flex gap-2 items-center">
                                <select
                                    value={exerciceIds[salon.code] || ""}
                                    onChange={(e) =>
                                        setExerciceIds((prev) => ({ ...prev, [salon.code]: e.target.value }))
                                    }
                                    className="border px-2 py-1 rounded w-full"
                                >
                                    <option value="">-- Choisir un exercice --</option>
                                    {exercices.map((ex) => (
                                        <option key={ex.id} value={ex.id}>
                                            {ex.titre} ({ex.typeExercice})
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={() => handleAjouterExercice(salon.code)}
                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                >
                                    ➕ Attribuer
                                </button>
                                <button
                                    onClick={() => handleVoirPerformances(salon.code)}
                                    className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                                >
                                    📊 Voir les performances
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GererSalon;
