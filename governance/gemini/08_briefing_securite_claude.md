# Briefing SÃ©curitÃ© & AmÃ©liorations Techniques â€” Pour Claude

**Ã‰metteur :** Gemini CLI (Senior QA & Security Auditor)
**Destinataire :** Claude (Lead Developer)
**Contexte :** Audit de SÃ©curitÃ© Post-Session 5 (Phase 5-6-7)
**Statut :** PRIORITAIRE âš ï¸

> **IMPORTANT :** Avant de traiter ce briefing, tu DOIS lire le rapport complet de l'audit de session : **`governance/gemini/07_audit_session_5.md`**. Ce briefing en est le complÃ©ment critique focalisÃ© sur la sÃ©curitÃ©.

---

## 1. Objectif
Ce document rÃ©capitule les points critiques de sÃ©curitÃ© et les dettes techniques identifiÃ©s lors de l'audit de fin de session 5. Claude devra traiter ces points lors de sa prochaine intervention avant tout dÃ©ploiement final en production.

---

## 2. Actions Prioritaires (SÃ©curitÃ© & Architecture)

### A. Centralisation de l'URL de Base (Variable d'Environnement)
L'URL `https://portfolio.vercel.app` est actuellement codÃ©e en dur dans **11 fichiers**. Cela prÃ©sente un risque pour le SEO (liens canoniques) et la validitÃ© des mÃ©tadonnÃ©es en cas de changement de domaine.
- **Action :** CrÃ©er une variable d'environnement `NEXT_PUBLIC_SITE_URL`.
- **Fichiers impactÃ©s :** 
    - `app/app/[lang]/layout.tsx`
    - `app/app/[lang]/page.tsx`
    - `app/app/[lang]/projects/[id]/page.tsx`
    - `app/app/sitemap.ts`
    - `app/app/robots.ts`

### B. Durcissement de la Content Security Policy (CSP)
Les headers de sÃ©curitÃ© actuels sont bons, mais il manque une CSP stricte pour mitiger les risques d'injections (XSS).
- **Action :** Ajouter une `Content-Security-Policy` dans les headers de `next.config.ts`.
- **Cible :** `default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self';` (Ã€ ajuster selon les besoins de Framer Motion et des images externes).

---

## 3. ConformitÃ© i18n & Dettes Techniques

### A. Localisation des RÃ´les de Projet
Les labels de rÃ´les (`Lead`, `Fullstack`, `Frontend`, etc.) sont codÃ©s en dur dans `app/app/[lang]/projects/[id]/page.tsx`.
- **Action :** DÃ©placer l'objet `roleLabel` dans les dictionnaires `fr.ts` et `en.ts` pour garantir une expÃ©rience utilisateur 100% traduite.

### B. Couplage des Animations (Theme Mode)
La logique de `setTimeout` dans `ThemeProvider.tsx` est actuellement couplÃ©e manuellement Ã  la durÃ©e dÃ©finie dans `ThemeTransition.tsx`.
- **Action :** Centraliser la constante `DURATION` ou synchroniser ces valeurs pour Ã©viter un dÃ©calage visuel lors d'une future modification de la vitesse de transition.

---

## 4. Consultation StratÃ©gique : Choix de la Licence (PI)
Le projet va Ãªtre poussÃ© sur GitHub (Public). Nous devons dÃ©finir le cadre lÃ©gal de rÃ©utilisation du code. L'utilisateur hÃ©site entre deux approches et souhaite ton avis de Lead Developer :

- **Option A (Recommandation Gemini) : "All Rights Reserved" (Copyright)**
    - *Pourquoi :* ProtÃ¨ge l'identitÃ© visuelle unique "Kinetic Luminescence" et empÃªche le "clone" pur et simple du portfolio par des tiers.
- **Option B : Licence MIT (Open Source)**
    - *Pourquoi :* Favorise le partage, montre une culture de contribution et permet Ã  d'autres de s'inspirer techniquement de tes implÃ©mentations (RAF loop, i18n structure).

**Question pour Claude :** Quelle est ta recommandation ? Est-il prÃ©fÃ©rable de protÃ©ger le design tout en exposant le code, ou d'ouvrir totalement le projet pour en faire une rÃ©fÃ©rence communautaire ?

---

## 5. Rappel : HygiÃ¨ne de la Supply Chain
Avant tout `vercel --prod` :
- ExÃ©cuter un `npm audit` pour vÃ©rifier d'Ã©ventuelles vulnÃ©rabilitÃ©s critiques introduites par les packages.
- S'assurer que `NEXT_PUBLIC_CONTACT_EMAIL` est correctement provisionnÃ© dans l'environnement de build.

---

**Note de Gemini :** Le projet est globalement trÃ¨s sain. La rÃ©solution de ces points permettra d'atteindre un score de sÃ©curitÃ© et de maintenabilitÃ© de 100% avant la mise en ligne publique.
