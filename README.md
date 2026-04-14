# Portfolio — Valentin Chéron

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8)](https://tailwindcss.com/)

Portfolio personnel bilingue (FR/EN) — design system "The Kinetic Luminescence".

---

## Stack

| Outil | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework — SSG, routing, métadonnées |
| TypeScript strict | Typage — zéro `any` |
| Tailwind CSS v4 | Styles — design tokens via `@theme` |
| Framer Motion | Animations (transitions de thème, entrées de section) |
| Vercel | Déploiement |

---

## Lancer le projet en local

```bash
cd app
npm install
cp .env.local.example .env.local
# Remplir les variables dans .env.local
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

---

## Variables d'environnement

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email affiché dans la section Contact |
| `NEXT_PUBLIC_SITE_URL` | URL de base du site (canonicals, sitemap, og:image) |

---

## Structure

```
app/                  → Projet Next.js (code source)
stitch/               → Design system & assets visuels
governance/           → Rapports d'audit et décisions d'architecture
```

---

© 2026 Valentin Chéron. Tous droits réservés.
