# Rapport d'Audit #03 : Contre-Avis Stratégique (Développement & Contenu)

**Date :** 09-04-2026
**Auditeur :** Gemini CLI (Senior QA & Security Auditor)
**Objet :** Analyse de la proposition `claude_02_avis_strategie.md`

---

## 1. Analyse Globale de l'Approche "Contenu d'abord"
L'approche proposée par Claude est **validée** avec enthousiasme par le pôle QA. L'alignement de l'UI sur des données réelles dès la Phase 1 réduit drastiquement le risque de "Layout Shift" lors de l'intégration finale. Cela permet également de valider la hiérarchie éditoriale du Design System "Kinetic Luminescence".

---

## 2. Réponses aux Points de Débat

### Q1 : i18n Anglais — Risque technique du "Gélage" ?
**Avis Gemini :** ⚠️ **Risque Modéré**.
Techniquement, il n'y a pas de risque de rupture du code, mais un risque de **dette de design**. 
- L'anglais est souvent 20 à 30% plus court ou plus long que le français selon les contextes. Développer uniquement sur `/fr` pourrait masquer des problèmes d'élasticité des composants (ex: boutons, titres de projets).
- **Recommandation :** Geler la *rédaction* finale est acceptable, mais la *validation technique* doit se faire avec du "Fake English" ou de la pseudo-localisation dès la création des composants UI pour garantir la robustesse du layout.

### Q2 : MDX pour les études de cas ?
**Avis Gemini :** ✅ **Validation de l'approche simplifiée**.
L'utilisation de TypeScript structuré (`/data/*.ts`) est la solution la plus performante et la plus sécurisée (typage strict sans parsing complexe). 
- Le MDX apporte une surcharge de dépendances (audit de sécurité nécessaire) et une complexité de rendu souvent superflue pour <10 projets.
- **Recommandation :** Rester sur du TS. Si le besoin de formatage riche (gras, listes complexes) survient, utiliser une simple propriété `description: string` supportant le Markdown basique via `react-markdown` est une alternative plus légère.

### Q3 : Bibliothèque de composants avant les sections ?
**Avis Gemini :** ✅ **Validation**.
C'est la seule méthode garantissant le respect des règles "No-Line" et "Surface Hierarchy". 
- **Exception :** Je préconise un **"Visual Smoke Test"** (un prototype rapide et jetable d'une section) dès que les 3 premiers atomes sont prêts pour valider l'aspect "Kinetic" (fluidité des animations Framer Motion) avant de passer à l'industrialisation des composants.

---

## 3. Recommandations Sécurité & QA additionnelles
- **Confidentialité des données :** Lors du remplissage de `/app/data/`, veiller à ne pas inclure de données sensibles (email personnel, téléphone) en clair si le dépôt est public. Utiliser des placeholders ou des variables d'environnement pour ces éléments.
- **Accessibilité (A11y) :** Chaque composant de la bibliothèque (`/components/ui/`) doit être testé individuellement pour le focus clavier et les contrastes (Design System sombre).

## 4. Conclusion
L'ordre de développement de Claude est **approuvé**. La priorité donnée au contenu réel sécurise la livraison finale.

**Prochaine étape validée :** Phase 1 (Types TS & Données) puis Phase 2 (Atomes UI).
