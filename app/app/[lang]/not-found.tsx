'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fr } from '@/data/i18n/fr'
import { en } from '@/data/i18n/en'
import { projects } from '@/data/projects'

const MONO = "'SF Mono', 'Fira Code', 'Fira Mono', 'Consolas', monospace"

const PROJECT_NAMES = projects
  .filter((p) => !p.placeholder)
  .map((p) => p.title)

function useTypewriter(words: string[]) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex]
    const TYPING_SPEED = 80
    const DELETING_SPEED = 40
    const HOLD_DELAY = 1400
    const NEXT_DELAY = 300

    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed === current) {
      // Fully typed — wait then start deleting
      timeout = setTimeout(() => setIsDeleting(true), HOLD_DELAY)
    } else if (isDeleting && displayed === '') {
      // Fully erased — move to next word
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((i) => (i + 1) % words.length)
      }, NEXT_DELAY)
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setDisplayed((d) => d.slice(0, -1)),
        DELETING_SPEED,
      )
    } else {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        TYPING_SPEED,
      )
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, wordIndex, words])

  return displayed
}

export default function NotFound() {
  const pathname = usePathname() ?? '/'
  const lang = pathname.startsWith('/en') ? 'en' : 'fr'
  const d = lang === 'fr' ? fr.notFound : en.notFound

  const typed = useTypewriter(PROJECT_NAMES)

  const staticLines = [
    { type: 'cmd',    text: `${d.cmd1} ${pathname}` },
    { type: 'error',  text: `${d.error}: ${pathname}` },
    { type: 'blank',  text: '' },
    { type: 'cmd',    text: d.cmd2 },
    { type: 'output', text: d.available },
    { type: 'blank',  text: '' },
  ]

  const colorMap: Record<string, string> = {
    cmd:    '#94aaff',
    error:  '#ffb4ab',
    output: '#acaaad',
    blank:  'transparent',
  }

  return (
    <main
      id="main-content"
      className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-32"
    >
      <div className="w-full max-w-xl">
        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            backgroundColor: '#1a1a1e',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 24px 64px color-mix(in srgb, #000 60%, transparent)',
          }}
        >
          {/* macOS header */}
          <div
            style={{
              backgroundColor: '#232327',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f57', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#28ca41', display: 'inline-block' }} />
            <span
              style={{
                flex: 1,
                textAlign: 'center',
                fontFamily: MONO,
                fontSize: '11px',
                color: '#6b6b70',
                marginLeft: '-52px',
              }}
            >
              bash — 404 not found
            </span>
          </div>

          {/* Terminal body */}
          <div style={{ padding: '20px 24px 28px', fontFamily: MONO, fontSize: '14px', lineHeight: '1.7' }}>
            {/* Static lines avec stagger d'entrée */}
            {staticLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.25 }}
                style={{ color: colorMap[line.type], minHeight: '1.7em' }}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Ligne typewriter */}
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: staticLines.length * 0.08, duration: 0.25 }}
              style={{ color: '#94aaff', minHeight: '1.7em' }}
            >
              {'$ # '}{typed}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'steps(1)' }}
                style={{ color: '#acaaad' }}
              >
                ▋
              </motion.span>
            </motion.div>
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-6"
        >
          <Link
            href={`/${lang}`}
            className="font-body text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-primary-fixed-dim)' }}
          >
            ← {d.home}
          </Link>
          <Link
            href={`/${lang}#projects`}
            className="font-body text-sm font-medium transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            {d.projects} →
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
