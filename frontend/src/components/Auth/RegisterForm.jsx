import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import de useNavigate
import { register } from "../../services/auth.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Pour afficher/masquer le mot de passe
    const navigate = useNavigate(); // Hook de navigation pour la redirection

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await register(username, email, password);
            localStorage.setItem("token", token);
            console.log("Inscription réussie, token =", token);

            // Redirection vers /login après succès
            navigate("/login");
        } catch (err) {
            setError("Email ou nom d'utilisateur déjà utilisé ");
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Inscription</h2>
                {error && <p className="error-message">{error}</p>} {/* Affiche l'erreur sous forme de texte */}

                <form onSubmit={handleSubmit}>
                    {/* Champ Nom d'utilisateur avec icône */}
                    <div className="input-container">
                        <FontAwesomeIcon icon={faUser} className="icon" />
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

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

                    <button type="submit">S'inscrire</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
