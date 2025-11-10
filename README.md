# 🧮 MathQuest — Plateforme Éducative Interactive

![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203-brightgreen.svg)
![React](https://img.shields.io/badge/Frontend-React%2018-blue.svg)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green.svg)
![Docker](https://img.shields.io/badge/Container-Docker-blue.svg)

---

## 📘 Description du projet

**MathQuest** est une plateforme éducative interactive destinée aux élèves, parents et enseignants.  
Elle permet de :
- Créer et attribuer des **exercices et QCM** 🎯
- Rejoindre des **salons virtuels** 🧑‍🏫
- Suivre la **progression des élèves** 📊
- Consulter les **classements** et les **badges de performance** 🏅

Le projet est développé en **Spring Boot (backend)** et **React (frontend)**, avec une base de données **MongoDB**.

---

## ⚙️ Stack Technique

| Couche | Technologie |
|--------|--------------|
| Backend | Spring Boot 3 (Java 21) |
| Frontend | React 18 (Vite.js, TypeScript) |
| Base de données | MongoDB |
| Sécurité | JWT (JSON Web Token) |
| Conteneurisation | Docker & Docker Compose |
| CI/CD | GitLab CI |
| Déploiement | AWS & Serveur Université de Rouen |
| Outils supplémentaires | SonarQube, Postman, Keycloak (authentification) |

---

## 📂 Structure du projet

```
mathquest/
├── backend/
│   └── src/main/java/com/mathquest/
│       ├── config/         → Configuration (CORS, Security, etc.)
│       ├── controller/     → API REST Controllers
│       ├── service/        → Logique métier
│       ├── repository/     → Accès aux données MongoDB
│       ├── model/          → Entités (User, Exercice, Submission, Salon, etc.)
│       └── dto/            → Objets de transfert de données
│
├── frontend/
│   ├── src/
│   │   ├── pages/          → Pages principales (Dashboard, Classement, Exercices, etc.)
│   │   ├── components/     → Composants réutilisables React
│   │   ├── services/       → API Calls vers le backend
│   │   └── styles/         → Feuilles de style
│   └── package.json
│
└── docker-compose.yml
```

---

## 🚀 Installation et Lancement

### 🧩 1️⃣ Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

L’application démarre par défaut sur :
```
http://localhost:8080
```

### ⚛️ 2️⃣ Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Le client démarre sur :
```
http://localhost:3000
```

---

## ⚠️ Important — Changement de route API pour usage local

> 💡 Par défaut, le frontend pointe vers le serveur de production :
```ts
const API_URL = "http://srv-dpi-proj-mathquest-prod.univ-rouen.fr/api";
```

👉 **Pour exécuter MathQuest en local**, il faut **remplacer cette ligne** par :
```ts
const API_URL = "http://localhost:8080/api";
```

📍 Fichier concerné :
```
frontend/src/services/classement.service.ts
```

Cela permet à l’application React de communiquer avec le backend local Spring Boot.

---

## 🧪 Tests et Qualité

- ✅ Tests unitaires avec **JUnit 5** (backend)
- ✅ Tests d’intégration Postman (API)
- ✅ ESLint + Prettier (frontend)
- ✅ Analyse SonarQube (qualité du code)

---

## 🧠 Fonctionnalités principales

- Gestion complète des **utilisateurs** (élèves, enseignants, parents)
- Création de **salons** avec code d’accès
- Attribution d’**exercices par type**
- **Soumission et correction automatique**
- **Classement et badges** selon la performance
- Suivi de **progression et statistiques** par élève
- Interface **responsive** et ergonomique 🎨

---

## 🧑‍💻 Auteur

**Amine Belkessa**  
🎓 Master 2 Génie Informatique Logiciel — Université de Rouen  
📧 amine.belkessa@univ-rouen.fr  
🌐 [GitHub](https://github.com/amineBelkessa)

---

## 🪪 Licence
Projet académique — utilisation pédagogique et démonstration technique uniquement.
