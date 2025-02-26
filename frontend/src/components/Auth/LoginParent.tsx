import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/login.css"; // Import du style
import { login } from "../../services/auth.service";

const LoginParent: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            console.log("Connexion Parent réussie !");
            navigate("/dashboard-parent"); // Redirection après connexion réussie
        } catch (err) {
            setError("Email ou mot de passe incorrect !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion Parent</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
            </form>
        </div>
    );
};

export default LoginParent;
