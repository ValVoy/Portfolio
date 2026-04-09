import type { Profile } from './types'

/**
 * Email de contact — défini via la variable d'environnement NEXT_PUBLIC_CONTACT_EMAIL
 * (voir .env.local.example à la racine du projet)
 */
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''

export const profile: Profile = {
  name: 'Valentin Chéron',
  title: 'Développeur web junior',
  /**
   * TODO : rédiger la bio définitive.
   * Pistes : parcours THP, appétence pour le front-end, projets marquants, ce qui t'anime.
   */
  bio: 'Développeur web junior formé à The Hacking Project, passionné par la création d'interfaces soignées et d'applications utiles. À l'aise aussi bien en Ruby on Rails qu'en HTML/CSS, je construis des produits du backend jusqu'au pixel.',
  location: 'France',
  social: [
    {
      platform: 'github',
      label: 'ValVoy',
      url: 'https://github.com/ValVoy',
    },
    {
      platform: 'linkedin',
      label: 'Valentin Chéron',
      url: 'https://www.linkedin.com/in/valentin-cheron-b507851a3/',
    },
    {
      platform: 'email',
      label: contactEmail,
      url: `mailto:${contactEmail}`,
    },
  ],
}
