import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/hello") // Appel API Spring Boot
        .then(response => response.text()) // Convertir la réponse en texte
        .then(data => setMessage(data)) // Stocker la réponse dans le state
        .catch(error => console.error("Erreur API:", error)); // Afficher l'erreur si besoin
  }, []);

  return (
      <div>
        <h1>Bienvenue sur MathQuest</h1>
        <p>{message}</p> {/* Afficher la réponse ici */}
      </div>
  );
}

export default App;
