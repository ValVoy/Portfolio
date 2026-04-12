export const fr = {
  home: {
    tagline: 'Portfolio — en construction',
  },
  hero: {
    cta: 'Voir mes projets',
    ctaSecondary: 'Me contacter',
    availability: 'Disponible pour de nouvelles opportunités',
  },
  nav: {
    projects: 'Projets',
    about: 'À propos',
    contact: 'Contact',
    langSwitch: 'EN',
  },
  footer: {
    madeWith: 'Fait avec',
    rights: 'Tous droits réservés',
  },
  projects: {
    title: 'Projets',
    subtitle: 'Une sélection de réalisations récentes',
    statusInProgress: 'En cours',
    statusCompleted: 'Terminé',
    team: 'Équipe',
    solo: 'Solo',
    viewCode: 'Code source',
    viewLive: 'Voir la démo',
  },
  about: {
    title: 'À propos',
    subtitle: 'Mon parcours & mes compétences',
    formation: 'Formation',
    formationDetail: 'The Hacking Project — Développeur web fullstack',
    location: 'Localisation',
    skills: {
      language: 'Langages',
      framework: 'Frameworks & Bibliothèques',
      tool: 'Outils',
    },
  },
  contact: {
    title: 'Contact',
    subtitle: "Vous avez un projet ou une opportunité\u00a0? Je suis disponible.",
    cta: "M'écrire un email",
  },
  project: {
    back: '← Retour aux projets',
    roleLabel: 'Rôle',
    typeLabel: 'Type',
    yearLabel: 'Année',
    openRepo: 'Code source',
    openLive: 'Voir la démo',
  },
} as const

export type Dictionary = typeof fr
