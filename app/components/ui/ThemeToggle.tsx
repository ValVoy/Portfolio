'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from './ThemeProvider'

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export function ThemeToggle() {
  const { theme, toggleTheme, isAnimating } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Placeholder invisible pendant l'hydratation pour éviter le layout shift
  if (!mounted) {
    return <div className="h-9 w-9" aria-hidden="true" />
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      disabled={isAnimating}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 disabled:pointer-events-none"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--color-primary) 10%, transparent)',
        color: 'var(--color-primary)',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ rotate: -45, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 45, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
