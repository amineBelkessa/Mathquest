import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
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
import React from "react";
import AdminUtilisateurs from "./pages/AdminUtilisateurs";
import {getUser} from "./services/auth.service";

function App() {
    const user = getUser();
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        <Route path="/admin/utilisateurs" element={user?.role === "admin" ? <AdminUtilisateurs /> : <Navigate to="/" />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
