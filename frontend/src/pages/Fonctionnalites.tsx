import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaUsers, FaChartLine, FaTrophy } from "react-icons/fa";
import { motion } from "framer-motion";

const Fonctionnalites: React.FC = () => {
    const features = [
        {
            icon: <FaUserGraduate size={28} className="text-white" />,
            color: "bg-indigo-600",
            title: "Parcours personnalisé",
            desc: "Chaque élève suit un parcours adapté à son niveau et à son rythme, pour progresser efficacement."
        },
        {
            icon: <FaChalkboardTeacher size={28} className="text-white" />,
            color: "bg-green-600",
            title: "Suivi enseignant",
            desc: "Les enseignants créent des exercices, suivent les résultats et adaptent leurs stratégies pédagogiques."
        },
        {
            icon: <FaUsers size={28} className="text-white" />,
            color: "bg-blue-600",
            title: "Salons collaboratifs",
            desc: "Les élèves rejoignent des salons pour participer à des défis collectifs ou travailler en équipe."
        },
        {
            icon: <FaChartLine size={28} className="text-white" />,
            color: "bg-pink-600",
            title: "Statistiques avancées",
            desc: "Les parents et enseignants accèdent à des statistiques détaillées pour mesurer les progrès."
        },
        {
            icon: <FaTrophy size={28} className="text-white" />,
            color: "bg-yellow-500",
            title: "Gamification",
            desc: "Des badges, des classements et des récompenses motivent les élèves à se dépasser."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 text-center mb-6">
                    Fonctionnalités principales
                </h1>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                    MathQuest propose une panoplie de fonctionnalités modernes pour engager élèves, enseignants et parents dans un apprentissage dynamique.
                </p>

                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all text-center"
                        >
                            <div className={`w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center ${f.color} shadow-md`}>
                                {f.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">{f.title}</h3>
                            <p className="text-gray-600 text-sm">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Fonctionnalites;
