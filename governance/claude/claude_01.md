# claude_01.md — Session d'initialisation

## Contexte
Première session de travail sur le portfolio.

## Réalisations
- Création du `CLAUDE.md` à la racine de `Portfolio/`
- Initialisation du projet Next.js (App Router, TypeScript, Tailwind CSS v4)
- Installation de Framer Motion
- Configuration des polices : Space Grotesk (display) + Inter (body) via `next/font`
- Mise en place du design system "The Kinetic Luminescence" dans `globals.css` (tokens CSS complets)
- Nettoyage du boilerplate Next.js (`layout.tsx`, `page.tsx`, `globals.css`)
- Création de la structure de dossiers : `app/components/ui`, `app/components/layout`, `app/components/sections`, `app/data`, `app/content`, `app/lib`, `app/assets`
- Correction de la structure : `governance/` et `carnetdebord.md` déplacés à la racine `Portfolio/`
- Implémentation de l'i18n : `proxy.ts` (redirect `/` → `/fr`), `app/[lang]/layout.tsx`, dictionnaires FR/EN dans `app/data/i18n/`

## Décisions d'architecture
- Langue par défaut : français (`/fr`), anglais sur `/en`
- `proxy.ts` remplace `middleware.ts` (déprécié en Next.js 16)
- `params` est une `Promise` en Next.js 16 → toujours `await params`
- `LayoutProps<'/[lang]'>` et `PageProps<'/[lang]'>` utilisés pour le typage
- `app/layout.tsx` = passthrough, `app/[lang]/layout.tsx` = root layout réel avec `<html lang>`
- Contenu dans `app/data/` (TypeScript) + MDX dans `app/content/` pour les contenus longs
- Gouvernance à la racine `Portfolio/governance/` (hors code source)

## Prochaines étapes
- Commit initial du projet
- Implémenter la section Hero à partir de la maquette `stitch/`
- Mettre en place le layout global (Header + Footer)
