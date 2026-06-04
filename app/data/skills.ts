import type { Skill } from './types'

export const skills: Skill[] = [
  // Langages
  { name: 'Ruby', category: 'language', level: 80 },
  { name: 'HTML', category: 'language', level: 90 },
  { name: 'CSS', category: 'language', level: 85 },
  { name: 'JavaScript', category: 'language', level: 70 },
  { name: 'TypeScript', category: 'language', level: 70 },
  { name: 'SQL', category: 'language', level: 65 },

  // Frameworks & librairies
  { name: 'Next.js', category: 'framework', level: 70 },
  { name: 'Ruby on Rails', category: 'framework', level: 75 },
  { name: 'Tailwind CSS', category: 'framework', level: 85 },
  { name: 'Framer Motion', category: 'framework', level: 70 },
  { name: 'Drizzle ORM', category: 'framework', level: 65 },
  { name: 'Sinatra', category: 'framework', level: 70 },
  { name: 'Hotwire (Turbo + Stimulus)', category: 'framework', level: 65 },

  // Outils
  { name: 'Git / GitHub', category: 'tool', level: 75 },
  { name: 'Devise', category: 'tool', level: 65 },
  { name: 'Notion', category: 'tool', level: 85 },

  // IA
  { name: 'Claude', category: 'ai', level: 90 },
  { name: 'Gemini', category: 'ai', level: 75 },
  { name: 'OpenAI', category: 'ai', level: 75 },
]

export const skillsByCategory = {
  language: skills.filter((s) => s.category === 'language'),
  framework: skills.filter((s) => s.category === 'framework'),
  tool: skills.filter((s) => s.category === 'tool'),
  ai: skills.filter((s) => s.category === 'ai'),
}
