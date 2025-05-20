import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

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
    const [error, setError] = useState<string>("");
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);

    const chartRef = useRef<ChartJS<'line'>>(null);
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const username = enfantId || user?.username || null;

    useEffect(() => {
        if (!username) {
            setError("Utilisateur non connecté.");
            return;
        }

        const chartInstance = chartRef.current; // ✅ FIX: copy ref value here

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
            if (chartInstance) {
                chartInstance.destroy(); // ✅ FIX: use local ref variable
            }
        };
    }, [username]);

    const handleFilterByType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const type = event.target.value;
        setSelectedType(type);
        filterData(type, selectedMonth);
    };

    const handleFilterByMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const month = event.target.value;
        setSelectedMonth(month);
        filterData(selectedType, month);
    };

    const filterData = (type: string, month: string) => {
        let filtered = [...progressionData];
        if (type) {
            filtered = filtered.filter((data) => data.typeExercice === type);
        }
        if (month) {
            filtered = filtered.filter((data) => {
                const dataMonth = new Date(data.date).getMonth() + 1;
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
            <h2 className="text-4xl font-bold text-indigo-700 text-center mb-6">📈 Ma Progression</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Filtres */}
            <div className="filters-container mb-8 flex gap-4 justify-center">
                <select onChange={handleFilterByType} className="bg-indigo-600 text-white py-2 px-4 rounded">
                    <option value="">Sélectionner Type d'exercice</option>
                    <option value="arithmétique">Arithmétique</option>
                    <option value="géométrie">Géométrie</option>
                    <option value="logique">Logique</option>
                    <option value="statistiques">Statistiques</option>
                    <option value="Horaire">Horaire</option>
                </select>

                <select onChange={handleFilterByMonth} className="bg-blue-600 text-white py-2 px-4 rounded">
                    <option value="">Sélectionner Mois</option>
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

            {/* Suggestions */}
            <div className="suggestions-container mb-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Suggestions d'exercices</h3>
                <p className="text-gray-600 mb-4">
                    Voici quelques exercices recommandés pour améliorer vos compétences en fonction de vos résultats récents.
                </p>

                {suggestions.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-4">
                        {suggestions.map((suggestion, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{suggestion.titre} - {suggestion.typeExercice}</span>
                                <Link
                                    to={`/realiser-exercice/${suggestion.id}`}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-4"
                                >
                                    Réaliser l'exercice
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-gray-600">
                        <p>Aucune suggestion disponible.</p>
                        <Link to="/consulter-exercices" className="text-blue-600 underline block mt-2">
                            Voir tous les exercices
                        </Link>
                    </div>
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
