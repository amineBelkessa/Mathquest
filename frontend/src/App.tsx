import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Pages générales
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import RegisterForm from "./components/Auth/RegisterForm";

// Exercices
import ConsulterExercices from "./pages/ConsulterExercices";
import RealiserExercice from "./pages/RealiserExercice";

// Admin
import AdminUtilisateurs from "./pages/AdminUtilisateurs";

// Élèves
import DashboardEleve from "./pages/DashboardEleve";
// @ts-ignore
import MesResultats from "./pages/MesResultats.tsx";

// Enseignants
import DashboardEnseignant from "./pages/DashboardEnseignant";
import CreerExercice from "./pages/CreerExercice";

// Auth utils
import { getUser } from "./services/auth.service";

const AppContent: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);
    const location = useLocation();

    useEffect(() => {
        const u = getUser();
        setUser(u);
    }, [location.pathname]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow container mx-auto p-4">
                <Routes>
                    {/* 🔹 Accueil avec redirection dynamique */}
                    <Route
                        path="/"
                        element={
                            user?.role === "eleve" ? (
                                <Navigate to="/eleve/dashboard" />
                            ) : user?.role === "enseignant" ? (
                                <Navigate to="/enseignant/dashboard" />
                            ) : (
                                <Home />
                            )
                        }
                    />

                    {/* 🔹 Authentification */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* 🔹 Exercices (publics ou élève connecté) */}
                    <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                    <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />

                    {/* 🔹 Espace Élève */}
                    <Route
                        path="/eleve/dashboard"
                        element={
                            user?.role === "eleve" ? <DashboardEleve /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/eleve/mes-resultats"
                        element={
                            user?.role === "eleve" ? <MesResultats /> : <Navigate to="/" />
                        }
                    />

                    {/* 🔹 Espace Enseignant */}
                    <Route
                        path="/enseignant/dashboard"
                        element={
                            user?.role === "enseignant" ? <DashboardEnseignant /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/enseignant/creer-exercice"
                        element={
                            user?.role === "enseignant" ? <CreerExercice /> : <Navigate to="/" />
                        }
                    />

                    {/* 🔹 Espace Admin */}
                    <Route
                        path="/admin/utilisateurs"
                        element={
                            user?.role === "admin" ? <AdminUtilisateurs /> : <Navigate to="/" />
                        }
                    />
                </Routes>
            </main>

            <Footer />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;
