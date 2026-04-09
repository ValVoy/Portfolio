# Codex — Portfolio

> Référence vivante du projet. Ce document est une encyclopédie personnelle : lexique technique, décisions d'architecture, conventions, pièges rencontrés. Mis à jour à chaque session.

**Dernière mise à jour :** 09-04-2026 · Session 3 · **Phase en cours :** Phase 4 (Sections) · **Entrées :** 35+

---

## Table des matières

### 📖 Lexique — Commandes
- [`npm run dev`](#npm-run-dev)
- [`rm -rf .next`](#rm--rf-next)
- [`npm run build`](#npm-run-build)

### 📚 Lexique — Concepts
- [App Router (Next.js)](#app-router)
- [Atomic Design](#atomic-design)
- [`async` / `await` dans les composants](#async--await-dans-les-composants)
- [Composant Server vs Client](#composant-server-vs-client)
- [`generateStaticParams`](#generatestaticparams)
- [Glassmorphism](#glassmorphism)
- [Hot Reload / HMR](#hot-reload--hmr)
- [i18n (internationalisation)](#i18n)
- [`LayoutProps` / `PageProps`](#layoutprops--pageprops)
- [`next/font`](#nextfont)
- [`next/image`](#nextimage)
- [`next/link`](#nextlink)
- [Proxy (middleware Next.js 16)](#proxy-middleware)
- [`process.env` et variables d'environnement](#processenv)
- [Server Components](#server-components)
- [`'use client'`](#use-client)
- [Tailwind CSS v4](#tailwind-css-v4)
- [`@theme` (variables CSS Tailwind v4)](#theme)
- [TypeScript strict](#typescript-strict)
- [Turbopack](#turbopack)

### 📁 Anatomie du Projet
- [Vue d'ensemble — arborescence](#vue-densemble)
- [`app/` — pages et layouts](#app--pages-et-layouts)
- [`components/` — interface](#components--interface)
- [`data/` — contenu et traductions](#data--contenu-et-traductions)
- [`lib/` — utilitaires](#lib--utilitaires)
- [Fichiers racine importants](#fichiers-racine)

### 🏛️ Décisions d'Architecture
- [Pourquoi Next.js plutôt que Rails pour un portfolio](#pourquoi-nextjs)
- [Pourquoi App Router plutôt que Pages Router](#pourquoi-app-router)
- [Pourquoi TypeScript strict](#pourquoi-typescript-strict)
- [Pourquoi données en `.ts` plutôt qu'en MDX](#pourquoi-ts-plutôt-que-mdx)

### 🔁 Patterns Récurrents
- [Créer un nouveau composant UI](#créer-un-nouveau-composant-ui)
- [Ajouter une traduction](#ajouter-une-traduction)
- [Ajouter un projet dans le portfolio](#ajouter-un-projet)
- [`LocalizedString` et le helper `t()`](#localizedstring-et-t)

### ⚠️ Pièges à Éviter
- [Apostrophes dans une string TypeScript](#piège-apostrophes)
- [Cache `.next/` corrompu → 404 inexplicable](#piège-cache)
- [Oublier de redémarrer le dev server](#piège-restart)
- [Turbopack file watcher cassé sur Windows](#piège-turbopack-windows)
- [`use client` trop tôt](#piège-use-client)
- [Email en clair dans le code](#piège-email)
- [Balise `<img>` nue](#piège-img)

---

═══════════════════════════════════════════════════════════
## 📖 Lexique — Commandes
═══════════════════════════════════════════════════════════

### `npm run dev`
*Lance le serveur de développement local.*

```bash
cd Portfolio/app
npm run dev
# → http://localhost:3000
```

Utilise **webpack** avec polling (`WATCHPACK_POLLING=true --webpack` dans `package.json`). Le hot reload est actif : chaque sauvegarde de fichier met à jour le navigateur automatiquement — pas besoin de le redémarrer sauf si :
- tu modifies `next.config.ts`
- tu as une erreur de cache (voir [`rm -rf .next`](#rm--rf-next))
- tu ajoutes une variable d'environnement
- tu crées un nouveau dossier (Turbopack/webpack ne détecte pas toujours les nouveaux dossiers)

---

### `rm -rf .next`
*Supprime le cache de compilation de Next.js.*

```bash
rm -rf .next
npm run dev
```

À utiliser quand : page en 404 inexplicable, erreur de type étrange, comportement incohérent après plusieurs sessions. C'est le premier réflexe de débogage.

> **Pourquoi ça arrive ?** Le dossier `.next/` contient les fichiers compilés et les types générés automatiquement (ex: `routes.d.ts`). Sous WSL (Windows Subsystem for Linux) en particulier, des écritures simultanées peuvent corrompre ces fichiers.

---

### `npm run build`
*Compile le projet en mode production.*

```bash
npm run build
```

Révèle les erreurs TypeScript et les problèmes de rendu statique qui n'apparaissent pas en dev. À lancer avant chaque déploiement sur Vercel.

---

═══════════════════════════════════════════════════════════
## 📚 Lexique — Concepts
═══════════════════════════════════════════════════════════

### App Router
*Le système de routage de Next.js 13+ basé sur les dossiers.*

Chaque dossier dans `app/` devient une route. Les fichiers spéciaux sont :
- `page.tsx` → le contenu de la page (ex: `/fr` → `app/[lang]/page.tsx`)
- `layout.tsx` → le gabarit qui entoure la page (persistent entre navigations)
- `not-found.tsx` → page 404 personnalisée
- `loading.tsx` → squelette de chargement

```
app/
├── layout.tsx          → layout racine (html + body)
└── [lang]/
    ├── layout.tsx      → layout de langue (Header + Footer)
    └── page.tsx        → page d'accueil /fr ou /en
```

> **Différence avec Rails :** En Rails, les routes sont déclarées dans `config/routes.rb`. En Next.js, la structure des dossiers EST la déclaration des routes.

---

### Atomic Design
*Méthodologie d'organisation des composants UI.*

| Niveau | Dossier | Exemples |
|---|---|---|
| Atomes | `components/ui/` | `Button`, `Chip`, `Card` |
| Molécules | `components/ui/` | `ProjectCard` (Card + Chip + Button) |
| Organismes | `components/sections/` | `Hero`, `Projects`, `Contact` |
| Templates | `components/layout/` | `Header`, `Footer` |

Règle : un atome ne contient pas de logique métier. Il reçoit tout via props.

---

### `async` / `await` dans les composants
*Next.js App Router permet des composants Server asynchrones.*

```tsx
// ✅ Autorisé — Server Component async
export default async function Page() {
  const data = await fetchSomething()
  return <div>{data}</div>
}

// ❌ Interdit — Client Component async
'use client'
export default async function Page() { ... } // erreur !
```

Les `async` components sont une particularité de Next.js — impossible dans React "pur".

---

### Composant Server vs Client

| | Server Component | Client Component |
|---|---|---|
| Par défaut | ✅ Oui | ❌ Non |
| Directive | *(rien)* | `'use client'` en haut |
| Accès BDD / API | ✅ Oui | ❌ Non |
| `useState`, `useEffect` | ❌ Non | ✅ Oui |
| Événements (`onClick`) | ❌ Non | ✅ Oui |
| Animations Framer Motion | ❌ Non | ✅ Oui |

**Règle :** Server Component par défaut. N'ajouter `'use client'` que si le composant a besoin d'interactivité ou de hooks React.

---

### `generateStaticParams`
*Indique à Next.js quelles routes dynamiques générer.*

```tsx
// app/[lang]/layout.tsx
export async function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }]
}
```

Sans cette fonction, Next.js ne saurait pas que `/fr` et `/en` existent. C'est l'équivalent de déclarer des routes dans Rails.

---

### Glassmorphism
*Effet "verre dépoli" utilisé sur le Header et les modals.*

Recette exacte du design system "Kinetic Luminescence" :
```css
background: color-mix(in srgb, var(--color-surface-variant) 60%, transparent);
backdrop-filter: blur(24px);
```

L'élément laisse transparaître le contenu derrière lui, avec un léger flou. À utiliser uniquement sur les éléments flottants (navbar, modals).

---

### Hot Reload / HMR
*Le serveur de développement met à jour la page automatiquement à chaque sauvegarde.*

Tu n'as pas besoin de rafraîchir manuellement — **sauf** dans ces cas :
- Tu ajoutes un nouveau dossier (parfois non détecté → redémarrer)
- Tu modifies `next.config.ts`
- Tu vides le cache `.next/`

**Configuration actuelle (Windows) :** `WATCHPACK_POLLING=true next dev --webpack`
→ le polling force la vérification active des fichiers toutes les secondes, contournant les événements natifs Windows qui sont peu fiables. Sans ça, les changements ne sont détectés qu'au redémarrage du serveur.

Quand le hot reload ne suffit pas → `rm -rf .next && npm run dev`.

---

### i18n
*Internationalisation — gestion du multilingue.*

Notre stratégie :
- La route `/fr` → contenu en français (langue par défaut)
- La route `/en` → contenu en anglais
- Les traductions UI sont dans `data/i18n/fr.ts` et `data/i18n/en.ts`
- Le segment `[lang]` dans l'URL est un paramètre dynamique récupéré via `params`

```tsx
// Récupérer la langue dans une page
export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params // 'fr' ou 'en'
}
```

---

### `LayoutProps` / `PageProps`
*Types TypeScript générés automatiquement par Next.js pour typer les composants.*

```tsx
// Page
export default async function Page({ params }: PageProps<'/[lang]'>) { ... }

// Layout
export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) { ... }
```

Ces types viennent de `.next/dev/types/routes.d.ts` — un fichier **auto-généré** par Next.js. Si ce fichier est corrompu ou vide, les routes retournent 404. Solution : `rm -rf .next`.

---

### `next/font`
*Chargement optimisé des polices Google Fonts.*

```tsx
import { Space_Grotesk, Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
```

Avantages vs un simple `<link>` Google Fonts :
- Zéro requête externe (polices téléchargées et servies localement)
- Pas de layout shift (les polices sont prêtes avant l'affichage)
- Score Lighthouse meilleur

---

### `next/image`
*Composant Image optimisé — obligatoire dans ce projet.*

```tsx
import Image from 'next/image'

<Image src="/photo.jpg" alt="Description" width={800} height={600} />
```

Jamais de `<img>` nue. `next/image` :
- Convertit automatiquement en WebP/AVIF
- Fait du lazy loading
- Évite le layout shift (réserve l'espace avant le chargement)

---

### `next/link`
*Composant de navigation — remplace `<a>` pour les liens internes.*

```tsx
import Link from 'next/link'

<Link href="/fr/projects">Voir mes projets</Link>
```

Avantage : prefetch automatique de la page cible. Le clic est instantané car la page est déjà chargée en arrière-plan.

Pour les liens **externes** (GitHub, LinkedIn), utiliser `<a>` classique avec `target="_blank" rel="noopener noreferrer"`.

---

### Proxy (middleware)
*Code qui s'exécute avant chaque requête — `proxy.ts` à la racine.*

> En Next.js 16, le middleware s'appelle **Proxy** (renommé depuis Next.js 15).

Notre `proxy.ts` redirige automatiquement `/` vers `/fr` si aucune locale n'est détectée dans l'URL.

```ts
export function proxy(request: NextRequest) {
  // Si l'URL n'a pas déjà /fr ou /en → rediriger vers /fr
}
export const config = { matcher: [...] } // sur quelles routes s'applique
```

---

### `process.env`
*Accès aux variables d'environnement.*

Deux types de variables :

| Préfixe | Accessible | Usage |
|---|---|---|
| `NEXT_PUBLIC_` | Partout (client + serveur) | Email de contact, URL publique |
| *(sans préfixe)* | Serveur uniquement | Clés API secrètes |

Nos variables sont dans `app/.env.local` (non commité) et documentées dans `app/.env.local.example`.

```ts
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
```

---

### `'use client'`
*Directive qui transforme un Server Component en Client Component.*

```tsx
'use client' // ← doit être la toute première ligne du fichier

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

À n'utiliser que si le composant a besoin de : `useState`, `useEffect`, `useRef`, gestionnaires d'événements (`onClick`, `onChange`...), ou animations Framer Motion.

---

### Tailwind CSS v4
*Framework CSS utilitaire — version 4 avec nouvelle syntaxe.*

Au lieu d'écrire du CSS custom, on applique des classes directement dans le JSX :

```tsx
<div className="flex items-center gap-4 rounded-xl bg-surface-container-high px-6 py-4">
```

Chaque classe correspond à une règle CSS :
- `flex` → `display: flex`
- `items-center` → `align-items: center`
- `gap-4` → `gap: 1rem`
- `rounded-xl` → `border-radius: 0.75rem`

En v4, la configuration se fait directement dans le CSS (plus de `tailwind.config.js`).

---

### `@theme`
*Bloc de configuration Tailwind v4 dans le CSS.*

```css
/* app/globals.css */
@theme inline {
  --color-primary: #94aaff;
  --color-surface: #0e0e10;
}
```

Ces variables deviennent des classes Tailwind utilisables :
- `bg-primary` → `background-color: #94aaff`
- `text-surface` → `color: #0e0e10`
- `bg-primary/20` → primary à 20% d'opacité

---

### TypeScript strict
*Mode TypeScript le plus exigeant — zéro `any`.*

TypeScript ajoute des types sur JavaScript. En mode strict :
- Toutes les variables doivent avoir un type connu
- Pas de `any` (type "je m'en fiche")
- Les `null` et `undefined` doivent être gérés explicitement

```ts
// ❌ Interdit
const name: any = 'Valentin'

// ✅ Correct
const name: string = 'Valentin'

// ✅ Correct — valeur potentiellement nulle
const email: string | undefined = process.env.EMAIL
const safe = email ?? 'pas de mail'
```

---

### Turbopack
*Le compilateur ultra-rapide de Next.js 16 — activé par défaut avec `next dev`.*

Avantage : compilation incrémentale (ne recompile que ce qui a changé), démarrage rapide.  
Inconvénient : **son file watcher est défaillant sur Windows natif** — les modifications de fichiers ne sont pas détectées, le navigateur ne se met jamais à jour sans redémarrer le serveur.

**Décision prise en session 3 :** on désactive Turbopack et on revient à webpack avec polling :
```json
// package.json
"dev": "WATCHPACK_POLLING=true next dev --webpack"
```

Pour ré-activer Turbopack si besoin (Linux / Mac) : `"dev": "next dev"`.

Turbopack compile **à la demande** — seulement quand tu accèdes à une page pour la première fois.

---

═══════════════════════════════════════════════════════════
## 📁 Anatomie du Projet
═══════════════════════════════════════════════════════════

### Vue d'ensemble

```
Portfolio/
├── CLAUDE.md               → instructions pour Claude Code
├── carnetdebord.md         → journal de session (append-only)
├── codex.md                → ce fichier
├── governance/
│   ├── claude/             → handoff de session Claude
│   └── gemini/             → audits Gemini (lecture seule)
├── stitch/
│   └── DESIGN.md           → design system "Kinetic Luminescence" (référence absolue)
└── app/                    → projet Next.js (tout le code source)
    ├── app/                → App Router (pages + layouts)
    ├── components/         → composants React
    ├── data/               → données et traductions TypeScript
    ├── lib/                → utilitaires et hooks custom
    ├── assets/             → images statiques
    ├── public/             → fichiers publics (favicon, og:image...)
    ├── proxy.ts            → middleware (redirections i18n)
    ├── next.config.ts      → configuration Next.js
    └── globals.css         → styles globaux + design tokens Tailwind
```

---

### `app/` — pages et layouts

```
app/
├── layout.tsx          → ROOT layout : <html> + <body> + polices
├── page.tsx            → page "/" → redirige vers /fr
├── globals.css         → design tokens + reset CSS
├── favicon.ico
└── [lang]/
    ├── layout.tsx      → layout de langue : Header + Footer + validation locale
    └── page.tsx        → page d'accueil (/fr ou /en)
```

**Règle de lecture :** pour comprendre ce qui s'affiche sur `/fr`, lire dans l'ordre :
1. `app/layout.tsx` (le conteneur HTML)
2. `app/[lang]/layout.tsx` (Header, Footer, lang = 'fr')
3. `app/[lang]/page.tsx` (le contenu de la page)

---

### `components/` — interface

```
components/
├── ui/              → Atomes (Button, Chip, Card...)
├── layout/          → Header, Footer
└── sections/        → Hero, Projects, About, Contact (à venir)
```

---

### `data/` — contenu et traductions

```
data/
├── types.ts         → interfaces TypeScript (Project, Skill, Profile...)
├── projects.ts      → liste des projets
├── skills.ts        → compétences avec niveaux
├── profile.ts       → bio, nom, liens sociaux
└── i18n/
    ├── fr.ts        → toutes les traductions françaises
    ├── en.ts        → toutes les traductions anglaises
    └── index.ts     → getDictionary() — charge la bonne langue
```

**Règle :** aucun texte en dur dans les composants. Tout passe par `data/`.

---

### Fichiers racine

| Fichier | Rôle |
|---|---|
| `next.config.ts` | Configuration Next.js |
| `tsconfig.json` | Configuration TypeScript |
| `postcss.config.mjs` | Nécessaire pour Tailwind v4 |
| `.env.local` | Variables d'environnement locales (non commité) |
| `.env.local.example` | Template des variables d'environnement |
| `proxy.ts` | Middleware i18n |

---

═══════════════════════════════════════════════════════════
## 🏛️ Décisions d'Architecture
═══════════════════════════════════════════════════════════

### Pourquoi Next.js plutôt que Rails pour un portfolio

Rails est excellent pour les applications avec une base de données, des utilisateurs, de la logique métier. Un portfolio n'a besoin de rien de tout ça.

Next.js offre :
- **SSG (Static Site Generation)** : les pages sont générées une fois, servies en HTML pur. Ultra-rapide.
- **SEO natif** : métadonnées, JSON-LD, sitemap — tout est géré côté serveur.
- **Déploiement Vercel** : un `git push` suffit. Zéro configuration serveur.
- **Score Lighthouse 95+** : optimisation des images, polices, et assets built-in.

---

### Pourquoi App Router plutôt que Pages Router

App Router (Next.js 13+) est le futur de Next.js. Il permet :
- Les Server Components (moins de JS envoyé au navigateur)
- Les layouts persistants (le Header ne re-render pas entre les pages)
- Les composants `async` (fetch de données directement dans les composants)

Pages Router est l'ancien système, maintenu pour la compatibilité mais plus recommandé pour les nouveaux projets.

---

### Pourquoi TypeScript strict

Un portfolio est une vitrine technique. Utiliser TypeScript strict montre la maîtrise du typage. Avantages concrets :
- Les erreurs sont détectées à la compilation, pas en production
- L'autocomplétion est précise dans l'éditeur
- Le code est auto-documenté (les types décrivent les données)

---

### Pourquoi données en `.ts` plutôt qu'en MDX

MDX = Markdown + JSX. Utile pour des articles longs avec du formatage riche.

Pour 3-5 projets avec des descriptions courtes, des fichiers TypeScript structurés dans `/data/` sont :
- Plus performants (pas de parsing MDX au runtime)
- Plus sûrs (typés strictement)
- Plus simples (pas de dépendance supplémentaire)

---

═══════════════════════════════════════════════════════════
## 🔁 Patterns Récurrents
═══════════════════════════════════════════════════════════

### Créer un nouveau composant UI

1. Créer le fichier dans `components/ui/NomComposant.tsx`
2. Si le composant a des interactions → ajouter `'use client'` en première ligne
3. Typer les props avec une interface
4. Exporter avec un export nommé (pas default)

```tsx
// components/ui/Badge.tsx
interface BadgeProps {
  label: string
  variant?: 'success' | 'warning'
}

export function Badge({ label, variant = 'success' }: BadgeProps) {
  return <span className="...">{label}</span>
}
```

---

### Ajouter une traduction

1. Ajouter la clé dans `data/i18n/fr.ts`
2. Ajouter la même clé dans `data/i18n/en.ts` (TypeScript signalera l'oubli)
3. Utiliser via `dict.nomSection.nomClé` dans le composant

```ts
// data/i18n/fr.ts
export const fr = {
  hero: {
    title: 'Bonjour, je suis Valentin',
    cta: 'Voir mes projets',
  }
}
```

---

### Ajouter un projet

Dans `data/projects.ts`, ajouter un objet à la fin du tableau `projects` :

```ts
{
  id: 'nom-projet',          // slug URL (pas d'espaces, pas d'accents)
  title: 'Nom du Projet',
  description: {
    fr: 'Résumé court en français.',
    en: 'Short summary in English.', // TODO Phase 7 si pas encore traduit
  },
  longDescription: {
    fr: 'Description longue en français.',
    en: 'Long description in English.',
  },
  stack: ['Ruby', 'Sinatra'],
  role: 'fullstack',         // 'fullstack' | 'frontend' | 'backend' | 'lead'
  status: 'completed',       // 'completed' | 'in_progress' | 'archived'
  repoUrl: 'https://github.com/...',
  liveUrl: 'https://...',    // optionnel
  teamProject: false,
  featured: true,            // apparaît sur la page d'accueil si true
  year: 2026,
}
```

> `description` et `longDescription` sont de type `LocalizedString` — voir le pattern dédié ci-dessous.

---

### LocalizedString et `t()`

Tous les champs de données bilingues utilisent le type `LocalizedString` :

```ts
// data/types.ts
export type LocalizedString = { fr: string; en: string }
```

Champs concernés : `Project.description`, `Project.longDescription`, `Profile.title`, `Profile.bio`.

Pour afficher la bonne version dans un composant, utiliser le helper `t()` de `lib/i18n.ts` :

```tsx
import { t } from '@/lib/i18n'

// Dans un composant qui reçoit `lang` en prop :
<p>{t(project.description, lang)}</p>
<h2>{t(profile.title, lang)}</h2>
```

`t()` retourne `text.en` si `lang === 'en'`, sinon `text.fr`.

---

═══════════════════════════════════════════════════════════
## ⚠️ Pièges à Éviter
═══════════════════════════════════════════════════════════

### Piège : apostrophes dans une string TypeScript

**Problème :** Une string délimitée par des guillemets simples (`'`) qui contient des apostrophes françaises (`d'accord`, `l'interface`) casse le parsing.

```ts
// ❌ Cassé
bio: 'Passionné par la création d'interfaces...'
//                              ^ ferme la string trop tôt !

// ✅ Correct — utiliser des guillemets doubles
bio: "Passionné par la création d'interfaces..."

// ✅ Aussi correct — template literal
bio: `Passionné par la création d'interfaces...`
```

**Règle :** Pour les chaînes contenant du texte français, toujours utiliser des guillemets doubles ou des backticks.

---

### Piège : cache `.next/` corrompu

**Symptôme :** 404 inexplicable sur `/fr`, même avec le bon code. Types générés vides (`AppRoutes = never`).

**Cause :** Sous WSL (Linux sur Windows), les écritures simultanées sur le système de fichiers NTFS peuvent corrompre les fichiers du cache.

**Solution :**
```bash
rm -rf .next && npm run dev
```

**À faire en premier** dès qu'un comportement est inexplicable en dev.

---

### Piège : Turbopack file watcher cassé sur Windows

**Symptôme :** Modifications de fichiers non détectées — le navigateur ne se met jamais à jour automatiquement. Même un `rm -rf .next` suivi d'un redémarrage ne suffit pas toujours.

**Cause :** Le file watcher de Turbopack utilise les événements natifs du système de fichiers Windows (`ReadDirectoryChangesW`), qui sont peu fiables sur certaines configurations Windows (Desktop, antivirus actif, etc.).

**Solution (appliquée en session 3) :**
```json
// package.json
"dev": "WATCHPACK_POLLING=true next dev --webpack"
```

- `--webpack` : désactive Turbopack, revient à webpack
- `WATCHPACK_POLLING=true` : active le polling (vérification toutes les ~1s) au lieu des événements natifs

**À retenir :** Cette config est permanente pour ce projet sur Windows. Ne pas supprimer le `--webpack` pour "essayer Turbopack" sans avoir vérifié que le file watcher fonctionne.

---

### Piège : oublier de redémarrer le dev server

Certains changements nécessitent un redémarrage complet (`Ctrl+C` + `npm run dev`) :
- Modification de `next.config.ts`
- Ajout d'une variable d'environnement dans `.env.local`
- Changement dans un layout (parfois le hot reload ne suffit pas)

Le hot reload gère les modifications de composants et de styles, mais pas la configuration.

---

### Piège : `'use client'` trop tôt

**Mauvaise réflexe :** ajouter `'use client'` dès qu'il y a une erreur, pour "forcer" le rendu côté client.

**Conséquences :**
- Le composant et tous ses enfants perdent les avantages du Server Rendering
- Plus de JS envoyé au navigateur → Lighthouse score en baisse
- Impossible d'utiliser `async/await` directement dans le composant

**Règle :** N'ajouter `'use client'` que si le composant utilise explicitement `useState`, `useEffect`, `useRef`, ou des événements (`onClick`, etc.).

---

### Piège : email en clair dans le code

**Problème :** Le dépôt GitHub est public. Un email en dur dans le code sera indexé par les moteurs de recherche et les bots.

**Solution :** Variable d'environnement dans `.env.local` (non commité) :
```ts
// ✅ Correct
const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''
```

`.env.local` est dans le `.gitignore`. Le template est dans `.env.local.example`.

---

### Piège : balise `<img>` nue

```tsx
// ❌ Jamais
<img src="/photo.jpg" alt="moi" />

// ✅ Toujours
import Image from 'next/image'
<Image src="/photo.jpg" alt="moi" width={400} height={400} />
```

`next/image` optimise automatiquement (WebP, lazy loading, réservation d'espace). La balise `<img>` nue pénalise le score Lighthouse.

---

*Document mis à jour au fil des sessions. Chaque piège rencontré en pratique mérite une entrée.*
