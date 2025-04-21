// src/types.ts

export interface Question {
    _id?: string;
    formatQuestion: string;
    question: string;
    suggestions: string[];
    reponseCorrecte: string;
}

export interface Exercice {
    id: string;
    titre: string;
    typeExercice: string;
    niveau: string;
    description?: string;
    tempsEstime?: number;
    questions: Question[];
    pdfPath?: string;
    lienDetaille?: string;
}
