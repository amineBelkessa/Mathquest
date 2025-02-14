import { useState } from "react";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
            console.log("Connexion réussie !");
            navigate("/dashboard"); // Rediriger après connexion
        } catch (err) {
            setError(err.message || "Une erreur est survenue.");
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
