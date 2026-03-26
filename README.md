# CampusConnect

**Le futur de la gestion académique.** CampusConnect est une plateforme SaaS moderne conçue pour simplifier la vie des étudiants, des enseignants et des administrateurs. 

Built with **Next.js 15**, **Supabase**, and **Tailwind CSS**.

## ✨ Caractéristiques Principales
- **Planning Intelligent** : Synchronisation en temps réel des cours et des examens.
- **Gestion des Salles** : Système de réservation MD3 avec disponibilité instantanée.
- **Émargement Digital** : Présences gérées en un clic pour les enseignants.
- **Assistant IA** : Support académique 24/7 avec historique persistant.
- **Support & Billetterie** : Gestion centralisée des requêtes administratives.

## 🚀 Technologie
- **Framework** : Next.js (App Router, Server Actions, SSR)
- **Base de données** : PostgreSQL via Supabase
- **Sécurité** : Auth-level protection & Row-Level Security (RLS)
- **UI/UX** : Design MD3 (Material Design 3) avec animations fluides.

## 🛠️ Installation
1. Clonez le dépôt
2. Installez les dépendances : `npm install`
3. Configurez les variables d'environnement (`.env.local`) :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Lancez le serveur : `npm run dev`

## 🔒 Sécurité
CampusConnect suit des principes de sécurité rigoureux :
- **Authentification forte** via Supabase Auth.
- **Protection des routes** par rôles (`student`, `teacher`, `admin`).
- **Isolation des données** via RLS (Row-Level Security) au niveau de la base de données.

---
© 2024 CampusConnect - Production Ready.
