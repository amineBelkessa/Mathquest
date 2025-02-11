// src/components/Auth/LoginForm.jsx
import React, { useState } from "react";
import { login } from "../../services/auth.service";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            // Stocker le token (localStorage par exemple)
            localStorage.setItem("token", token);
            console.log("Connexion réussie, token =", token);
            // Redirection ou autre action
        } catch (err) {
            setError("Identifiants incorrects.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email :</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Mot de passe :</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Se connecter</button>
        </form>
    );
}

export default LoginForm;
