import React, { useState } from "react";
import { register } from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser, faEnvelope, faLock, faEye, faEyeSlash,
    faGraduationCap, faUserTie, faChalkboardTeacher, faShieldAlt
} from "@fortawesome/free-solid-svg-icons";
import "../Auth/Register.css";

const CreerCompteAdmin: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("eleve");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(username, email, password, role);
            setMessage(`✅ Compte ${role} créé avec succès !`);
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (err) {
            setMessage("❌ Erreur lors de la création du compte.");
        }
    };

    return (
        <div className="register-page flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 text-white">
            <div className="register-box bg-white text-black p-10 rounded-2xl shadow-2xl w-96 flex flex-col items-center">
                <h2 className="text-3xl font-extrabold mb-6 text-indigo-700">➕ Créer un nouveau compte</h2>
                {message && <p className={`mb-4 ${message.startsWith("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="relative">
                        <FontAwesomeIcon icon={faUser} className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="relative">
                        <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className="select-container">
                        <label htmlFor="role">🎯 Sélectionnez le rôle</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="eleve">🎓 Élève</option>
                            <option value="parent">👪 Parent</option>
                            <option value="enseignant">👨‍🏫 Enseignant</option>
                            <option value="admin">🛠️ Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800 transition">
                        Créer le compte ✅
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreerCompteAdmin;
