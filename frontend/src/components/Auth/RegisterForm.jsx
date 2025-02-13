// src/components/Auth/RegisterForm.jsx
import React, { useState } from "react";
import { register } from "../../services/auth.service";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await register(username, email, password);
            localStorage.setItem("token", token);
            console.log("Inscription réussie, token =", token);
            // Redirection ou autre action
        } catch (err) {
            setError("Erreur lors de l’inscription : " + err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nom d'utilisateur :</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
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
            <button type="submit">S'inscrire</button>
        </form>
    );
}

export default RegisterForm;
