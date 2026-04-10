# Roadmap — Portfolio

> Objectif : un portfolio personnel bilingue (FR/EN), performant (Lighthouse 95+), qui présente les projets et compétences de Valentin Chéron de façon soignée et mémorable. Design system "The Kinetic Luminescence" — sombre, technique, editorial.

---

## Stack

| Outil | Rôle |
|---|---|
| Next.js 16 (App Router) | Framework — pages, routing, SSG |
| TypeScript strict | Typage — zéro `any` |
| Tailwind CSS v4 | Styles — design tokens via `@theme` |
| Framer Motion | Animations significatives |
| Vercel | Déploiement |

---

## Phases de développement

### Phase 0 — Initialisation ✅
- [x] Projet Next.js 16 créé avec Turbopack
- [x] Tailwind CSS v4 configuré + design tokens "Kinetic Luminescence"
- [x] Fonts : Space Grotesk (display) + Inter (body) via `next/font`
- [x] Structure de dossiers Atomic Design (`ui/`, `sections/`, `layout/`, `data/`)
- [x] i18n : routing `/fr` et `/en`, `getDictionary`, types auto-générés
- [x] Proxy (middleware) : redirection `/` → `/fr`
- [x] Gouvernance : `governance/claude/` et `governance/gemini/`

### Phase 1 — Données réelles ✅
- [x] `data/types.ts` : types `Project`, `Skill`, `Profile`, `SocialLink`
- [x] `data/projects.ts` : 4 projets (Koï's Story, Chatbot OpenAI, Crazy Scrap, FreeDoc)
- [x] `data/skills.ts` : 14 compétences avec niveau 0-100
- [x] `data/profile.ts` : bio, GitHub, LinkedIn, email via variable d'environnement
- [x] `.env.local.example` : template pour `NEXT_PUBLIC_CONTACT_EMAIL`

### Phase 2 — Bibliothèque UI ✅
- [x] `Button` : variantes primary (gradient) / secondary (glass) / tertiary (text)
- [x] `Chip` : pill pour afficher les technos d'un projet
- [x] `Card` : standard + elevated (neon glow hover)
- [x] Smoke test visuel validé : conformité design system confirmée

### Phase 3 — Layout global ✅
- [x] `Header` : glassmorphism, navigation, switcher de langue FR/EN
- [x] `Footer` : liens GitHub/LinkedIn, copyright dynamique
- [x] Root layout : `<html>` + `<body>` + polices dans `app/layout.tsx`

### Phase 4 — Sections de page ✅

- [x] **Fix i18n** : traductions Header/Footer centralisées dans `fr.ts`/`en.ts`
- [x] **Fix i18n données** : `LocalizedString` pour `description`, `longDescription`, `title`, `bio` — helper `t()` dans `lib/i18n.ts`
- [x] `sections/Hero.tsx` : badge disponibilité, nom, titre, bio, CTA primaire + tertiaire
- [x] `sections/Projects.tsx` : grille 3 colonnes, stagger Framer Motion, animations scroll
- [x] `sections/ProjectCard.tsx` : card avec status badge, stack (Chips), liens repo/démo
- [x] `sections/About.tsx` : bio + compétences en grille 2 colonnes avec barres animées
- [x] `sections/Contact.tsx` : liens GitHub / LinkedIn / Email avec icônes SVG
- [x] Navigation mobile : hamburger animé, menu déroulant Framer Motion

### Phase 5 — SEO & Performance 🔄 En cours
- [x] Métadonnées complètes (`title`, `description`, `openGraph`, `twitter:card`, `robots`)
- [x] `og:image` générée dynamiquement via `ImageResponse` (1200×630, bilingue)
- [x] JSON-LD `Person` schema sur la page d'accueil
- [x] `robots.txt` et `sitemap.xml` dynamiques avec hreflang FR/EN
- [ ] Score Lighthouse 95+ sur les 4 critères
- [ ] Toutes les images en WebP/AVIF via `next/image`

### Phase 6 — Page Projet individuelle 📋 À venir
- [ ] Route `app/[lang]/projects/[id]/page.tsx`
- [ ] Page détail : description longue, stack complète, captures d'écran, liens
- [ ] Métadonnées spécifiques à chaque projet
- [ ] Navigation retour vers la liste

### Phase 7 — Version anglaise 📋 À venir
> La structure i18n est déjà en place. Il s'agit ici de rédiger le contenu EN.

- [ ] Rédiger la bio en anglais dans `profile.ts`
- [ ] Traduire les descriptions projets en anglais
- [ ] Valider l'élasticité des composants avec le contenu EN (textes ±30%)
- [ ] Tester l'ensemble sur `/en`

### Phase 8 — Déploiement 📋 À venir
- [ ] Créer le repo GitHub (public ou privé)
- [ ] Connecter à Vercel
- [ ] Configurer les variables d'environnement sur Vercel (`NEXT_PUBLIC_CONTACT_EMAIL`)
- [ ] **Remplacer `https://portfolio.vercel.app` par la vraie URL** dans `layout.tsx`, `page.tsx`, `sitemap.ts`, `robots.ts`
- [ ] Domaine personnalisé (si applicable)
- [ ] Vérification finale Lighthouse en production

---

## Légende

| Icône | Signification |
|---|---|
| ✅ | Phase terminée et auditée |
| 🔄 | Phase en cours |
| 📋 | Phase à venir |
| [x] | Tâche complétée |
| [ ] | Tâche à faire |
