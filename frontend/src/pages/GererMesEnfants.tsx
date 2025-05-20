import React, { useEffect, useState } from "react";
import { getEnfants, addEnfant, removeEnfant } from "../services/parent.service";
import axios from "axios";
import BadgeDisplay from "./BadgeDisplay";

const GererMesEnfants = () => {
    const [enfants, setEnfants] = useState<any[]>([]);
    const [newEnfantId, setNewEnfantId] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [duplicateError, setDuplicateError] = useState<string>("");
    const [scores, setScores] = useState<{ [id: string]: number }>({});

    const parent = JSON.parse(localStorage.getItem("user") || "{}");
    const parentId = parent?.id;

    useEffect(() => {
        if (parentId) {
            getEnfants(parentId)
                .then((data) => {
                    setEnfants(data);
                    fetchScores(data);
                })
                .catch(() => setError("Erreur lors de la récupération des enfants."));
        }
    }, [parentId]);

    const fetchScores = async (enfantsData: any[]) => {
        try {
            const res = await axios.get("http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/classement");
            const scoreMap: { [id: string]: number } = {};
            res.data.forEach((entry: any) => {
                const enfant = enfantsData.find(e => e.username === entry.username);
                if (enfant) {
                    scoreMap[enfant.id] = entry.totalScore;
                }
            });
            setScores(scoreMap);
        } catch (e) {
            console.error("Erreur récupération des scores:", e);
        }
    };

    const handleAddEnfant = async () => {
        if (!newEnfantId) return;

        const enfantExists = enfants.some((enfant) => enfant.id === newEnfantId);
        if (enfantExists) {
            setDuplicateError("Cet enfant est déjà dans la liste.");
            setNewEnfantId("");
            return;
        }

        setDuplicateError("");
        try {
            await addEnfant(parentId, newEnfantId);
            const res = await axios.get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/eleves/${newEnfantId}`);
            const enfantData = res.data;
            const updatedEnfants = [...enfants, enfantData];
            setEnfants(updatedEnfants);
            setNewEnfantId("");
            fetchScores(updatedEnfants); // met à jour les scores
        } catch (err) {
            console.error(err);
            setError("Erreur lors de l'ajout de l'enfant.");
        }
    };

    const handleRemoveEnfant = (enfantId: string) => {
        removeEnfant(parentId, enfantId)
            .then(() => {
                const updated = enfants.filter((enfant) => enfant.id !== enfantId);
                setEnfants(updated);
                const { [enfantId]: _, ...rest } = scores;
                setScores(rest);
            })
            .catch(() => setError("Erreur lors de la suppression de l'enfant."));
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white px-6">
            <div className="flex flex-col items-center justify-center w-full max-w-5xl">
                <h1 className="text-5xl font-extrabold text-white drop-shadow-xl animate-bounce text-center mb-12 leading-snug">
                    🎓 Gérer mes enfants 🎓
                </h1>

                {/* Input ID manuel */}
                <div className="mb-6 text-center">
                    <input
                        type="text"
                        placeholder="Entrer l'ID de l'élève"
                        value={newEnfantId}
                        onChange={(e) => setNewEnfantId(e.target.value)}
                        className="text-black px-4 py-2 rounded mb-4 w-80"
                    />
                    <button
                        onClick={handleAddEnfant}
                        className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 shadow ml-2"
                    >
                        Ajouter un enfant
                    </button>

                    {duplicateError && <p className="text-red-500 mt-2">{duplicateError}</p>}
                </div>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Liste des enfants */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                    {enfants.length > 0 ? (
                        enfants.map((enfant: any) => (
                            <div
                                key={enfant.id}
                                className="bg-white text-black p-6 rounded-3xl shadow-xl transform hover:scale-105 transition duration-300 text-center"
                            >
                                <h2 className="text-xl font-bold mb-1 text-purple-700">
                                    👦 {enfant.username}
                                </h2>
                                <p className="text-sm text-gray-600 mb-2 break-words">
                                    ID : {enfant.id}
                                </p>

                                {scores[enfant.id] !== undefined && (
                                    <div className="mb-4">
                                        <BadgeDisplay score={scores[enfant.id]} />
                                    </div>
                                )}

                                <button
                                    onClick={() => handleRemoveEnfant(enfant.id)}
                                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow"
                                >
                                    Supprimer cet enfant
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Aucun enfant trouvé.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GererMesEnfants;
