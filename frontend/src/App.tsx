import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import RegisterForm from "./components/Auth/RegisterForm";
import ConsulterExercices from "./pages/ConsulterExercices";
import RealiserExercice from "./pages/RealiserExercice";
import DashboardEleve from "./pages/DashboardEleve";
import AdminUtilisateurs from "./pages/AdminUtilisateurs";
// @ts-ignore
import MesResultats from "./pages/MesResultats.tsx";

// Auth
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
                    {/* Page d'accueil avec redirection automatique */}
                    <Route
                        path="/"
                        element={
                            user?.role === "eleve" ? (
                                <Navigate to="/eleve/dashboard" />
                            ) : (
                                <Home />
                            )
                        }
                    />

                    {/* Authentification */}
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<Login />} />

                    {/* Exercices */}
                    <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                    <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />

                    {/* Tableau de bord élève */}
                    <Route
                        path="/eleve/dashboard"
                        element={
                            user?.role === "eleve" ? (
                                <DashboardEleve />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    {/* Résultats élève */}
                    <Route
                        path="/eleve/mes-resultats"
                        element={
                            user?.role === "eleve" ? (
                                <MesResultats />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />

                    {/* Admin */}
                    <Route
                        path="/admin/utilisateurs"
                        element={
                            user?.role === "admin" ? (
                                <AdminUtilisateurs />
                            ) : (
                                <Navigate to="/" />
                            )
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
