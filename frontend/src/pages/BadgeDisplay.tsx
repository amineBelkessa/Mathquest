// src/components/BadgeDisplay.tsx
import React from "react";
import ferBadge from "../assets/badges/fer.png";
import bronzeBadge from "../assets/badges/bronze.png";
import argentBadge from "../assets/badges/argent.png";
import orBadge from "../assets/badges/or.png";
import questmasterBadge from "../assets/badges/questmaster.png";

export function getBadge(score: number) {
    if (score >= 3000) return { src: questmasterBadge, label: "QuestMaster" };
    if (score >= 2000) return { src: orBadge, label: "Or" };
    if (score >= 1000) return { src: argentBadge, label: "Argent" };
    if (score >= 500) return { src: bronzeBadge, label: "Bronze" };
    return { src: ferBadge, label: "Fer" };
}

const BadgeDisplay: React.FC<{ score: number }> = ({ score }) => {
    const badge = getBadge(score);
    return (
        <div className="text-center">
            <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 rounded-full p-1 shadow-xl mx-auto">
                <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
                    <img src={badge.src} alt={badge.label} className="w-12 h-12 object-contain" />
                </div>
            </div>
            <h2 className="text-md font-bold mt-2 text-indigo-700">{badge.label}</h2>
            <p className="text-sm text-gray-600">Score : {score}</p>
        </div>
    );
};

export default BadgeDisplay;
