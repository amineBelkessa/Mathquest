import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciceById, soumettreExercice } from "../services/exercice.service";
import { FaCheck, FaTimes, FaFilePdf } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// 🔹 Définition des types
interface Question {
    _id: string;
    formatQuestion: string;
    question: string;
    suggestions: string[];
    reponseCorrecte: string;
}

interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
    niveau: string;
    description?: string;
    pdfPath?: string;
    questions: Question[];
}

interface Submission {
    exerciceId: string;
    username: string;
    reponses: {
        questionId: string;
        reponseUtilisateur: string;
        correcte: boolean;
    }[];
    score: number;
    corrige: boolean;
    dateSoumission: string;
}

// 🔹 Ajout du type `ScoreResponse`
interface ScoreResponse {
    score: number;
    bonnes: number;
    total: number;
}

interface User {
    username: string;
    role: string;
}

const RealiserExercice: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [exercice, setExercice] = useState<Exercice | null>(null);
    const [reponses, setReponses] = useState<string[]>([]);
    const [score, setScore] = useState<ScoreResponse | null>(null);
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // 🔹 Récupération de l'utilisateur connecté
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setError("Vous devez être connecté pour réaliser un exercice.");
        }
    }, []);

    useEffect(() => {
        if (!user) return;
        if (user.role !== "eleve") {
            setError("Seuls les élèves peuvent soumettre un exercice.");
            return;
        }

        const fetchExercice = async () => {
            try {
                console.log(`📥 Chargement de l'exercice ID : ${id}`);
                const data: Exercice = await getExerciceById(id!);
                if (!data) {
                    throw new Error("Exercice non trouvé");
                }
                console.log("✅ Exercice récupéré :", data);
                setExercice(data);
                setReponses(new Array(data.questions.length).fill("")); // Initialisation des réponses vides
            } catch (err) {
                console.error("❌ Erreur lors du chargement de l'exercice :", err);
                setError("Impossible de charger l'exercice.");
            }
        };
        fetchExercice();
    }, [id, user]);

    const handleResponseChange = (index: number, value: string) => {
        const newReponses = [...reponses];
        newReponses[index] = value;
        setReponses(newReponses);
    };

    const handleSubmit = async () => {
        if (!user || user.role !== "eleve") {
            setError("Seuls les élèves peuvent soumettre un exercice.");
            return;
        }

        setIsSubmitting(true);
        try {
            console.log("📤 Soumission des réponses :", reponses);

            // 🔹 Correction ici pour inclure `username`
            const submissionData: Submission = {
                exerciceId: id!,
                username: user.username,
                reponses: reponses.map((r, i) => ({
                    questionId: exercice!.questions[i]._id,
                    reponseUtilisateur: r,
                    correcte: false, // La correction se fera côté backend
                })),
                score: 0,
                corrige: false,
                dateSoumission: new Date().toISOString(),
            };

            const result: ScoreResponse = await soumettreExercice(submissionData);
            console.log("✅ Soumission enregistrée :", result);
            setScore(result);
        } catch (err) {
            console.error("❌ Erreur lors de la soumission :", err);
            setError("Erreur lors de la soumission de l'exercice.");
        }
        setIsSubmitting(false);
    };

    if (error) {
        return (
            <div className="container mt-5 text-center">
                <div className="alert alert-danger">{error}</div>
                <button className="btn btn-secondary" onClick={() => navigate("/exercices")}>
                    Retour aux exercices
                </button>
            </div>
        );
    }

    if (!exercice) return <p className="text-center mt-5">Chargement...</p>;

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center mb-3">{exercice.titre}</h2>
                <p><strong>Type:</strong> {exercice.typeExercice} | <strong>Niveau:</strong> {exercice.niveau}</p>
                {exercice.description && <p><strong>Description:</strong> {exercice.description}</p>}

                {exercice.pdfPath && (
                    <p>
                        <FaFilePdf /> <a href={exercice.pdfPath} target="_blank" rel="noopener noreferrer">Télécharger le PDF</a>
                    </p>
                )}

                <h4 className="mt-4">Questions</h4>
                {exercice.questions.map((q, index) => (
                    <div key={index} className="mb-3 p-3 border rounded">
                        <p><strong>Question {index + 1} :</strong> {q.question}</p>
                        {q.formatQuestion === "QCM" ? (
                            <select className="form-select" value={reponses[index]} onChange={(e) => handleResponseChange(index, e.target.value)}>
                                <option value="">-- Sélectionnez une réponse --</option>
                                {q.suggestions.map((s, i) => (
                                    <option key={i} value={s}>{s}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Votre réponse"
                                value={reponses[index]}
                                onChange={(e) => handleResponseChange(index, e.target.value)}
                            />
                        )}
                    </div>
                ))}

                {score === null ? (
                    <button className="btn btn-primary w-100 mt-3" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Soumission en cours..." : "Soumettre l'exercice"}
                    </button>
                ) : (
                    <div className="mt-4 text-center">
                        <h3>Résultat</h3>
                        <p>Score : <strong>{score.score}%</strong> ({score.bonnes} / {score.total})</p>
                        {score.score === 100 ? <FaCheck color="green" size={50} /> : <FaTimes color="red" size={50} />}
                        <button className="btn btn-secondary mt-3" onClick={() => navigate("/exercices")}>
                            Retour aux exercices
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RealiserExercice;
