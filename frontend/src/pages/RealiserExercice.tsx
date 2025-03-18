import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciceById, soumettreExercice } from "../services/exercice.service";
import { FaCheck, FaTimes, FaFilePdf } from "react-icons/fa";

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
                setExercice(data);
                setReponses(new Array(data.questions.length).fill(""));
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

            const submissionData: Submission = {
                exerciceId: id!,
                username: user.username,
                reponses: reponses.map((r, i) => ({
                    questionId: exercice!.questions[i]._id,
                    reponseUtilisateur: r,
                    correcte: false,
                })),
                score: 0,
                corrige: false,
                dateSoumission: new Date().toISOString(),
            };

            const result: ScoreResponse = await soumettreExercice(submissionData);
            setScore(result);
        } catch (err) {
            console.error("❌ Erreur lors de la soumission :", err);
            setError("Erreur lors de la soumission de l'exercice.");
        }
        setIsSubmitting(false);
    };

    if (error) {
        return (
            <div className="flex flex-col items-center mt-10">
                <div className="bg-red-500 text-white p-4 rounded-lg">{error}</div>
                <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded" onClick={() => navigate("/exercices")}>
                    Retour aux exercices
                </button>
            </div>
        );
    }

    if (!exercice) return <p className="text-center mt-10">Chargement...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-center text-2xl font-bold">{exercice.titre}</h2>
            <p className="text-gray-700"><strong>Type:</strong> {exercice.typeExercice} | <strong>Niveau:</strong> {exercice.niveau}</p>
            {exercice.description && <p className="text-gray-600"><strong>Description:</strong> {exercice.description}</p>}

            {exercice.pdfPath && (
                <p className="mt-2">
                    <FaFilePdf className="inline text-red-500" />{" "}
                    <a href={exercice.pdfPath} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        Télécharger le PDF
                    </a>
                </p>
            )}

            <h4 className="mt-4 text-xl font-semibold">Questions</h4>
            {exercice.questions.map((q, index) => (
                <div key={index} className="mt-3 p-3 border rounded">
                    <p><strong>Question {index + 1} :</strong> {q.question}</p>
                    {q.formatQuestion === "QCM" ? (
                        <select
                            className="w-full p-2 border rounded"
                            value={reponses[index]}
                            onChange={(e) => handleResponseChange(index, e.target.value)}
                        >
                            <option value="">-- Sélectionnez une réponse --</option>
                            {q.suggestions.map((s, i) => (
                                <option key={i} value={s}>{s}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            placeholder="Votre réponse"
                            value={reponses[index]}
                            onChange={(e) => handleResponseChange(index, e.target.value)}
                        />
                    )}
                </div>
            ))}

            {score === null ? (
                <button
                    className="w-full bg-blue-600 text-white py-2 mt-4 rounded hover:bg-blue-700"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Soumission en cours..." : "Soumettre l'exercice"}
                </button>
            ) : (
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold">Résultat</h3>
                    <p>Score : <strong>{score.score}%</strong> ({score.bonnes} / {score.total})</p>
                    {score.score === 100 ? <FaCheck className="text-green-500 text-5xl" /> : <FaTimes className="text-red-500 text-5xl" />}
                    <button className="mt-3 bg-gray-600 text-white px-4 py-2 rounded" onClick={() => navigate("/exercices")}>
                        Retour aux exercices
                    </button>
                </div>
            )}
        </div>
    );
};

export default RealiserExercice;
