import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ferBadge from "../assets/badges/fer.png";
import bronzeBadge from "../assets/badges/bronze.png";
import argentBadge from "../assets/badges/argent.png";
import orBadge from "../assets/badges/or.png";
import questmasterBadge from "../assets/badges/questmaster.png";

interface Eleve {
    id: string;
    username: string;
    nom: string;
    prenom: string;
    email: string;
}

interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
}

interface Submission {
    exerciceId: string;
    username: string;
    score: number;
    typeExercice?: string;
}

interface Classement {
    username: string;
    totalScore: number;
}

const getBadgeInfo = (score: number) => {
    if (score >= 3000) return { src: questmasterBadge, label: "QuestMaster" };
    if (score >= 2000) return { src: orBadge, label: "Or" };
    if (score >= 1000) return { src: argentBadge, label: "Argent" };
    if (score >= 500) return { src: bronzeBadge, label: "Bronze" };
    return { src: ferBadge, label: "Fer" };
};

const PerformanceSalon: React.FC = () => {
    const { code } = useParams();
    const [salon, setSalon] = useState<any>(null);
    const [eleves, setEleves] = useState<Eleve[]>([]);
    const [exercices, setExercices] = useState<Exercice[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [classement, setClassement] = useState<Classement[]>([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salonRes = await axios.get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/salons/${code}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSalon(salonRes.data);

                const elevesData = await Promise.all(
                    salonRes.data.elevesEmails.map((email: string) =>
                        axios
                            .get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/eleves/${email}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
                            .then(res => res.data)
                            .catch(() => null)
                    )
                );
                const filteredEleves = elevesData.filter((e): e is Eleve => e !== null);
                setEleves(filteredEleves);

                const submissionsData = await Promise.all(
                    filteredEleves.map((eleve) =>
                        axios
                            .get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/submissions/user/${eleve.username}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
                            .then(res => res.data)
                            .catch(() => [])
                    )
                );
                setSubmissions(submissionsData.flat());

                const exercicesData = await Promise.all(
                    salonRes.data.exercicesIds.map((id: string) =>
                        axios
                            .get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/exercices/${id}`, {
                                headers: { Authorization: `Bearer ${token}` },
                            })
                            .then(res => res.data)
                            .catch(() => null)
                    )
                );
                setExercices(exercicesData.filter(Boolean));

                const classementRes = await axios.get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/classement`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClassement(classementRes.data);

            } catch (error) {
                console.error("❌ Erreur chargement performances:", error);
            }
        };

        if (code && token) fetchData();
    }, [code, token]);

    const getScore = (username: string, exerciceId: string): number | null => {
        const sub = submissions.find((s) => s.username === username && s.exerciceId === exerciceId);
        return sub ? sub.score : null;
    };

    const getClassementInfo = (username: string) => {
        return classement.find(c => c.username === username);
    };

    const getMeilleureCategorie = (username: string): string => {
        const userSubs = submissions.filter(s => s.username === username);
        const grouped: Record<string, number[]> = {};
        userSubs.forEach(s => {
            const key = s.typeExercice || "Autre";
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(s.score);
        });
        const best = Object.entries(grouped)
            .map(([type, scores]) => ({ type, avg: scores.reduce((a, b) => a + b, 0) / scores.length }))
            .sort((a, b) => b.avg - a.avg)[0];
        return best?.type || "-";
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded shadow space-y-6">
            <h2 className="text-3xl font-bold text-center text-indigo-700 flex items-center justify-center gap-2">
                📊 Performances - <span className="text-purple-600">{salon?.nom}</span>
            </h2>

            <table className="w-full table-auto border border-gray-300 mt-4 text-sm">
                <thead className="bg-gray-100 text-black">
                <tr>
                    <th className="border px-3 py-2">👤 Élève</th>
                    {exercices.map((ex) => (
                        <th key={ex.id} className="border px-3 py-2">📘 {ex.titre}</th>
                    ))}
                    <th className="border px-3 py-2">📈 Moyenne</th>
                    <th className="border px-3 py-2">🏆 Classement</th>
                    <th className="border px-3 py-2">🔥 Catégorie</th>
                    <th className="border px-3 py-2">🎖️ Badge</th>
                </tr>
                </thead>
                <tbody>
                {eleves.map((eleve, index) => {
                    const scores = exercices.map((ex) => getScore(eleve.username, ex.id));
                    const validScores = scores.filter((s): s is number => s !== null);
                    const moyenne = validScores.length > 0
                        ? validScores.reduce((a, b) => a + b, 0) / validScores.length
                        : null;
                    const classementInfo = getClassementInfo(eleve.username);
                    const meilleureCategorie = getMeilleureCategorie(eleve.username);
                    const totalScore = classementInfo?.totalScore || 0;
                    const badge = getBadgeInfo(totalScore);

                    return (
                        <tr
                            key={eleve.username}
                            className={`text-center ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                        >
                            <td className="border px-3 py-2 font-semibold text-black">
                                {eleve.username}
                            </td>
                            {scores.map((s, i) => (
                                <td key={i} className="border px-3 py-2">{s !== null ? `${s}%` : "–"}</td>
                            ))}
                            <td className="border px-3 py-2 font-bold text-green-600">
                                {moyenne !== null ? `${Math.round(moyenne)}%` : "–"}
                            </td>
                            <td className="border px-3 py-2 text-indigo-700">
                                {classementInfo
                                    ? `${classementInfo.totalScore} pts (#${classement.indexOf(classementInfo) + 1})`
                                    : "–"}
                            </td>
                            <td className="border px-3 py-2 text-orange-500">{meilleureCategorie}</td>
                            <td className="border px-3 py-2">
                                <img
                                    src={badge.src}
                                    alt={badge.label}
                                    title={`${badge.label} - ${totalScore} pts`}
                                    className="w-6 h-6 mx-auto"
                                />
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
