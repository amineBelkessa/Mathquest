import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciceById, soumettreExercice } from "../services/exercice.service";
import { FaCheckCircle, FaTimesCircle, FaFilePdf } from "react-icons/fa";

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
                const data = await getExerciceById(id!);
                if (!data) throw new Error("Exercice non trouvé");
                setExercice(data);
                setReponses(new Array(data.questions.length).fill(""));
            } catch (err) {
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
        } catch {
            setError("Erreur lors de la soumission de l'exercice.");
        }
        setIsSubmitting(false);
    };

    if (error) {
        return (
            <div className="flex flex-col items-center mt-10 text-center">
                <div className="bg-red-500 text-white px-6 py-4 rounded-lg">{error}</div>
                <button onClick={() => navigate("/consulter-exercices")} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
                    Retour aux exercices
                </button>
            </div>
        );
    }

    if (!exercice) return <p className="text-center mt-10">Chargement de l'exercice...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10 mb-10">
            <h2 className="text-3xl font-extrabold text-indigo-700 text-center mb-2">{exercice.titre}</h2>
            <p className="text-gray-600 text-center mb-4">
                <strong>Type:</strong> {exercice.typeExercice} | <strong>Niveau:</strong> {exercice.niveau}
            </p>

            {exercice.description && (
                <p className="text-gray-500 text-center mb-4 italic">{exercice.description}</p>
            )}

            {exercice.pdfPath && (
                <div className="text-center mb-6">
                    <a href={exercice.pdfPath} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-red-500 hover:underline">
                        <FaFilePdf /> Télécharger l'exercice en PDF
                    </a>
                </div>
            )}

            <div className="space-y-6">
                {exercice.questions.map((q, index) => (
                    <div key={index} className="p-5 border rounded-xl bg-gray-50">
                        <p className="font-semibold mb-2"><strong>Question {index + 1} :</strong> {q.question}</p>
                        {q.formatQuestion === "QCM" ? (
                            <select
                                className="w-full p-2 border rounded-lg"
                                value={reponses[index]}
                                onChange={(e) => handleResponseChange(index, e.target.value)}
                                disabled={score !== null}
                            >
                                <option value="">-- Sélectionnez une réponse --</option>
                                {q.suggestions.map((s, i) => (
                                    <option key={i} value={s}>{s}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type="text"
                                className="w-full p-2 border rounded-lg"
                                placeholder="Votre réponse"
                                value={reponses[index]}
                                onChange={(e) => handleResponseChange(index, e.target.value)}
                                disabled={score !== null}
                            />
                        )}

                        {/* ✅ Affichage de la correction après soumission */}
                        {score !== null && (
                            <div className="mt-2 flex items-center gap-2 text-sm">
                                {reponses[index] === q.reponseCorrecte ? (
                                    <>
                                        <FaCheckCircle className="text-green-500" />
                                        <span className="text-green-700 font-medium">Bonne réponse !</span>
                                    </>
                                ) : (
                                    <>
                                        <FaTimesCircle className="text-red-500" />
                                        <span className="text-red-700">
                                            Mauvaise réponse. Correction :{" "}
                                            <span className="font-semibold">{q.reponseCorrecte}</span>
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {score === null ? (
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
                >
                    {isSubmitting ? "Soumission en cours..." : "Soumettre l'exercice"}
                </button>
            ) : (
                <div className="text-center mt-8">
                    <h3 className="text-2xl font-bold text-gray-800">🎉 Résultat</h3>
                    <p className="text-lg mt-2">
                        Score : <span className="font-bold">{score.score}%</span> ({score.bonnes} bonnes réponses sur {score.total})
                    </p>
                    {score.score === 100 ? (
                        <FaCheckCircle className="text-green-500 text-5xl mx-auto mt-4" />
                    ) : (
                        <FaTimesCircle className="text-red-500 text-5xl mx-auto mt-4" />
                    )}
                    <button
                        className="mt-6 bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
                        onClick={() => navigate("/consulter-exercices")}
                    >
                        Retour aux exercices
                    </button>
                </div>
            )}
        </div>
    );
};

export default RealiserExercice;
