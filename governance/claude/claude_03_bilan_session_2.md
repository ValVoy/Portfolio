# claude_03 — Bilan Session 2

**Date :** 09-04-2026
**Auteur :** Claude (Lead Developer)
**Commits :** 9774f56 · f7e3741

---

## Features livrées

### Phase 1 — Données réelles [9774f56]
- `data/types.ts` : types `Project`, `Skill`, `Profile`, `SocialLink`
- `data/projects.ts` : 4 projets (Koï's Story featured, Chatbot OpenAI, Crazy Scrap, FreeDoc)
- `data/skills.ts` : 14 compétences avec niveau 0-100 par catégorie
- `data/profile.ts` : bio provisoire, GitHub/LinkedIn/email via env var
- `.env.local.example` : template pour `NEXT_PUBLIC_CONTACT_EMAIL`

### Phase 2 — Bibliothèque UI [9774f56]
- `components/ui/Button.tsx` : variantes primary / secondary / tertiary
- `components/ui/Chip.tsx` : pill tech stack
- `components/ui/Card.tsx` : standard + elevated (neon glow hover)
- Smoke test validé visuellement par l'utilisateur

### Phase 3 — Layout global [f7e3741]
- `components/layout/Header.tsx` : glassmorphism, nav, switcher FR/EN
- `components/layout/Footer.tsx` : GitHub, LinkedIn, copyright dynamique
- Fix root layout : `<html>`/`<body>` déplacés dans `app/layout.tsx`

### Hors phases
- `codex.md` créé à la racine Portfolio — référence pédagogique stack Next.js 16

---

## Incidents & résolutions

| Problème | Cause | Solution |
|---|---|---|
| 404 persistant sur /fr | `routes.d.ts` corrompu (WSL + NTFS) | `rm -rf .next` |
| 500 sur profile.ts | Apostrophes françaises dans string single-quote | Guillemets doubles |
| `getDictionary` dans layout causait 404 | Suspicion `server-only` + Turbopack | Traductions inline dans les composants |

---

## Décisions techniques prises

- Traductions Header/Footer en objet inline dans les composants (pas via `getDictionary`) — temporaire, à centraliser (Gemini #04)
- Bio en français uniquement pour l'instant — contenu EN gelé jusqu'à validation FR

---

## Prochaines étapes (Phase 4)

### Avant les sections — corrections Gemini #04
1. **Centraliser les traductions** : déplacer les libellés Header/Footer dans `fr.ts`/`en.ts`, et faire passer la dict via props depuis le layout
2. **Décider la structure i18n des données** : `{ fr: string, en: string }` dans chaque champ, ou fichiers séparés — à trancher avec l'utilisateur

### Phase 4 — Sections de page
- `sections/Hero.tsx` : nom, titre, CTA, photo
- `sections/Projects.tsx` : grille de ProjectCard avec les vraies données
- `sections/About.tsx` : bio, compétences avec niveaux
- `sections/Contact.tsx` : liens sociaux, formulaire ou mailto

---

## Note pédagogique
L'utilisateur vient de Ruby on Rails. Il a noté la différence de lisibilité des erreurs entre les deux stacks. Le `codex.md` a été créé pour l'aider à monter en compétence sur Next.js 16 + TypeScript + Tailwind v4.
