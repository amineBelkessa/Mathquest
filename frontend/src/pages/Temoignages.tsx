import React from "react";
import { motion } from "framer-motion";

interface Testimonial {
    name: string;
    role: string;
    image: string;
    comment: string;
}

const testimonials: Testimonial[] = [
    {
        name: "Sophie Martin",
        role: "Ancienne élève en 5e",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        comment: "MathQuest m’a permis de progresser en maths tout en m’amusant. Je n’ai jamais autant aimé réviser !"
    },
    {
        name: "Julien Moreau",
        role: "Parent d’élève",
        image: "https://randomuser.me/api/portraits/men/43.jpg",
        comment: "Grâce à MathQuest, je peux suivre facilement les progrès de mon fils et l’encourager à apprendre."
    },
    {
        name: "Claire Dubois",
        role: "Professeure de mathématiques",
        image: "https://randomuser.me/api/portraits/women/32.jpg",
        comment: "La plateforme est intuitive et me permet de créer des exercices adaptés à mes élèves rapidement."
    },
    {
        name: "Marc Lefèvre",
        role: "Élève de Terminale",
        image: "https://randomuser.me/api/portraits/men/55.jpg",
        comment: "Le système de classement me motive à battre mes amis ! C’est vraiment une super idée."
    },
    {
        name: "Mark Zuckerberg",
        role: "Fondateur de Meta",
        image: "https://th.bing.com/th/id/OIP.IU3ssV3yyahKhRNXvUa36AHaHa?cb=iwp2&rs=1&pid=ImgDetMain",
        comment: "J’adore l’approche gamifiée de la plateforme. Si j’avais eu ça à l’école, j’aurais sûrement codé encore plus tôt !"
    }

];

const Temoignages: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-indigo-700 text-center mb-6">Ils parlent de nous</h2>
                <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    Découvrez ce que les élèves, parents et enseignants pensent de leur expérience sur MathQuest.
                </p>

                <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-left"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{t.name}</h3>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">“{t.comment}”</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Temoignages;
