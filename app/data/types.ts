export type LocalizedString = { fr: string; en: string }

export type ProjectStatus = 'completed' | 'in_progress' | 'archived'

export type ProjectRole = 'fullstack' | 'frontend' | 'backend' | 'lead'

export interface Project {
  id: string
  title: string
  description: LocalizedString
  longDescription: LocalizedString
  stack: string[]
  role: ProjectRole
  status: ProjectStatus
  repoUrl: string
  liveUrl?: string
  /** Chemin relatif depuis /public, ex: "/projects/kois-story.webp" */
  image?: string
  teamProject: boolean
  featured: boolean
  year: number
}

export type SkillCategory = 'language' | 'framework' | 'tool' | 'other'

export interface Skill {
  name: string
  category: SkillCategory
  /** Usage rate from 0 to 100 */
  level: number
}

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'email'
  label: string
  url: string
}

export interface Profile {
  name: string
  title: LocalizedString
  bio: LocalizedString
  location: string
  social: SocialLink[]
}
