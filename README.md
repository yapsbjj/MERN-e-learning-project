
# 📘 Knowledge – Plateforme de cours en ligne

**Knowledge** est une application web moderne permettant à des étudiants d'accéder à des cours vidéo et à des enseignants de publier, vendre et suivre l’évolution de leurs formations.

## 🚀 Fonctionnalités principales

### 👨‍🎓 Étudiant
- Parcours de cours et filtre par recherche
- Visualisation des chapitres et vidéos gratuites (preview)
- Suivi de progression et lecture vidéo intégrée (YouTube)
- Paiement sécurisé avec Stripe
- Notation des cours

### 👨‍🏫 Enseignant
- Ajout de cours via un éditeur riche (Quill.js)
- Gestion des chapitres et vidéos
- Dashboard de statistiques (revenus, étudiants, etc.)
- Vue des étudiants inscrits

## 🛠️ Stack technique

| Côté | Technologies |
|------|--------------|
| Frontend | React, Vite, TailwindCSS, React Router, Axios |
| Backend | Node.js, Express, MongoDB (Mongoose), Clerk, Stripe |
| Authentification | Clerk |
| Paiement | Stripe |
| Stockage images | Cloudinary |
| Déploiement | Vercel compatible (vercel.json fourni) |

## ⚙️ Installation

### Backend
```bash
cd backend
npm install
npm run server
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📁 Structure du projet

- `backend/` : Express, modèles, contrôleurs, webhooks
- `frontend/` : React 19, pages pour étudiants et éducateurs
- `vercel.json` : configuration déploiement API

## 📝 Auteurs et crédits

Projet réalisé dans le cadre d’un devoir académique.  
Technologies utilisées sous licence libre.

---

© 2025 – Projet fictif à but pédagogique.
