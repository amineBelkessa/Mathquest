import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExerciceWithPdf } from "../services/exercice.service";

interface Question {
    formatQuestion: string;
    question: string;
    suggestions: string[];
    reponseCorrecte: string;
}

const CreerExercice: React.FC = () => {
    const [titre, setTitre] = useState("");
    const [typeExercice, setTypeExercice] = useState("");
    const [customType, setCustomType] = useState("");
    const [showCustomType, setShowCustomType] = useState(false);

    const [niveau, setNiveau] = useState("");
    const [customNiveau, setCustomNiveau] = useState("");
    const [showCustomNiveau, setShowCustomNiveau] = useState(false);

    const [description, setDescription] = useState("");
    const [tempsEstime, setTempsEstime] = useState("");
    const [lienDetaille, setLienDetaille] = useState("");

    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [previewMode, setPreviewMode] = useState(false);

    const navigate = useNavigate();

    const TYPE_OPTIONS = ["arithmétique", "géométrie", "probabilités"];

    const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setShowCustomType(val === "AUTRE");
        setTypeExercice(val !== "AUTRE" ? val : "");
    };

    const handleNiveauSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setShowCustomNiveau(val === "AUTRE");
        setNiveau(val !== "AUTRE" ? val : "");
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPdfFile(e.target.files[0]);
        } else {
            setPdfFile(null);
        }
    };

    const handleAddQuestion = () => {
        setQuestions([...questions, { formatQuestion: "QCM", question: "", suggestions: [], reponseCorrecte: "" }]);
    };

    const handleRemoveQuestion = (index: number) => {
        const updated = [...questions];
        updated.splice(index, 1);
        setQuestions(updated);
    };

    const handleQuestionChange = (i: number, field: keyof Question, value: string) => {
        const updated = [...questions];
        if (field === "suggestions") {
            updated[i].suggestions = value.split(",").map((s) => s.trim());
        } else {
            updated[i][field] = value;
        }
        setQuestions(updated);
    };

    const validateForm = (type: string, niveau: string): string | null => {
        if (!titre.trim()) return "Le titre est obligatoire.";
        if (!type) return "Le type d'exercice est obligatoire.";
        if (!niveau) return "Le niveau est obligatoire.";
        if (!tempsEstime.trim()) return "Le temps estimé est obligatoire.";
        if (questions.length < 1) return "Ajoutez au moins une question.";

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.question.trim()) return `La question ${i + 1} est vide.`;
            if (!q.reponseCorrecte.trim()) return `La réponse correcte de la question ${i + 1} est vide.`;
            if (q.formatQuestion === "QCM" && !q.suggestions.includes(q.reponseCorrecte)) {
                return `La réponse correcte de la question ${i + 1} n'est pas dans les suggestions.`;
            }
        }

        return null;
    };

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault();
        const type = showCustomType ? customType.trim() : typeExercice.trim();
        const niv = showCustomNiveau ? customNiveau.trim() : niveau.trim();

        const err = validateForm(type, niv);
        if (err) {
            setError(err);
            setPreviewMode(false);
        } else {
            setError("");
            setPreviewMode(true);
        }
    };

    const handleFinalSubmit = async () => {
        const type = showCustomType ? customType.trim() : typeExercice.trim();
        const niv = showCustomNiveau ? customNiveau.trim() : niveau.trim();

        try {
            await createExerciceWithPdf({
                titre,
                typeExercice: type,
                niveau: niv,
                description,
                tempsEstime: parseInt(tempsEstime),
                questions,
            }, pdfFile || undefined);

            setSuccess("Exercice créé avec succès !");
            setTimeout(() => navigate("/enseignant/dashboard"), 2000);
        } catch (err) {
            setError("Erreur : " + (err as Error).message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-12 px-6 mb-24">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6">📝 Créer un Exercice</h2>

            {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
            {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4">{success}</div>}

            {!previewMode ? (
                <form onSubmit={handlePreview} className="space-y-6">
                    {/* Titre */}
                    <div>
                        <label className="block font-medium mb-1">Titre</label>
                        <input type="text" value={titre} onChange={(e) => setTitre(e.target.value)} className="w-full border px-4 py-2 rounded" />
                    </div>

                    {/* Type / Niveau */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1">Type</label>
                            <select value={showCustomType ? "AUTRE" : typeExercice} onChange={handleTypeSelect} className="w-full border px-4 py-2 rounded">
                                <option value="">-- Choisir --</option>
                                {TYPE_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                                <option value="AUTRE">Autre</option>
                            </select>
                            {showCustomType && (
                                <input placeholder="Nouveau type" value={customType} onChange={(e) => setCustomType(e.target.value)} className="w-full border mt-2 px-4 py-2 rounded" />
                            )}
                        </div>
                        <div>
                            <label className="block mb-1">Niveau</label>
                            <select value={showCustomNiveau ? "AUTRE" : niveau} onChange={handleNiveauSelect} className="w-full border px-4 py-2 rounded">
                                <option value="">-- Choisir --</option>
                                <optgroup label="École primaire">
                                    <option value="CP">CP</option>
                                    <option value="CE1">CE1</option>
                                    <option value="CE2">CE2</option>
                                    <option value="CM1">CM1</option>
                                    <option value="CM2">CM2</option>
                                </optgroup>
                                <optgroup label="Collège">
                                    <option value="6e">6e</option>
                                    <option value="5e">5e</option>
                                    <option value="4e">4e</option>
                                    <option value="3e">3e</option>
                                </optgroup>
                                <optgroup label="Lycée">
                                    <option value="2nde">2nde</option>
                                    <option value="1re">1re</option>
                                    <option value="Terminale">Terminale</option>
                                </optgroup>
                                <option value="AUTRE">Autre</option>
                            </select>
                            {showCustomNiveau && (
                                <input placeholder="Niveau personnalisé" value={customNiveau} onChange={(e) => setCustomNiveau(e.target.value)} className="w-full border mt-2 px-4 py-2 rounded" />
                            )}
                        </div>
                    </div>

                    {/* Description, Temps, Lien */}
                    <div>
                        <label className="block mb-1">Description</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-4 py-2 rounded" rows={3} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input type="number" placeholder="Temps estimé (en minutes)" value={tempsEstime} onChange={(e) => setTempsEstime(e.target.value)} className="border px-4 py-2 rounded w-full" />
                        <input type="url" placeholder="Lien détaillé (optionnel)" value={lienDetaille} onChange={(e) => setLienDetaille(e.target.value)} className="border px-4 py-2 rounded w-full" />
                    </div>

                    {/* PDF */}
                    <div>
                        <label className="block font-medium mb-1">PDF (optionnel)</label>
                        <input type="file" accept="application/pdf" onChange={handlePdfChange} />
                    </div>

                    {/* Questions */}
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-semibold text-gray-700">Questions</h3>
                            <button type="button" onClick={handleAddQuestion} className="bg-blue-500 text-white px-4 py-2 rounded">+ Ajouter</button>
                        </div>

                        {questions.map((q, i) => (
                            <div key={i} className="border rounded p-4 mb-4 space-y-2">
                                <select value={q.formatQuestion} onChange={(e) => handleQuestionChange(i, "formatQuestion", e.target.value)} className="w-full border px-3 py-2 rounded">
                                    <option value="">-- Format --</option>
                                    <option value="QCM">QCM</option>
                                    <option value="TEXTE">Réponse texte</option>
                                </select>
                                <input placeholder={`Question ${i + 1}`} value={q.question} onChange={(e) => handleQuestionChange(i, "question", e.target.value)} className="w-full border px-3 py-2 rounded" />
                                <input placeholder="Suggestions (séparées par virgule)" onChange={(e) => handleQuestionChange(i, "suggestions", e.target.value)} className="w-full border px-3 py-2 rounded" />
                                <input placeholder="Réponse correcte" value={q.reponseCorrecte} onChange={(e) => handleQuestionChange(i, "reponseCorrecte", e.target.value)} className="w-full border px-3 py-2 rounded" />
                                <button type="button" onClick={() => handleRemoveQuestion(i)} className="text-sm text-red-600 mt-1">🗑 Supprimer</button>
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                        Aperçu & Valider
                    </button>
                </form>
            ) : (
                <div className="bg-gray-100 p-6 rounded shadow">
                    <h3 className="text-2xl font-bold mb-4">Aperçu de l’exercice</h3>
                    <p><strong>Titre :</strong> {titre}</p>
                    <p><strong>Type :</strong> {showCustomType ? customType : typeExercice}</p>
                    <p><strong>Niveau :</strong> {showCustomNiveau ? customNiveau : niveau}</p>
                    <p><strong>Description :</strong> {description}</p>
                    <p><strong>Temps estimé :</strong> {tempsEstime} min</p>
                    <p><strong>PDF :</strong> {pdfFile?.name || "Aucun"}</p>
                    <ul className="list-disc pl-6 mt-2">
                        {questions.map((q, idx) => (
                            <li key={idx}>
                                <strong>Q{idx + 1}:</strong> {q.question} ({q.formatQuestion}) – Rép. correcte: {q.reponseCorrecte}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex gap-4">
                        <button onClick={() => setPreviewMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Modifier</button>
                        <button onClick={handleFinalSubmit} className="bg-green-600 text-white px-6 py-2 rounded">Valider & Créer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreerExercice;
