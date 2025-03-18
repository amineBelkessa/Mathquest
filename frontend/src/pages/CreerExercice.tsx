import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExerciceWithPdf } from "../services/exercice.service";

// 🔹 Définition des types
interface Question {
    formatQuestion: string;
    question: string;
    suggestions: string[];
    reponseCorrecte: string;
}

const CreerExercice: React.FC = () => {
    const [titre, setTitre] = useState<string>("");
    const [typeExercice, setTypeExercice] = useState<string>("");
    const [customType, setCustomType] = useState<string>("");
    const [showCustomType, setShowCustomType] = useState<boolean>(false);

    const [niveau, setNiveau] = useState<string>("");
    const [customNiveau, setCustomNiveau] = useState<string>("");
    const [showCustomNiveau, setShowCustomNiveau] = useState<boolean>(false);

    const [description, setDescription] = useState<string>("");
    const [tempsEstime, setTempsEstime] = useState<string>("");

    const [lienDetaille, setLienDetaille] = useState<string>("");

    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [pdfFileUrl, setPdfFileUrl] = useState<string | null>(null);

    const [questions, setQuestions] = useState<Question[]>([]);

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const [previewMode, setPreviewMode] = useState<boolean>(false);
    const navigate = useNavigate();

    const TYPE_OPTIONS = ["arithmétique", "géométrie", "probabilités"];
    const NIVEAU_OPTIONS = ["débutant", "intermédiaire", "avancé"];

    // 🔹 Ajouter une question
    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { formatQuestion: "", question: "", suggestions: [], reponseCorrecte: "" }
        ]);
    };

    // 🔹 Supprimer une question
    const handleRemoveQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    // 🔹 Modifier une question
    const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
        const newQuestions = [...questions];
        if (field === "suggestions") {
            newQuestions[index].suggestions = value.split(",").map(s => s.trim());
        } else {
            newQuestions[index][field] = value;
        }
        setQuestions(newQuestions);
    };

    // 🔹 Sélection du type d'exercice
    const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === "AUTRE") {
            setShowCustomType(true);
            setTypeExercice("");
        } else {
            setShowCustomType(false);
            setTypeExercice(val);
        }
    };

    // 🔹 Sélection du niveau
    const handleNiveauSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (val === "AUTRE") {
            setShowCustomNiveau(true);
            setNiveau("");
        } else {
            setShowCustomNiveau(false);
            setNiveau(val);
        }
    };

    // 🔹 Sélection du fichier PDF
    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPdfFile(file);
            const localUrl = URL.createObjectURL(file);
            setPdfFileUrl(localUrl);
        } else {
            setPdfFile(null);
            setPdfFileUrl(null);
        }
    };

    // 🔹 Validation du formulaire
    const validateForm = (finalType: string, finalNiveau: string): string | null => {
        if (!titre.trim()) return "Le titre est obligatoire.";
        if (!finalType) return "Le type d'exercice est obligatoire.";
        if (!finalNiveau) return "Le niveau est obligatoire.";
        if (!tempsEstime.toString().trim()) return "Le temps estimé est obligatoire.";
        if (questions.length < 1) return "Vous devez ajouter au moins une question.";

        for (let i = 0; i < questions.length; i++) {
            const q = questions[i];
            if (!q.question.trim()) return `La question n°${i + 1} est obligatoire.`;
            if (q.formatQuestion === "QCM") {
                if (!q.suggestions.length) return `La question n°${i + 1} doit avoir des suggestions.`;
                if (!q.suggestions.includes(q.reponseCorrecte.trim())) {
                    return `La réponse correcte de la question n°${i + 1} doit être dans les suggestions.`;
                }
            }
        }
        return null;
    };

    // 🔹 Soumettre l'exercice
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const finalType = showCustomType && customType ? customType.trim() : typeExercice.trim();
        const finalNiveau = showCustomNiveau && customNiveau ? customNiveau.trim() : niveau.trim();

        const errorMessage = validateForm(finalType, finalNiveau);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        const exerciceData = {
            titre: titre.trim(),
            typeExercice: finalType,
            niveau: finalNiveau,
            description,
            tempsEstime: parseInt(tempsEstime, 10),
            lienDetaille: lienDetaille.trim() || null,
            questions
        };

        try {
            await createExerciceWithPdf(exerciceData, pdfFile ?? undefined);
            setSuccess("Exercice créé avec succès !");
            setTimeout(() => navigate("/exercices"), 2000);
        } catch (err) {
            setError("Erreur lors de la création : " + (err as Error).message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Créer un Exercice</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                <select onChange={handleTypeSelect} value={showCustomType ? "AUTRE" : typeExercice}>
                    <option value="">-- Choisir --</option>
                    {TYPE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    <option value="AUTRE">Autre ...</option>
                </select>
                {showCustomType && <input type="text" placeholder="Nouveau type" value={customType} onChange={(e) => setCustomType(e.target.value)} />}

                <select onChange={handleNiveauSelect} value={showCustomNiveau ? "AUTRE" : niveau}>
                    <option value="">-- Choisir --</option>
                    {NIVEAU_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    <option value="AUTRE">Autre ...</option>
                </select>
                {showCustomNiveau && <input type="text" placeholder="Nouveau niveau" value={customNiveau} onChange={(e) => setCustomNiveau(e.target.value)} />}

                <button type="button" onClick={handleAddQuestion}>+ Ajouter une question</button>

                {questions.map((q, i) => (
                    <div key={i}>
                        <input type="text" placeholder="Question" value={q.question} onChange={(e) => handleQuestionChange(i, "question", e.target.value)} />
                        <button onClick={() => handleRemoveQuestion(i)}>Supprimer</button>
                    </div>
                ))}

                <button type="submit">Créer</button>
            </form>
        </div>
    );
};

export default CreerExercice;
