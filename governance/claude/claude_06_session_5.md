# claude_06 — Session 5

**Date :** 12-04-2026
**Auteur :** Claude (Lead Developer)
**Statut :** Terminée ✅
**Commit :** `55a03b6`

---

## Contexte de reprise

**Dernier commit au démarrage :** `b395a33` — Fix async params opengraph-image.tsx (audit Gemini #06)
**Dernier audit Gemini :** `06_audit_session_4.md` — Statut CONFORME ✅

---

## Features livrées

### Phase 5 — Lighthouse 95+ (finalisée)
- `@theme` sans `inline` → fix critique : classes Tailwind utilisent `var()` au lieu de valeurs hardcodées, rendant le theming dynamique possible
- Token `--color-nav-bg` dédié (crème intermédiaire en light, surface-container en dark)
- Token `--color-glow-ambient` : bleu (`var(--color-primary)`) en dark, ocre (`var(--color-tertiary)` = `#9a4100`) en light
- Skip nav link (`.skip-link`), `aria-controls`, `aria-label` sur icônes, `focus-visible` global
- Security headers dans `next.config.ts` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- `display: 'swap'` sur les fonts, `compress: true`, `poweredByHeader: false`
- Canonical + viewport/theme-color dans metadata

### Phase 5 — Dark/Light mode avec animation
- `ThemeProvider` : `useLayoutEffect` pour anti-flash, lecture localStorage, `data-theme` sur `<html>`
- `ThemeToggle` : icônes soleil/lune avec `AnimatePresence mode="wait"`
- `ThemeTransition` : boucle RAF + `easeInOutSine` sur `--color-surface`, palettes `SKY_TO_LIGHT` / `SKY_TO_DARK` (8 stops)
- `CelestialGlow` : sphère radial-gradient 2.5× viewport, arc de trajectoire hors viewport (halo seul visible)
- Palette light "Architectural Archivist" : surface `#f5f1eb`, cards `#ffffff`, primary `#1a4fd7`, tertiary `#9a4100`

### Fixes visuels (suite à screenshots vdark/vlight)
- Titre Hero invisible en light → résolu par le fix `@theme` (sans `inline`)
- Découpage des sections en dark → ellipses de glow réduites (40%/35% au lieu de 60%/50%) sans `overflow-hidden`
- Navbar trop blanche en light → `--color-nav-bg` = `surface-container-low` (`#f9f6f1`)

### Phase 6 — Pages détail projets
- Route `app/app/[lang]/projects/[id]/page.tsx` (Server Component)
- `generateStaticParams` : toutes combinaisons lang × project.id
- `generateMetadata` dynamique par projet
- Layout : hero (titre Display-LG, badges méta), visuel large, content 2 colonnes (description + sidebar stack)
- `ProjectImage` : `next/image` si `image` fourni, sinon placeholder dégradé avec initiales du projet
- `ProjectCard` : titre → `<Link>` vers la page détail, thumbnail `ProjectImage` en haut
- Sitemap enrichi avec toutes les URLs de pages projet (FR + EN)

### Phase 6 — Switcher de langue context-aware
- `usePathname()` dans `Header.tsx`
- Remplace le segment `/${lang}` dans l'URL courante → `/fr/projects/x` → `/en/projects/x`

### Phase 7 — Traductions EN
- `project` section ajoutée dans `fr.ts` et `en.ts` (back, roleLabel, typeLabel, yearLabel, openRepo, openLive)
- `// TODO Phase 7` supprimés de `projects.ts` et `profile.ts`
- `en.ts` validé complet par typage `Dictionary`

---

## Décisions techniques prises

| Décision | Raison |
|---|---|
| `@theme` sans `inline` (Tailwind v4) | `@theme inline` génère des valeurs hardcodées dans les utilities → impossible d'overrider via `[data-theme]`. Sans `inline`, les utilities utilisent `var()` → theming dynamique fonctionnel |
| RAF loop pour animation `--color-surface` | Plus fluide que Framer Motion `animate()` pour les CSS custom properties — garanti 60fps |
| Glow ambiant sans `overflow-hidden` | `overflow-hidden` créait une arête dure visible à la jonction des sections. Solution : ellipses plus petites qui ne débordent pas naturellement |
| `usePathname()` pour le switcher de langue | Évite de propager `id` de projet dans toute la hiérarchie de props. Simple et générique pour toutes les routes futures |
| `ProjectImage` composant dédié | Respecte la règle "Un composant = un fichier". Encapsule la logique image réelle vs placeholder. Réutilisable dans card et page détail |

---

## Incidents & résolutions

| Incident | Cause | Résolution |
|---|---|---|
| Titre Hero invisible en light mode | `@theme inline` hardcodait `color: #f6f3f5` dans `.text-on-surface` | Suppression du mot-clé `inline` dans `globals.css` |
| Trait visible entre About et Contact | `overflow-hidden` crée une arête dure au bord des sections | Suppression de `overflow-hidden`, réduction des ellipses de glow |
| Switcher de langue → retour accueil | `Header` construisait `/${otherLang}` sans connaître la route courante | `usePathname().replace()` pour remplacer le segment langue |
| `primary-fixed-dim` invisible en light | `#b6c4ff` quasi-invisible sur fond crème `#f5f1eb` | Changé en `#3e6af1` en light mode |

---

## Prochaines étapes

- **Phase 8** — Déploiement Vercel
  - `vercel --prod` ou via dashboard
  - Remplacer `https://portfolio.vercel.app` par la vraie URL dans : `app/app/[lang]/layout.tsx`, `app/app/[lang]/page.tsx`, `app/app/[lang]/projects/[id]/page.tsx`, `app/app/sitemap.ts`
- **Visuels projets** — Ajouter screenshots dans `/public/projects/` et renseigner `image` dans `data/projects.ts`
- **Transition light→dark** — Utilisateur a dit "on retravaillera ça plus tard"
- **Audit Gemini session 5** — À soumettre maintenant
