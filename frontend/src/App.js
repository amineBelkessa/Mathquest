// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegisterForm from "./components/Auth/RegisterForm";
import Login from "./components/Auth/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

// IMPORT du composant PrivateRoute

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to="/register">Inscription</Link>
                <Link to="/Login">Connexion</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </Router>
    );
}

export default App;
