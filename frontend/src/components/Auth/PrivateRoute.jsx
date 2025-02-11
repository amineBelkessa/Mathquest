// src/components/Auth/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    // Si pas de token, on redirige vers la page de login
    if (!token) {
        return <Navigate to="/login" replace />;

    }

    // Si token, on autorise l'accès au composant enfant
    return children;
}

export default PrivateRoute;
