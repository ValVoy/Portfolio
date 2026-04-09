import type { Project } from './types'

export const projects: Project[] = [
  {
    id: 'kois-story',
    title: "Koï's Story",
    description:
      'Vitrine digitale pour une élevage de carpes koï de la lignée Konishi — catalogue filtrable, fiche produit, commande via WhatsApp et back-office admin.',
    longDescription:
      "Projet de fin de formation The Hacking Project. Plateforme de présentation et de prise de commande pour un élevage de carpes koï affilié à la lignée Konishi. Les visiteurs peuvent parcourir le catalogue, filtrer par variété, taille ou prix, et contacter le vendeur directement via WhatsApp en un clic. Comprend un back-office complet pour la gestion des koïs et des messages.",
    stack: ['Ruby on Rails', 'Hotwire', 'Turbo', 'Stimulus', 'SQLite', 'Devise', 'HTML', 'CSS'],
    role: 'frontend',
    status: 'in_progress',
    repoUrl: 'https://github.com/DevRedious/kois-story',
    liveUrl: 'https://lnvi1e1noiilgzfjsnwe7luj.137.74.112.197.sslip.io/',
    teamProject: true,
    featured: true,
    year: 2026,
  },
  {
    id: 'chatbot-openai',
    title: 'Chatbot OpenAI',
    description:
      'Chatbot en Ruby intégrant l'API OpenAI — entrée utilisateur en ligne de commande, réponses générées par GPT.',
    longDescription:
      'Projet réalisé durant la formation THP. Intégration de l'API OpenAI dans un script Ruby permettant de dialoguer avec un modèle GPT directement depuis le terminal. Gestion de la clé API, formatage des prompts et affichage des réponses.',
    stack: ['Ruby', 'OpenAI API'],
    role: 'fullstack',
    status: 'completed',
    repoUrl: 'https://github.com/ValVoy/THP---Chatbot-OpenAI',
    teamProject: false,
    featured: true,
    year: 2026,
  },
  {
    id: 'crazy-scrap',
    title: 'Crazy Scrap',
    description:
      'Scraper Ruby capable de collecter et structurer des données depuis des pages web cibles.',
    longDescription:
      'Projet de web scraping réalisé durant la formation THP. Le script Ruby collecte des données structurées depuis des pages web, les parse et les exporte dans un format exploitable. Utilisation de Nokogiri pour le parsing HTML.',
    stack: ['Ruby', 'Nokogiri'],
    role: 'fullstack',
    status: 'completed',
    repoUrl: 'https://github.com/ValVoy/THP---Crazy-Scrap',
    teamProject: false,
    featured: true,
    year: 2026,
  },
  {
    id: 'freedoc',
    title: 'FreeDoc',
    description:
      'Application Ruby de gestion de documents — premier projet full-stack avec modèles, vues et persistance.',
    longDescription:
      'Projet full-stack réalisé durant la formation THP. Application de gestion de documents permettant la création, consultation et organisation de fichiers. Premier projet structuré avec séparation des responsabilités (modèles, vues, logique métier) et persistance des données.',
    stack: ['Ruby', 'Sinatra', 'HTML', 'CSS'],
    role: 'fullstack',
    status: 'completed',
    repoUrl: 'https://github.com/ValVoy/THP---FreeDoc-Project',
    teamProject: false,
    featured: false,
    year: 2026,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
