import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Layout
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

// Pages générales
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import RegisterForm from "./components/Auth/RegisterForm";
import Presentation from "./pages/Presentation";
import Fonctionnalites from "./pages/Fonctionnalites";
import Temoignages from "./pages/Temoignages";
import Tarifs from "./pages/Tarifs";
import Contact  from "./pages/Contact";

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

// Salons
import GererSalon from "./pages/GererSalon.tsx";
import CreerSalon from "./pages/CreerSalon.tsx";
import RejoindreSalon from "./pages/RejoindreSalon.tsx";
import SalonDetails from "./pages/SalonDetails.tsx";
import PerformanceSalon from "./pages/PerformanceSalon.tsx";
import SalonsRejoints from "./pages/SalonsRejoints.tsx";

// Parents
import ParentDashboard from "./pages/ParentDashboard";
import GererMesEnfants from "./pages/GererMesEnfants";
import EnfantsList from "./pages/EnfantsList";
import ParentProgression from "./pages/ParentProgression";
import ProgressionPage from "./pages/ProgressionPage";

// Auth utils
import { getUser } from "./services/auth.service";

const AppContent: React.FC = () => {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const u = getUser();
        if (u?.username && u?.role) {
            setUser(u);
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [location.pathname]);

    if (loading) return <div className="text-center mt-10 text-indigo-700 font-bold text-xl">Chargement...</div>;

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4">
                <Routes>
                    {/* Accueil redirigé */}
                    <Route
                        path="/"
                        element={
                            user?.role === "eleve" ? <Navigate to="/eleve/dashboard" /> :
                                user?.role === "enseignant" ? <Navigate to="/enseignant/dashboard" /> :
                                    user?.role === "admin" ? <Navigate to="/admin/dashboard" /> :
                                        user?.role === "parent" ? <Navigate to="/parent/dashboard" /> :
                                            <Home />
                        }
                    />

                    {/* Auth */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<RegisterForm />} />

                    {/* Public */}
                    <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                    <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />
                    <Route path="/presentation" element={<Presentation />} />
                    <Route path="/fonctionnalites" element={<Fonctionnalites />} />
                    <Route path="/temoignages" element={<Temoignages />} />
                    <Route path="/tarifs" element={<Tarifs />} />
                    <Route path="/contact" element={<Contact />} />

                    {/* Élève */}
                    {user?.role === "eleve" && (
                        <>
                            <Route path="/eleve/dashboard" element={<DashboardEleve />} />
                            <Route path="/eleve/mes-resultats" element={<MesResultats />} />
                            <Route path="/eleve/classement" element={<Classement />} />
                            <Route path="/rejoindre-salon" element={<RejoindreSalon />} />
                            <Route path="/salon/:code" element={<SalonDetails />} />
                            <Route path="/mes-salons" element={<SalonsRejoints />} />
                        </>
                    )}

                    {/* Enseignant */}
                    {user?.role === "enseignant" && (
                        <>
                            <Route path="/enseignant/dashboard" element={<DashboardEnseignant />} />
                            <Route path="/enseignant/creer-exercice" element={<CreerExercice />} />
                            <Route path="/enseignant/eleves" element={<ListeEleves />} />
                            <Route path="/enseignant/eleves/:username" element={<ResultatsEleve />} />
                            <Route path="/creer-salon" element={<CreerSalon />} />
                            <Route path="/gerer-salon" element={<GererSalon />} />
                            <Route path="/parent/progression" element={<ParentProgression />} />
                            <Route path="/parent/progression/:enfantId" element={<ProgressionPage />} />
                            <Route path="/performances/:code" element={<PerformanceSalon />} />
                        </>
                    )}

                    {/* Admin */}
                    {user?.role === "admin" && (
                        <>
                            <Route path="/admin/utilisateurs" element={<AdminUtilisateurs />} />
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                            <Route path="/admin/creer-compte" element={<CreerCompte />} />
                        </>
                    )}

                    {/* Parent */}
                    {user?.role === "parent" && (
                        <>
                            <Route path="/parent/dashboard" element={<ParentDashboard />} />
                            <Route path="/parent/gererenfants" element={<GererMesEnfants />} />
                            <Route path="/parent/enfants" element={<EnfantsList />} />
                            <Route path="/parent/progression" element={<ParentProgression />} />
                            <Route path="/parent/progression/:enfantId" element={<ProgressionPage />} />
                            <Route path="/performances/:code" element={<PerformanceSalon />} />
                            <Route path="/gerer-salon" element={<GererSalon />} />
                            <Route path="/creer-salon" element={<CreerSalon />} />
                        </>
                    )}

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" />} />
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
