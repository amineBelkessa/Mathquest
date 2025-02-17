import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/Auth/RegisterForm.jsx";
import Login from "./components/Auth/Login.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/register">Inscription</Link>
                <Link to="/login">Connexion</Link>
            </nav>

            <Routes>
                <Route path="/" element={<RegisterForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
