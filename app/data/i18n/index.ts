import 'server-only'
import type { Dictionary } from './fr'

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  fr: () => import('./fr').then((m) => m.fr),
  en: () => import('./en').then((m) => m.en),
}

export type Locale = keyof typeof dictionaries

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]()
