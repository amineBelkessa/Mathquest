import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// @ts-ignore
import Header from "./components/Layout/Header.tsx";
// @ts-ignore
import Home from "./pages/Home.tsx";
// @ts-ignore
import Login from "./components/Auth/Login.tsx";
// @ts-ignore
import RegisterForm from "./components/Auth/RegisterForm.tsx";
// @ts-ignore
import Footer from "./components/Layout/Footer.tsx";
// @ts-ignore
import ConsulterExercices from "./pages/ConsulterExercices.tsx";
// @ts-ignore
import RealiserExercice from "./pages/RealiserExercice.tsx";

import React from "react";

function App() {

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/consulter-exercices" element={<ConsulterExercices />} />
                        <Route path="/realiser-exercice/:id" element={<RealiserExercice />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
