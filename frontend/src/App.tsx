import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

// 📦 Layout & Auth
// @ts-ignore
import Header from "./components/Layout/Header.tsx";
// @ts-ignore
import Footer from "./components/Layout/Footer.tsx";
// @ts-ignore
import Login from "./components/Auth/Login.tsx";
// @ts-ignore
import RegisterForm from "./components/Auth/RegisterForm.tsx";

// 📄 Pages
// @ts-ignore
import Home from "./pages/Home.tsx";
// @ts-ignore
import ConsulterExercices from "./pages/ConsulterExercices.tsx";
// @ts-ignore
import RealiserExercice from "./pages/RealiserExercice.tsx";
// @ts-ignore
import AdminUtilisateurs from "./pages/AdminUtilisateurs.tsx";
// @ts-ignore
import GererSalon from "./pages/GererSalon.tsx";
// @ts-ignore
import CreerSalon from "./pages/CreerSalon.tsx";
// @ts-ignore
import RejoindreSalon from "./pages/RejoindreSalon.tsx";
// @ts-ignore
import SalonDetails from "./pages/SalonDetails.tsx";
// @ts-ignore
import PerformanceSalon from "./pages/PerformanceSalon.tsx";
// ✅ Ajout
// @ts-ignore
import SalonsRejoints from "./pages/SalonsRejoints.tsx";

import { getUser } from "./services/auth.service";

function App() {
    const user = getUser();

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />

                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        {/* 🛡️ Admin */}
                        <Route
                            path="/admin/utilisateurs"
                            element={
                                user?.role === "admin"
                                    ? <AdminUtilisateurs />
                                    : <Navigate to="/" />
                            }
                        />

                        {/* 🏠 Accueil & Auth */}
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<Login />} />

                        {/* 🎯 Exercices */}
                        <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                        <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />

                        {/* 👨‍🏫 Salons côté parent */}
                        <Route
                            path="/gerer-salon"
                            element={
                                user?.role === "parent"
                                    ? <GererSalon />
                                    : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/creer-salon"
                            element={
                                user?.role === "parent"
                                    ? <CreerSalon />
                                    : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/performances/:code"
                            element={
                                user?.role === "parent"
                                    ? <PerformanceSalon />
                                    : <Navigate to="/" />
                            }
                        />

                        {/* 🧑‍🎓 Salons côté élève */}
                        <Route
                            path="/rejoindre-salon"
                            element={
                                user?.role === "eleve"
                                    ? <RejoindreSalon />
                                    : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/salon/:code"
                            element={
                                user?.role === "eleve"
                                    ? <SalonDetails />
                                    : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/mes-salons"
                            element={
                                user?.role === "eleve"
                                    ? <SalonsRejoints />
                                    : <Navigate to="/" />
                            }
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
