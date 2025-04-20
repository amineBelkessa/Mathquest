import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import RegisterForm from "./components/Auth/RegisterForm";
import ConsulterExercices from "./pages/ConsulterExercices";
import RealiserExercice from "./pages/RealiserExercice";

import AdminUtilisateurs from "./pages/AdminUtilisateurs";
import DashboardEleve from "./pages/DashboardEleve";
import MesResultats from "./pages/MesResultats";
import DashboardEnseignant from "./pages/DashboardEnseignant";
import CreerExercice from "./pages/CreerExercice";
// import ListeEleves from "./pages/ListeEleves";
// import ResultatsEleve from "./pages/ResultatsEleve";

import { getUser } from "./services/auth.service";

function App() {
    const user = getUser();

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        {/* 🔹 Accueil */}
                        <Route path="/" element={<Home />} />

                        {/* 🔹 Authentification */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<RegisterForm />} />

                        {/* 🔹 Exercices (publics ou élèves) */}
                        <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                        <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />

                        {/* 🔹 Espace élève */}
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

                        {/* 🔹 Espace enseignant */}
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
                        {/*<Route*/}
                        {/*    path="/enseignant/eleves"*/}
                        {/*    element={*/}
                        {/*        user?.role === "enseignant" ? <ListeEleves /> : <Navigate to="/" />*/}
                        {/*    }*/}
                        {/*/>*/}
                        {/*<Route*/}
                        {/*    path="/enseignant/eleves/:username"*/}
                        {/*    element={*/}
                        {/*        user?.role === "enseignant" ? <ResultatsEleve /> : <Navigate to="/" />*/}
                        {/*    }*/}
                        {/*/>*/}

                        {/* 🔹 Espace admin */}
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
        </Router>
    );
}

export default App;
