'use client'

import { createContext, useContext, useState, useEffect, useLayoutEffect, useCallback, type ReactNode } from 'react'
import { THEME_SWITCH_MS, THEME_DURATION_MS } from '@/lib/theme-constants'

export type Theme = 'dark' | 'light'
export type TransitionDirection = 'to-light' | 'to-dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  isAnimating: boolean
  direction: TransitionDirection
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  isAnimating: false,
  direction: 'to-dark',
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState<TransitionDirection>('to-dark')
  const [mounted, setMounted] = useState(false)

  // useLayoutEffect s'exécute de façon synchrone avant le premier paint —
  // élimine le flash de thème sans nécessiter de script inline dans <head>
  useLayoutEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    const resolved = (saved === 'light' || saved === 'dark') ? saved : 'dark'
    setTheme(resolved)
    document.documentElement.setAttribute('data-theme', resolved)
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    if (isAnimating) return
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const dir: TransitionDirection = next === 'light' ? 'to-light' : 'to-dark'

    setDirection(dir)
    setIsAnimating(true)

    // Bascule le thème au point médian de l'animation (~44% de la durée totale)
    setTimeout(() => {
      setTheme(next)
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
    }, THEME_SWITCH_MS)

    setTimeout(() => {
      setIsAnimating(false)
    }, THEME_DURATION_MS)
  }, [theme, isAnimating])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isAnimating, direction }}>
      {/* Masque le toggle jusqu'au montage pour éviter le flash d'hydratation */}
      <div data-theme-mounted={mounted ? 'true' : 'false'}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
