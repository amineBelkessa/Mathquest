import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Pour rediriger après connexion

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            navigate("/dashboard"); // Redirection après succès
        } catch (err) {
            setError("Email ou mot de passe incorrect !");
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h2>Connexion</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", margin: "5px 0" }}
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: "100%", padding: "10px", margin: "5px 0" }}
                />
                <button type="submit" style={{ width: "100%", padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
                    Se connecter
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
