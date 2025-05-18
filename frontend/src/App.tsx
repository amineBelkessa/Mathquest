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
import MesResultats from "./pages/MesResultats.tsx";
import Classement from "./pages/Classement";
import ListeEleves from "./pages/ListeEleves.tsx";
import ResultatsEleve from "./pages/ResultatsEleve.tsx";

// Enseignants
import DashboardEnseignant from "./pages/DashboardEnseignant";
import CreerExercice from "./pages/CreerExercice";

// Salons (élèves & parents)
import GererSalon from "./pages/GererSalon.tsx";
import CreerSalon from "./pages/CreerSalon.tsx";
import RejoindreSalon from "./pages/RejoindreSalon.tsx";
import SalonDetails from "./pages/SalonDetails.tsx";
import PerformanceSalon from "./pages/PerformanceSalon.tsx";
import SalonsRejoints from "./pages/SalonsRejoints.tsx";

// Parents - nouvelles pages
import ParentDashboard from "./pages/ParentDashboard";
import GererMesEnfants from "./pages/GererMesEnfants";
import EnfantsList from "./pages/EnfantsList";
import ParentProgression from "./pages/ParentProgression";
import ProgressionPage from "./pages/ProgressionPage";

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
                    {/* Accueil */}
                    <Route
                        path="/"
                        element={
                            user?.role === "eleve" ? (
                                <Navigate to="/eleve/dashboard" />
                            ) : user?.role === "enseignant" ? (
                                <Navigate to="/enseignant/dashboard" />
                            ) : user?.role === "admin" ? (
                                <Navigate to="/admin/dashboard" />
                            ) : user?.role === "parent" ? (
                                <Navigate to="/parent/dashboard" />
                            ) : (
                                <Home />
                            )
                        }
                    />

                    {/* Auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* Exercices */}
                    <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                    <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />

                    {/* Élève */}
                    <Route path="/eleve/dashboard" element={user?.role === "eleve" ? <DashboardEleve /> : <Navigate to="/" />} />
                    <Route path="/eleve/mes-resultats" element={user?.role === "eleve" ? <MesResultats /> : <Navigate to="/" />} />
                    <Route path="/eleve/classement" element={<Classement />} />

                    {/* Enseignant */}
                    <Route path="/enseignant/dashboard" element={user?.role === "enseignant" ? <DashboardEnseignant /> : <Navigate to="/" />} />
                    <Route path="/enseignant/creer-exercice" element={user?.role === "enseignant" ? <CreerExercice /> : <Navigate to="/" />} />
                    <Route path="/enseignant/eleves" element={user?.role === "enseignant" ? <ListeEleves /> : <Navigate to="/" />} />
                    <Route path="/enseignant/eleves/:username" element={user?.role === "enseignant" ? <ResultatsEleve /> : <Navigate to="/" />} />

                    {/* Admin */}
                    <Route path="/admin/utilisateurs" element={user?.role === "admin" ? <AdminUtilisateurs /> : <Navigate to="/" />} />
                    <Route path="/admin/dashboard" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
                    <Route path="/admin/creer-compte" element={user?.role === "admin" ? <CreerCompte /> : <Navigate to="/" />} />

                    {/* Parents - nouvelles fonctionnalités */}
                    <Route path="/parent/dashboard" element={user?.role === "parent" ? <ParentDashboard /> : <Navigate to="/" />} />
                    <Route path="/parent/gererenfants" element={user?.role === "parent" ? <GererMesEnfants /> : <Navigate to="/" />} />
                    <Route path="/parent/enfants" element={user?.role === "parent" ? <EnfantsList /> : <Navigate to="/" />} />
                    <Route path="/parent/progression" element={user?.role === "parent" ? <ParentProgression /> : <Navigate to="/" />} />
                    <Route path="/parent/progression/:enfantId" element={user?.role === "parent" ? <ProgressionPage /> : <Navigate to="/" />} />
                    <Route path="/performances/:code" element={user?.role === "parent" ? <PerformanceSalon /> : <Navigate to="/" />} />

                    {/* Élève - Salons */}
                    <Route path="/rejoindre-salon" element={user?.role === "eleve" ? <RejoindreSalon /> : <Navigate to="/" />} />
                    <Route path="/salon/:code" element={user?.role === "eleve" ? <SalonDetails /> : <Navigate to="/" />} />
                    <Route path="/mes-salons" element={user?.role === "eleve" ? <SalonsRejoints /> : <Navigate to="/" />} />

                    {/* Parents - anciens salons (à modifier plus tard vers enseignants) */}
                    <Route path="/gerer-salon" element={user?.role === "parent" ? <GererSalon /> : <Navigate to="/" />} />
                    <Route path="/creer-salon" element={user?.role === "parent" ? <CreerSalon /> : <Navigate to="/" />} />
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
