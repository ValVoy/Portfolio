/**
 * Section "En ce moment" — à mettre à jour manuellement à chaque session.
 * - project.repoUrl : laisser null jusqu'au push GitHub, puis renseigner l'URL.
 * - items : liste de statuts courts (ce qu'on explore, ce qu'on lit...).
 */

export interface NowItem {
  label: { fr: string; en: string }
  content: { fr: string; en: string }
  /** Lien optionnel — peut être une string unique ou différent par langue */
  href?: string | { fr: string; en: string }
  /** Libellé du lien (défaut : « Voir le lien »). Ex : « Voir le site », « Voir sur Amazon ». */
  linkLabel?: { fr: string; en: string }
}

export type AvailabilityStatus = 'available' | 'open' | 'unavailable'

export interface NowProject {
  title: string
  description: { fr: string; en: string }
  stack: string[]
  screenshots: { dark: string; light: string }
  /** null tant que le repo n'est pas public */
  repoUrl: string | null
}

export const now: {
  updatedAt: string
  availability: {
    status: AvailabilityStatus
    label: { fr: string; en: string }
  }
  project: NowProject
  items: NowItem[]
} = {
  /** Format JJ/MM/AAAA */
  updatedAt: '04/06/2026',

  availability: {
    status: 'available',
    label: {
      fr: 'Disponible pour une mission',
      en: 'Available for a project',
    },
  },

  project: {
    title: 'LifeOS v3',
    description: {
      fr: 'Hub de vie multi-tenant : gestion pro (projets, timer, facturation), famille et perso depuis une seule app. Next.js 16, Drizzle ORM, auth multi-workspace, design system "Kinetic Luminescence".',
      en: 'Multi-tenant life hub: pro management (projects, timer, invoicing), family and personal, all in one app. Next.js 16, Drizzle ORM, multi-workspace auth, "Kinetic Luminescence" design system.',
    },
    stack: ['Next.js 16', 'TypeScript', 'Tailwind v4', 'Drizzle ORM', 'Better Auth', 'SQLite / Turso'],
    screenshots: {
      dark: '/now/lifeos-dark.png',
      light: '/now/lifeos-light.png',
    },
    repoUrl: null,
  },

  items: [
    {
      label: { fr: 'Je viens de livrer', en: 'Just shipped' },
      content: {
        fr: 'Pronos Coupe du Monde 2026 pour StormTeam, V1 en ligne : pronostics, classement temps réel et bracket automatisé',
        en: 'World Cup 2026 predictions app for StormTeam, V1 live: predictions, real-time leaderboard and automated bracket',
      },
      href: 'https://pronos.stormteam.fr',
      linkLabel: { fr: 'Voir le site', en: 'Visit the site' },
    },
    {
      label: { fr: "J'explore", en: 'Exploring' },
      content: {
        fr: 'Next.js 15/16 App Router en profondeur : Server Actions, multi-tenant auth avec Better Auth, Drizzle ORM et isolation stricte des données par workspace',
        en: 'Deep-diving Next.js 15/16 App Router: Server Actions, multi-tenant auth with Better Auth, Drizzle ORM and strict workspace-scoped data isolation',
      },
    },
    {
      label: { fr: 'Dernier livre lu', en: 'Last book read' },
      content: {
        fr: 'Conte de fées de Stephen King',
        en: 'Fairy Tale by Stephen King',
      },
      href: {
        fr: 'https://www.amazon.fr/Conte-f%C3%A9es-Stephen-King/dp/2253909130/ref=tmm_mmp_swatch_0',
        en: 'https://www.amazon.fr/Fairy-Tale-Stephen-King/dp/1668024543/ref=tmm_pap_swatch_0',
      },
      linkLabel: { fr: 'Voir sur Amazon', en: 'View on Amazon' },
    },
  ],
}
