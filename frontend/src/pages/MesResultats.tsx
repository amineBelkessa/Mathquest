import React, { useEffect, useState } from "react";
import axios from "axios";

interface SubmissionResult {
    exerciceTitre: string;
    score: number;
    dateSoumission: string;
    reponsesCorrectes: boolean[];
    reponsesUtilisateur: string[];
    reponsesCorrectesTextuelles: string[];
}

const MesResultats: React.FC = () => {
    const [groupedResults, setGroupedResults] = useState<
        Record<string, { tentatives: number; soumissions: SubmissionResult[] }>
    >({});
    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
            setError("Vous devez être connecté pour voir vos résultats.");
            return;
        }

        const user = JSON.parse(storedUser);
        if (user.role !== "eleve") {
            setError("Seuls les élèves peuvent accéder à leurs résultats.");
            return;
        }

        axios
            .get(`http://srv-dpi-proj-mathquest-test.univ-rouen.fr/api/submissions/results/${user.username}`)
            .then((res) => {
                const rawResults: SubmissionResult[] = res.data;

                const grouped: Record<string, { tentatives: number; soumissions: SubmissionResult[] }> = {};

                rawResults.forEach((sub) => {
                    if (!grouped[sub.exerciceTitre]) {
                        grouped[sub.exerciceTitre] = { tentatives: 0, soumissions: [] };
                    }
                    grouped[sub.exerciceTitre].soumissions.push(sub);
                    grouped[sub.exerciceTitre].tentatives += 1;
                });

                setGroupedResults(grouped);
            })
            .catch(() => setError("Erreur lors de la récupération des résultats."));
    }, []);

    const toggleDetail = (key: string) => {
        setSelectedIndex(selectedIndex === key ? null : key);
    };

    if (error) {
        return <div className="text-center text-red-500 mt-10">{error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto mt-12 mb-24 px-6">
            <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
                📊 Mes Résultats d'Exercices
            </h2>

            {Object.keys(groupedResults).length === 0 ? (
                <p className="text-center text-gray-500">Aucune soumission trouvée.</p>
            ) : (
                Object.entries(groupedResults).map(([titre, data]) => (
                    <div key={titre} className="mb-14">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-purple-700">{titre}</h3>
                            <span className="text-xs bg-purple-200 text-purple-800 font-medium px-3 py-1 rounded-full">
                                🌀 {data.tentatives} tentative{data.tentatives > 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {data.soumissions.map((res, idx) => {
                                const uniqueKey = `${titre}-${idx}`;
                                return (
                                    <div
                                        key={uniqueKey}
                                        onClick={() => toggleDetail(uniqueKey)}
                                        className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">
                                                🕒 {new Date(res.dateSoumission).toLocaleString()}
                                            </span>
                                            <span
                                                className={`text-sm font-bold px-3 py-1 rounded-full ${
                                                    res.score >= 60
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                🎯 {res.score}%
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                                Résultats par question :
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {res.reponsesCorrectes.map((correct, i) => (
                                                    <span
                                                        key={i}
                                                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                            correct
                                                                ? "bg-green-200 text-green-800"
                                                                : "bg-red-200 text-red-800"
                                                        }`}
                                                    >
                                                        Q{i + 1}: {correct ? "✅" : "❌"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {selectedIndex === uniqueKey && (
                                            <div className="mt-5 border-t pt-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                                    📥 Réponses soumises :
                                                </h4>
                                                <ul className="space-y-2 text-sm">
                                                    {res.reponsesUtilisateur.map((rep, i) => (
                                                        <li key={i}>
                                                            <span className="font-medium text-gray-800">
                                                                Q{i + 1}:
                                                            </span>{" "}
                                                            « {rep} »
                                                            {!res.reponsesCorrectes[i] &&
                                                                res.reponsesCorrectesTextuelles &&
                                                                res.reponsesCorrectesTextuelles[i] && (
                                                                    <span className="text-gray-500 italic ml-2">
                                                                        → Correction : {res.reponsesCorrectesTextuelles[i]}
                                                                    </span>
                                                                )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MesResultats;
