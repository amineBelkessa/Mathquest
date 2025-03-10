import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx"; // 🔥 Remplace App.js par App.tsx
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

reportWebVitals();
