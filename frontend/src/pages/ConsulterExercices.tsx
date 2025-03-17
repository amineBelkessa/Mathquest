import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExercices } from "../services/exercice.service";

// 🔹 Définition du type pour un exercice
interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
    niveau: string;
    description?: string;
}

const ConsulterExercices: React.FC = () => {
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        // 🔹 Récupération des exercices au montage
        const fetchData = async () => {
            try {
                const data: Exercice[] = await getExercices();
                setExercices(data);
            } catch (err) {
                setError("Impossible de charger la liste des exercices.");
            }
        };
        fetchData();
    }, []);


    // 🔹 Rediriger vers la réalisation d'un exercice
    const handleRealiserExercice = (id: string) => {
        navigate(`/realiser-exercice/${id}`);
    };

    return (
        <div
            style={{
                maxWidth: "600px",
                margin: "auto",
                textAlign: "center",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
            }}
        >
            <h2>Liste des Exercices</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul style={{ listStyle: "none", padding: 0 }}>
                {exercices.map((ex) => (
                    <li
                        key={ex.id}
                        style={{
                            margin: "10px 0",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                        }}
                    >
                        <strong>{ex.titre}</strong> <br />
                        Type: {ex.typeExercice} | Niveau: {ex.niveau} <br />
                        {ex.description && <p>{ex.description}</p>}
                        <button
                            onClick={() => handleRealiserExercice(ex.id)}
                            style={{
                                padding: "8px 12px",
                                background: "blue",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                marginTop: "10px",
                            }}
                        >
                            Réaliser l'exercice
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConsulterExercices;
