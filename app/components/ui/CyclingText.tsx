'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface CyclingTextProps {
  words: string[]
  className?: string
  style?: React.CSSProperties
}

export function CyclingText({ words, className, style }: CyclingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, 2800)
    return () => clearInterval(id)
  }, [words.length])

  // Le mot le plus long sert de spacer invisible pour stabiliser la largeur
  const longestWord = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span
      className={className}
      style={{ ...style, position: 'relative', display: 'inline-flex', alignItems: 'center' }}
    >
      {/* Spacer invisible — fixe la largeur au mot le plus long */}
      <span aria-hidden style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>
        {longestWord}
      </span>

      {/* Texte animé — superposé au spacer */}
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 14, opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: -14, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', left: 0, whiteSpace: 'nowrap' }}
          aria-live="polite"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
