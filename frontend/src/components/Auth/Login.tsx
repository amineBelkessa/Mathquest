import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEnvelope,
    faLock,
    faEye,
    faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
// @ts-ignore
import { login } from "../../services/auth.service.ts";
import "../../assets/styles/Login.css";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const user = await login(email, password);
            console.log("✅ Connexion réussie :", user);

            // 🔐 Stockage utilisateur si nécessaire
            localStorage.setItem("user", JSON.stringify(user));

            // 🧭 Redirection intelligente selon le rôle
            const role = user?.role?.toLowerCase();
            const redirectFrom = location.state?.from;

            if (role === "eleve") {
                if (redirectFrom === "/consulter-exercices") {
                    navigate("/consulter-exercices");
                } else {
                    navigate("/eleve/dashboard");
                }
            } else if (role === "enseignant") {
                navigate("/enseignant/dashboard");
            } else if (role === "admin") {
                navigate("/admin/utilisateurs");
            } else {
                navigate("/"); // Page d'accueil par défaut
            }

        } catch (err) {
            console.error("❌ Erreur de connexion :", err);
            setError("Email ou mot de passe incorrect !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Connexion à MathQuest</h2>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* 🔹 Email */}
                    <div className="input-container">
                        <FontAwesomeIcon icon={faEnvelope} className="icon" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* 🔐 Mot de passe */}
                    <div className="input-container">
                        <FontAwesomeIcon icon={faLock} className="icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
