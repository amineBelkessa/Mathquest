import { Link } from "react-router-dom";
import "../assets/styles/header.css"; // Import du style

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">📚 MathQuest</div>
            <nav>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/login-student">Élèves</Link></li>
                    <li><Link to="/login-teacher">Professeurs</Link></li>
                    <li><Link to="/login-parent">Parents</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
