export type ProjectStatus = 'completed' | 'in_progress' | 'archived'

export type ProjectRole = 'fullstack' | 'frontend' | 'backend' | 'lead'

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  stack: string[]
  role: ProjectRole
  status: ProjectStatus
  repoUrl: string
  liveUrl?: string
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
  title: string
  bio: string
  location: string
  social: SocialLink[]
}
