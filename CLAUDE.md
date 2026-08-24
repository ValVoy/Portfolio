# CLAUDE.md — Portfolio

Ce fichier contient les règles de développement du projet Portfolio personnel.
Il est à lire **en intégralité avant chaque session de travail**.

---

## 1. Stack Technique

| Outil | Version / Précision |
|---|---|
| Framework | Next.js (App Router) |
| Langage | TypeScript strict |
| Style | Tailwind CSS v4 |
| Animation | Framer Motion |
| Déploiement | Vercel |
| Contenu long | MDX (local) |

**Règle absolue :** Ne jamais ajouter une dépendance sans vérifier qu'une solution native Next.js ou Tailwind ne suffit pas.

---

## 2. Structure des Dossiers

```
/app                        → App Router (pages, layouts, routes)
/components
  /ui                       → Atomes & molécules (boutons, chips, inputs...)
  /layout                   → Header, Footer, grilles de mise en page
  /sections                 → Blocs de page (Hero, Projects, About, Contact...)
/data                       → Fichiers TypeScript pour les données (projets, compétences, nav...)
/content                    → Fichiers MDX pour les contenus longs (études de cas, articles)
/lib                        → Utilitaires, helpers, hooks custom
/assets                     → Images statiques, icônes SVG
> Les dossiers `governance/` et `carnetdebord.md` sont à la **racine `Portfolio/`**, pas dans `app/`.

```
Portfolio/
  CLAUDE.md
  carnetdebord.md
  governance/
    claude/                 → Fichiers techniques rédigés par Claude
    gemini/                 → Rapports d'audit rédigés par Gemini
  app/                      → Projet Next.js (code source uniquement)
```
/public                     → Favicon, og:image, robots.txt, sitemap
```

**Règles :**
- Un composant = un fichier. Jamais de composants multiples dans le même fichier.
- Les données ne vivent jamais dans les composants. Toujours dans `/data/`.
- Les composants `/ui` sont sans logique métier. Ils reçoivent tout via props.

---

## 3. Design System — "The Kinetic Luminescence"

Référence complète : `stitch/DESIGN.md`. Ce fichier fait autorité sur toutes les décisions visuelles.

### Règles absolues
- **Zéro border 1px solid** pour séparer des sections. Utiliser des transitions de `background-color`.
- **Zéro `#FFFFFF`** pour le texte. Body en `on-surface-variant` (#acaaad), headlines en `on-surface` (#f6f3f5).
- **Zéro divider pleine largeur.** Si séparation nécessaire : barre de 48px × 2px en `primary-dim`.
- **Zéro shadow grise.** Élévation via les tiers de surface ou `ambient shadow` en `primary` à 8% d'opacité.
- Glassmorphism sur navbar et modals : `surface-variant` à 60% opacité + `backdrop-blur: 24px`.
- Les CTA principaux utilisent un gradient 135° de `primary` (#94aaff) vers `primary-dim` (#3e6af1).
- Padding minimum de 32px à l'intérieur des cards. Border-radius `xl` (1.5rem) sur toutes les cards.
- Espacement vertical entre sections majeurs : **160px**.

### Typographie
- Headlines & Display : **Space Grotesk** — letter-spacing `-0.02em` sur les Display-LG.
- Body & Labels : **Inter**.
- Les labels de metadata (stack, dates) : `uppercase` + `letter-spacing: 0.1em`.

---

## 4. Programmation

- **TypeScript strict** — pas de `any`, pas de `as unknown`. Typer explicitement.
- **DRY & KISS** — si un pattern est répété 2 fois, créer un composant. Pas avant.
- **Server Components par défaut** — n'ajouter `'use client'` que si interaction ou hook React nécessaire.
- **`next/image`** obligatoire pour toutes les images. Jamais de balise `<img>` nue.
- **`next/font`** obligatoire pour Space Grotesk et Inter.
- **Framer Motion** uniquement pour les animations significatives (entrées de section, transitions de page). Pas d'animation purement décorative.
- Toujours indiquer le chemin du fichier avant un bloc de code.
- Modifications partielles uniquement — ne jamais réécrire un fichier entier.

---

## 5. Internationalisation (i18n)

- Portfolio **bilingue français / anglais**.
- Stratégie : fichiers de traduction dans `/data/i18n/fr.ts` et `/data/i18n/en.ts`.
- La langue par défaut est le français (`/`). L'anglais sur `/en`.
- Les contenus MDX sont dupliqués par langue : `project-name.en.mdx` / `project-name.fr.mdx`.
- Aucun texte en dur dans les composants. Toujours passer par les fichiers de traduction.

---

## 6. SEO & Performance

- **Cible Lighthouse : 95+ sur tous les critères** (Performance, Accessibilité, Best Practices, SEO).
- Chaque page a ses propres métadonnées via `export const metadata` (Next.js).
- `og:image` et `twitter:card` obligatoires sur toutes les pages.
- JSON-LD (`application/ld+json`) sur la page d'accueil et les pages de projets.
- `robots.txt` et `sitemap.xml` générés dynamiquement.
- Lazy loading sur toutes les images hors viewport.
- Tout asset image : format WebP ou AVIF. Jamais de PNG/JPG non optimisé.

---

## 7. Accessibilité (a11y)

- Conformité **WCAG 2.1 AA** minimum.
- Chaque image décorative : `alt=""`. Chaque image informative : `alt` descriptif.
- Navigation clavier fonctionnelle sur tous les éléments interactifs.
- Focus visible (ne jamais supprimer `outline` sans le remplacer).
- Contraste minimum : 4.5:1 pour le texte normal, 3:1 pour le texte large.
- ARIA labels sur les icônes sans texte et les boutons ambigus.

---

## 8. Git

- **Tester avant de committer (RÈGLE ABSOLUE)** — faire tester l'interface à l'utilisateur AVANT de proposer le commit.
- Conventional Commits : `feat:` / `fix:` / `style:` / `refactor:` / `chore:` + description en bullet points.
- Un seul commit groupé par session de travail. Pas de commits séparés par type.
- Branche unique : `main`.

---

## 9. Carnet de Bord (RÈGLE ABSOLUE)

Fichier `carnetdebord.md` à la **racine `Portfolio/`** (pas dans `app/`) — **append-only**, jamais modifier l'existant.

- **Format :** `JJ-MM-AAAA | HH:MM | Description | [Commit]`
- **Ordre :** commit d'abord → hash obtenu → écriture de l'entrée.
- **Lire avant d'écrire** pour identifier la dernière ligne et ne pas écraser.
- **Heure :** exécuter `date +"%d-%m-%Y | %H:%M"` via Bash après le commit. Ne jamais demander à l'utilisateur.

---

## 10. Gouvernance Claude / Gemini

### Dossier `Portfolio/governance/` (racine, hors code source)
- `governance/claude/` — fichiers techniques rédigés par Claude (contexte, décisions d'archi, handoff de session). Fichiers numérotés : `claude_NN.md`.
- `governance/gemini/` — rapports d'audit rédigés par Gemini. **Lecture seule pour Claude. Jamais modifier.**

> **Note :** `app/CLAUDE.md` et `app/AGENTS.md` sont des fichiers auto-générés par `create-next-app` pour guider les agents IA sur la version de Next.js. Ne pas modifier ni supprimer.

> **⚠️ Attention Glob & .gitignore :** L'outil `Glob` respecte le `.gitignore` et ne voit **pas** les fichiers dans `governance/`. Pour lister ou lire ces dossiers, toujours utiliser `Bash ls <chemin>` ou `Read` avec le chemin complet.

### Protocole de session
**Début :** lire `/governance/gemini/` (fichiers non archivés) → créer `claude_NN.md` avec le contexte de la session.

**Fin :** mettre à jour `claude_NN.md` avec le bilan (features livrées, commits, décisions, prochaines étapes) → soumettre le code à Gemini pour audit global de la session.

### Grille d'audit Gemini (fin de session)
- [ ] Sécurité : aucune donnée sensible exposée
- [ ] Performance : poids des assets, lazy-loading, score Lighthouse ≥ 95
- [ ] UX/UI : fidélité au design system `stitch/DESIGN.md`
- [ ] Accessibilité : WCAG 2.1 AA
- [ ] SEO : métadonnées, JSON-LD, sitemap
- [ ] Code : propreté, typage TypeScript strict, pas de `any`

---

## 11. Rigueur & Débogage

- **Ne jamais inventer** de prop, hook, méthode ou comportement Next.js incertain — écrire "je ne suis pas sûr".
- En cas d'erreur build ou interface cassée : demander les logs avant de modifier du code.
- Expliquer le raisonnement avant une décision d'architecture ou un choix technique non évident.

---

## 12. Autonomie

- Edit/Write pour tous les fichiers de code.
- Demander uniquement : **(1)** les commandes terminal (`npm install`, `npx`, etc.) et **(2)** les commits git.
