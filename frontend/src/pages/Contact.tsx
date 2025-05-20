import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
            duration: 0.6,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const Contact: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <motion.div
                className="max-w-4xl mx-auto text-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h1 className="text-4xl font-extrabold text-indigo-700 mb-6" variants={itemVariants}>
                    Contactez-nous
                </motion.h1>
                <motion.p className="text-gray-600 text-lg mb-12" variants={itemVariants}>
                    Une question, une suggestion ou juste envie de dire bonjour ? On est là pour vous !
                </motion.p>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                        <div className="text-indigo-600 mb-4">
                            <FaEnvelope size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Email</h3>
                        <p className="text-gray-600">contact@mathquest.fr</p>
                    </motion.div>

                    <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                        <div className="text-green-600 mb-4">
                            <FaPhoneAlt size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Téléphone</h3>
                        <p className="text-gray-600">+33 1 23 45 67 89</p>
                    </motion.div>

                    <motion.div className="bg-white p-6 rounded-xl shadow-md" variants={itemVariants}>
                        <div className="text-pink-600 mb-4">
                            <FaMapMarkerAlt size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Adresse</h3>
                        <p className="text-gray-600">42 rue de l'Éducation, 75000 Paris, France</p>
                    </motion.div>
                </div>

            </motion.div>
        </div>
    );
};

export default Contact;
