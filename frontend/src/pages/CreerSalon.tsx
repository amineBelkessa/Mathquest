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
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const user = getUser();

    // ✅ Sécurité d'accès
    if (!user || user.role !== "enseignant") {
        return <p className="text-center text-red-600 mt-10">Accès réservé aux enseignants.</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setIsSubmitting(true);

        if (!dateDebut || !dateFin) {
            setError("Veuillez spécifier une date de début et de fin.");
            setIsSubmitting(false);
            return;
        }

        if (new Date(dateDebut) >= new Date(dateFin)) {
            setError("La date de début doit être avant la date de fin.");
            setIsSubmitting(false);
            return;
        }

        try {
            const data = await createSalon({
                nom: nomSalon,
                professeurEmail: user.username,
                dateDebut,
                dateFin,
            });
            setSuccess(`✅ Salon créé avec succès ! Code : ${data.code}`);
            setNomSalon("");
            setDateDebut("");
            setDateFin("");
            setTimeout(() => navigate("/enseignant/dashboard"), 2000);
        } catch (err) {
            console.error(err);
            setError("❌ Erreur lors de la création du salon.");
        } finally {
            setIsSubmitting(false);
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
                    disabled={isSubmitting}
                    className={`w-full text-white px-4 py-2 rounded transition ${
                        isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {isSubmitting ? "Création en cours..." : "Créer"}
                </button>
            </form>
        </div>
    );
};

export default CreerSalon;
