import { useState } from "react";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await login(email, password);
            console.log("✅ Connexion réussie !");
            navigate("/dashboard"); // Rediriger après connexion
        } catch (err) {
            setError("Email ou mot de passe incorrect !");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Connexion</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: "10px", margin: "10px", width: "250px" }}
                />
                <br />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: "10px", margin: "10px", width: "250px" }}
                />
                <br />
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        marginTop: "10px",
                        backgroundColor: loading ? "#ccc" : "#007bff",
                        color: "white",
                        border: "none",
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>
            </form>
        </div>
    );
};

export default Login;
