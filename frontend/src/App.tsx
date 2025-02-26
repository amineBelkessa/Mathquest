import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
// @ts-ignore
import Home from "./pages/Home";
// @ts-ignore
import LoginStudent from "./components/Auth/LoginStudent";
// @ts-ignore
import LoginTeacher from "./components/Auth/LoginTeacher";
// @ts-ignore
import LoginParent from "./components/Auth/LoginParent";

function App() {
    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login-student" element={<LoginStudent />} />
                    <Route path="/login-teacher" element={<LoginTeacher />} />
                    <Route path="/login-parent" element={<LoginParent />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
