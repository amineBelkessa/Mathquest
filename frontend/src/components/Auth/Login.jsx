import React from "react";

const Login = () => {
    return (
        <div>
            <h2>Connexion</h2>
            <form>
                <input type="text" placeholder="Nom d'utilisateur" />
                <input type="password" placeholder="Mot de passe" />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
