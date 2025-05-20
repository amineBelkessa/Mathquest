import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProgressionData, getSuggestionsForUser } from "../services/progression.service";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import './ProgressionPage.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface ProgressionData {
    date: string;
    score: number;
    exerciceTitre: string;
    typeExercice: string;
    niveau: string;
}

const ProgressionPage: React.FC = () => {
    const { enfantId } = useParams<{ enfantId: string }>();
    const [progressionData, setProgressionData] = useState<ProgressionData[]>([]);
    const [filteredData, setFilteredData] = useState<ProgressionData[]>([]);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [error, setError] = useState<string>("");

    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");

    const chartRef = useRef<ChartJS<'line'>>(null);

    const username = enfantId || JSON.parse(localStorage.getItem("user") || "{}")?.username || null;

    useEffect(() => {
        if (!username) {
            setError("Utilisateur non connecté.");
            return;
        }

        const chartInstance = chartRef.current;

        const fetchData = async () => {
            try {
                const data = await getProgressionData(username);
                setProgressionData(data);
                setFilteredData(data);

                const suggestionsData = await getSuggestionsForUser(username);
                setSuggestions(suggestionsData);
            } catch (err) {
                setError("Impossible de charger la progression des exercices.");
            }
        };

        fetchData();

        return () => {
            if (chartInstance) chartInstance.destroy();
        };
    }, [username]);

    const handleFilterByType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value;
        setSelectedType(type);
        filterData(type, selectedMonth);
    };

    const handleFilterByMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const month = e.target.value;
        setSelectedMonth(month);
        filterData(selectedType, month);
    };

    const filterData = (type: string, month: string) => {
        let filtered = [...progressionData];
        if (type) filtered = filtered.filter((d) => d.typeExercice === type);
        if (month) {
            filtered = filtered.filter((d) => {
                const dataMonth = new Date(d.date).getMonth() + 1;
                return dataMonth === parseInt(month);
            });
        }
        setFilteredData(filtered);
    };

    const chartData = {
        labels: filteredData.map((data) => new Date(data.date).toLocaleDateString()),
        datasets: [
            {
                label: "Score",
                data: filteredData.map((data) => data.score),
                borderColor: "#4C51BF",
                backgroundColor: "rgba(76, 81, 191, 0.2)",
                fill: true,
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-4xl font-bold text-indigo-700 text-center mb-6">📈 Suivi de progression</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Filtres */}
            <div className="filters-container mb-8 flex gap-4 justify-center">
                <select onChange={handleFilterByType} className="bg-indigo-600 text-white py-2 px-4 rounded">
                    <option value="">Filtrer par type</option>
                    <option value="arithmétique">Arithmétique</option>
                    <option value="géométrie">Géométrie</option>
                    <option value="logique">Logique</option>
                    <option value="statistiques">Statistiques</option>
                    <option value="Horaire">Horaire</option>
                </select>

                <select onChange={handleFilterByMonth} className="bg-blue-600 text-white py-2 px-4 rounded">
                    <option value="">Filtrer par mois</option>
                    {[
                        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
                        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
                    ].map((month, index) => (
                        <option key={index + 1} value={index + 1}>{month}</option>
                    ))}
                </select>
            </div>

            {/* Graphique */}
            <div className="graph-container mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Évolution des scores</h3>
                <Line data={chartData} ref={chartRef} />
            </div>

            {/* ✅ Suggestions adaptées au parent */}
            <div className="suggestions-container mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Suggestions d'exercices</h3>
                <p className="text-gray-600 mb-4">
                    Voici des exercices recommandés pour ton enfant, basés sur ses résultats récents.
                </p>

                {suggestions.length > 0 ? (
                    <ul className="space-y-4">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="border p-4 rounded bg-white shadow">
                                <p className="font-semibold text-indigo-700">{suggestion.titre}</p>
                                <p className="text-gray-600 text-sm">
                                    Type : {suggestion.typeExercice} | Niveau : {suggestion.niveau}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">Aucune suggestion disponible.</p>
                )}
            </div>

            {/* Table des performances */}
            <div className="table-container mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Performances récentes</h3>
                <table className="min-w-full table-auto border-collapse mb-8">
                    <thead>
                    <tr>
                        <th className="px-4 py-2 border-b text-left">📅 Date</th>
                        <th className="px-4 py-2 border-b text-left">📘 Type</th>
                        <th className="px-4 py-2 border-b text-left">📊 Score</th>
                        <th className="px-4 py-2 border-b text-left">🎯 Niveau</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((data, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2 border-b">{data.date}</td>
                            <td className="px-4 py-2 border-b">{data.typeExercice}</td>
                            <td className="px-4 py-2 border-b">{data.score}%</td>
                            <td className="px-4 py-2 border-b">{data.niveau}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgressionPage;
