import type { Profile } from './types'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''

export const profile: Profile = {
  name: 'Valentin Chéron',
  title: {
    fr: 'Développeur web fullstack junior',
    en: 'Junior fullstack web developer',  },
  bio: {
    fr: "Développeur web junior formé à The Hacking Project, à l'aise avec Ruby on Rails et en train de monter en compétence sur React / Next.js. J'aime construire des interfaces soignées et des architectures lisibles.",
    en: "Junior web developer trained at The Hacking Project, comfortable with Ruby on Rails and currently levelling up on React / Next.js. I enjoy building clean interfaces and readable architectures.",  },
  location: 'France',
  social: [
    {
      platform: 'github',
      label: 'GitHub',
      url: 'https://github.com/ValVoy',
    },
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/valentin-cheron-b507851a3/',
    },
    {
      platform: 'email',
      label: 'Email',
      url: `mailto:${contactEmail}`,
    },
  ],
}
