import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Eleve {
    username: string;
    nom: string;
    prenom: string;
}

interface Exercice {
    id: string;
    titre: string;
}

interface Submission {
    exerciceId: string;
    username: string;
    score: number;
}

interface Salon {
    nom: string;
    code: string;
    elevesEmails: string[];
    exercicesIds: string[];
}

const PerformanceSalon: React.FC = () => {
    const { code } = useParams();
    const [salon, setSalon] = useState<Salon | null>(null);
    const [eleves, setEleves] = useState<Eleve[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resSalon = await axios.get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/salons/${code}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSalon(resSalon.data);

                const elevesData = await Promise.all(
                    resSalon.data.elevesEmails.map((email: string) =>
                        axios
                            .get(`http://srv-dpi-proj-mathquest-prod.univ-rouen.fr/api/eleves/${email}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((res) => res.data)
                    )
                );
                setEleves(elevesData);

                const allSubmissions = await Promise.all(
                    resSalon.data.elevesEmails.map((email: string) =>
                        axios
                            .get(`http://srv-dpi-proj-mathquest-prod.univ-rouen.fr/api/submissions/user/${email}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((res) => res.data)
                    )
                );
                setSubmissions(allSubmissions.flat());

                const exs = await Promise.all(
                    resSalon.data.exercicesIds.map((id: string) =>
                        axios
                            .get(`http://srv-dpi-proj-mathquest-prod.univ-rouen.fr/api/exercices/${id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
                            .then((res) => res.data)
                    )
                );
                setExercices(exs);
            } catch (err) {
                console.error("Erreur lors du chargement des données :", err);
            }
        };

        if (code && token) fetchData();
    }, [code, token]); // ✅ correction ici

    const getScore = (username: string, exerciceId: string): number | null => {
        const sub = submissions.find((s) => s.username === username && s.exerciceId === exerciceId);
        return sub ? sub.score : null;
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
            <h2 className="text-2xl font-bold text-center">📊 Performances - {salon?.nom}</h2>

            <table className="w-full mt-4 table-auto border border-gray-300">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border px-4 py-2">Élève</th>
                    {exercices.map((ex) => (
                        <th key={ex.id} className="border px-4 py-2">
                            {ex.titre}
                        </th>
                    ))}
                    <th className="border px-4 py-2">Moyenne</th>
                </tr>
                </thead>
                <tbody>
                {eleves.map((eleve) => {
                    const scores = exercices.map((ex) => getScore(eleve.username, ex.id));
                    const validScores = scores.filter((s): s is number => s !== null);
                    const moyenne =
                        validScores.length > 0
                            ? validScores.reduce((a, b) => a + b, 0) / validScores.length
                            : 0;

                    const aFaitAuMoinsUn = validScores.length > 0;

                    return (
                        <tr
                            key={eleve.username}
                            className={`text-center ${!aFaitAuMoinsUn ? "bg-yellow-100" : ""}`}
                        >
                            <td className="border px-4 py-2 font-medium">
                                {eleve.prenom} {eleve.nom}
                                {!aFaitAuMoinsUn && (
                                    <span className="text-sm text-red-600 ml-2">
                                            (aucune soumission)
                                        </span>
                                )}
                            </td>
                            {scores.map((score, idx) => (
                                <td key={idx} className="border px-4 py-2">
                                    {score !== null ? `${score}%` : "–"}
                                </td>
                            ))}
                            <td className="border px-4 py-2 font-semibold">
                                {aFaitAuMoinsUn ? `${Math.round(moyenne)}%` : "–"}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default PerformanceSalon;
