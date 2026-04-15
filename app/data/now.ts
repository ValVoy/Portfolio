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
}

export interface NowProject {
  title: string
  description: { fr: string; en: string }
  stack: string[]
  /** null tant que le repo n'est pas public */
  repoUrl: string | null
}

export const now: {
  updatedAt: string
  project: NowProject
  items: NowItem[]
} = {
  /** Format JJ/MM/AAAA */
  updatedAt: '15/04/2026',

  project: {
    title: 'LifeOs',
    description: {
      fr: 'ERP personnel multi-tenant pour gérer vie pro, famille, études et contenus depuis une seule app. Ruby on Rails 8, Hotwire, architecture modulaire.',
      en: 'Personal multi-tenant ERP to manage work, family, studies and content from one app. Ruby on Rails 8, Hotwire, modular architecture.',
    },
    stack: ['Ruby on Rails 8', 'Hotwire', 'Tailwind v4', 'SQLite'],
    repoUrl: null, // Renseigner quand le repo sera public
  },

  items: [
    {
      label: { fr: "J'explore", en: 'Exploring' },
      content: {
        fr: 'JavaScript fondamental → TypeScript : consolider le DOM, ES6+ et l\'architecture modulaire avant de typer fort',
        en: 'Fundamentals to TypeScript: solidifying DOM, ES6+ and modular architecture before going type-safe',
      },
    },
    {
      label: { fr: 'Je lis', en: 'Reading' },
      content: {
        fr: 'Conte de fées de Stephen King',
        en: 'Fairy Tale by Stephen King',
      },
      href: {
        fr: 'https://www.amazon.fr/Conte-f%C3%A9es-Stephen-King/dp/2253909130/ref=tmm_mmp_swatch_0',
        en: 'https://www.amazon.fr/Fairy-Tale-Stephen-King/dp/1668024543/ref=tmm_pap_swatch_0',
      },
    },
  ],
}
