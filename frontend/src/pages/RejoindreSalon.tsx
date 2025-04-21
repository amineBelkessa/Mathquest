// frontend/src/pages/RejoindreSalon.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { rejoindreSalon } from "../services/salon.service";
import { getUser } from "../services/auth.service";

const RejoindreSalon: React.FC = () => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const user = getUser();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!user) {
            setError("Vous devez être connecté pour rejoindre un salon.");
            return;
        }

        try {
            await rejoindreSalon(code, user.username);
            setSuccess("✅ Vous avez rejoint le salon !");
            setTimeout(() => navigate("/"), 2000); // ou une page /salons
        } catch (err: any) {
            setError(err.message || "Erreur lors de la tentative de rejoindre le salon.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">🔑 Rejoindre un Salon</h2>
            {error && <div className="text-red-600 mb-3">{error}</div>}
            {success && <div className="text-green-600 mb-3">{success}</div>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Code du salon"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    Rejoindre
                </button>
            </form>
        </div>
    );
};

export default RejoindreSalon;
