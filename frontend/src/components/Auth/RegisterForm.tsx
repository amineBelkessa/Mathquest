import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service.ts"; // ✅ Suppression du `.ts`
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faChalkboardTeacher, faGraduationCap, faUserTie } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("eleve");
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = await register(username, email, password, role);
            localStorage.setItem("token", token);
            console.log("Inscription réussie, token =", token);
            navigate("/dashboard");
        } catch (err) {
            setError("Inscription échouée. Veuillez réessayer.");
        }
    };

    return (
        <div className="register-page flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 text-white">
            <div className="register-box bg-white text-black p-10 rounded-2xl shadow-2xl w-96 flex flex-col items-center">
                <h2 className="text-3xl font-extrabold mb-6 text-indigo-700">Rejoignez MathQuest</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
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

                    <div className="flex justify-between mt-2">
                        <label className={`cursor-pointer ${role === "eleve" ? "text-indigo-600 font-bold" : ""}`}>
                            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
                            <input type="radio" value="eleve" checked={role === "eleve"} onChange={() => setRole("eleve")} /> Élève
                        </label>
                        <label className={`cursor-pointer ${role === "parent" ? "text-indigo-600 font-bold" : ""}`}>
                            <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                            <input type="radio" value="parent" checked={role === "parent"} onChange={() => setRole("parent")} /> Parent
                        </label>
                    </div>

                    <button type="submit" className="mt-4 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-800 transition">
                        S'inscrire 🚀
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
