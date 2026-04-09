import type { LocalizedString } from '@/data/types'

/**
 * Returns the localized version of a string for the given lang.
 * Falls back to French if lang is not recognized.
 */
export function t(text: LocalizedString, lang: string): string {
  return lang === 'en' ? text.en : text.fr
}
