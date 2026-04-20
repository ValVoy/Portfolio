import type { Profile } from './types'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? ''

export const profile: Profile = {
  name: 'Valentin Chéron',
  title: {
    fr: 'Développeur fullstack × IA',
    en: 'Fullstack developer × AI',
  },
  bio: {
    fr: "Développeur web formé à The Hacking Project, je construis des applications fullstack en tirant parti de l'IA comme levier de productivité et de qualité. À l'aise sur Ruby on Rails et Next.js, j'utilise Claude, Gemini et OpenAI pour livrer plus vite et mieux qu'en solo.",
    en: "Web developer trained at The Hacking Project, I build fullstack applications by leveraging AI as a productivity and quality multiplier. Comfortable with Ruby on Rails and Next.js, I use Claude, Gemini and OpenAI to ship faster and with a higher standard than I could alone.",
  },
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
