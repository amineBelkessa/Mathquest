import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSalon } from "../services/salon.service";
import { getUser } from "../services/auth.service";

const CreerSalon: React.FC = () => {
    const [nomSalon, setNomSalon] = useState("");
    const [dateDebut, setDateDebut] = useState("");
    const [dateFin, setDateFin] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();
    const user = getUser();

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
                professeurEmail: user.username, // ✅ correction ici
                dateDebut,
                dateFin,
            });
            setSuccess(`Salon créé avec succès ! Code : ${data.code}`);
            setTimeout(() => navigate("/"), 2000);
        } catch (err: any) {
            console.error(err);
            setError("Erreur lors de la création du salon.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Créer un Salon</h2>
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
        </div>
    );
};

export default CreerSalon;
