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
import AdminDashboard from "./pages/AdminDashboard";
import CreerCompte from "./components/admin/CreerCompte";



// Élèves
import DashboardEleve from "./pages/DashboardEleve";
// @ts-ignore
import MesResultats from "./pages/MesResultats.tsx";

// Enseignants
import DashboardEnseignant from "./pages/DashboardEnseignant";
import CreerExercice from "./pages/CreerExercice";
// @ts-ignore
import ListeEleves from "./pages/ListeEleves.tsx";
// @ts-ignore
import ResultatsEleve from "./pages/ResultatsEleve.tsx";

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
                            ) : user?.role === "admin" ? (
                                <Navigate to="/admin/dashboard" />
                            ) : (
                                <Home />
                            )
                        }
                    />

                    {/* 🔹 Authentification */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* 🔹 Exercices publics ou élève connecté */}
                    <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                    <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />

                    {/* 🔹 Espace Élève */}
                    <Route
                        path="/eleve/dashboard"
                        element={user?.role === "eleve" ? <DashboardEleve /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/eleve/mes-resultats"
                        element={user?.role === "eleve" ? <MesResultats /> : <Navigate to="/" />}
                    />

                    {/* 🔹 Espace Enseignant */}
                    <Route
                        path="/enseignant/dashboard"
                        element={user?.role === "enseignant" ? <DashboardEnseignant /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/enseignant/creer-exercice"
                        element={user?.role === "enseignant" ? <CreerExercice /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/enseignant/eleves"
                        element={user?.role === "enseignant" ? <ListeEleves /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/enseignant/eleves/:username"
                        element={user?.role === "enseignant" ? <ResultatsEleve /> : <Navigate to="/" />}
                    />

                    {/* 🔹 Espace Admin */}
                    <Route
                        path="/admin/utilisateurs"
                        element={user?.role === "admin" ? <AdminUtilisateurs /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/admin/dashboard"
                        element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
                    />
                    <Route
                        path="/admin/creer-compte"
                           element={user?.role === "admin" ? <CreerCompte /> : <Navigate to="/" />}
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
