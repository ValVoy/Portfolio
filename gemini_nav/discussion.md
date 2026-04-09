🔍 Éclaircissements techniques
1. Vercel, c'est quoi ?
C’est la plateforme de déploiement créée par les inventeurs de Next.js.

Le principe : Tu connectes ton dossier (via GitHub par exemple), et à chaque fois que tu sauvegardes ton travail, ton portfolio est mis à jour en ligne automatiquement. C'est ultra rapide, gratuit pour les portfolios, et gère tout (SSL, optimisation des images, etc.).

2. Atomic Design vs Ta structure
Oui, la division /ui, /layout, /sections est une adaptation pragmatique de l'Atomic Design pour Next.js :

UI (Atomes) : Boutons, inputs, titres isolés.

Sections (Molécules/Organismes) : Un bloc "À propos" ou une carte de projet.

Layout (Templates) : La structure fixe (le Header et le Footer qui entourent tes pages).

3. Le point 10 : Découpler le contenu (Data Files)
Au lieu d'écrire ton texte directement dans le code au milieu des balises HTML, on le met dans des fichiers à part (ex: projects.ts).

Avantage : Si tu veux changer une description de projet, tu ne touches pas au code risqué, tu changes juste du texte dans un fichier simple. Claude gérera l'affichage, Gemini vérifiera que les données sont bien structurées.

4. Le point 11 : MDX et Local
Le MDX, c'est du Markdown (comme ce qu'on écrit ici) mais qui permet d'insérer des composants React dedans. Pour un portfolio, c'est génial : tu rédiges tes études de cas comme un simple document texte, et le site les transforme en pages magnifiques. Le garder en local signifie qu'on n'utilise pas d'interface web externe (CMS) : tout reste dans ton dossier sur ton bureau.

5. Lighthouse : Le "Check-up" de Google
C’est l'outil de référence de Google pour mesurer la qualité d'un site. Il donne une note sur 100 dans 4 catégories : Performance, Accessibilité, Bonnes Pratiques et SEO.

Ton objectif : 95+ est un excellent compromis. Viser 100 partout est un défi technique stimulant, mais 95 garantit déjà que tu es dans le top du panier des développeurs.

---

🏗️ STACK & STRUCTURE
Initialisation : Le projet n'est pas initialisé. Claude, tu dois l'initialiser (Next.js, TypeScript, Tailwind, App Router).

Déploiement : Vercel.

Structure : Approche inspirée de l'Atomic Design : /components/ui, /components/layout, /components/sections. Le reste suit la convention Next.js (/app, /lib, /assets).

⚙️ GIT & WORKFLOW
Commits : Conventional Commits (feat:, fix:, etc.).

Branches : Une seule branche main (travail en solo).

Carnet de bord : Obligatoire. Doit suivre strictement les règles du projet LifeOs (reprise de l'historique, clarté des étapes, traçabilité totale).

🤖 COLLABORATION GEMINI
Organisation : Dossier /governance/ avec /claude/ pour la technique et /gemini/ pour l'audit/doc.

Fréquence d'audit : En fin de session uniquement. Gemini fera une revue globale de tout ce qui a été produit durant la séance de travail.

📝 CONTENU & SEO
Langue : Bilingue (Français/Anglais).

Stockage : Contenu découplé dans /data/ via des fichiers TypeScript pour les données simples (liste de projets, compétences).

Format : Utilisation de MDX en local pour les contenus longs (articles, études de cas de projets).

✅ TESTS & QUALITÉ
Tests : On s'appuie sur l'audit critique de Gemini en fin de session.

Cible Lighthouse : 95+ sur tous les critères. Gemini doit signaler tout ce qui fait descendre la note en dessous de ce seuil.