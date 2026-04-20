import type { Skill } from './types'

export const skills: Skill[] = [
  // Langages
  { name: 'Ruby', category: 'language', level: 80 },
  { name: 'HTML', category: 'language', level: 90 },
  { name: 'CSS', category: 'language', level: 85 },
  { name: 'JavaScript', category: 'language', level: 65 },
  { name: 'TypeScript', category: 'language', level: 50 },
  { name: 'SQL', category: 'language', level: 60 },

  // Frameworks & librairies
  { name: 'Ruby on Rails', category: 'framework', level: 75 },
  { name: 'Sinatra', category: 'framework', level: 70 },
  { name: 'Hotwire (Turbo + Stimulus)', category: 'framework', level: 65 },
  { name: 'Next.js', category: 'framework', level: 40 },
  { name: 'Tailwind CSS', category: 'framework', level: 75 },

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
