import { useState } from "react";
// @ts-ignore
import { login } from "../../services/auth.service.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/Login.css";
import React from "react";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // ✅ Correction ici
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            console.log("Connexion réussie !");
            window.alert("Connexion réussie !");
        } catch (err) {
            setError("Email ou mot de passe incorrect !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Connexion à MathQuest </h2>
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {/* Champ Email avec icône */}
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

                    {/* Champ Mot de passe avec icône et visibilité */}
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
                        {loading ? "Connexion..." : "Se connecter ☄️"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
