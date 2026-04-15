'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalLine {
  type: 'prompt' | 'output' | 'error'
  content: string
}

const PROMPT = 'valentin@portfolio:~$'

const WELCOME: TerminalLine[] = [
  { type: 'output', content: "Welcome to Valentin's portfolio terminal." },
  { type: 'output', content: 'Type "help" to see available commands.' },
  { type: 'output', content: '' },
]

function getOutput(cmd: string): TerminalLine[] {
  const trimmed = cmd.trim().toLowerCase()
  const parts = trimmed.split(/\s+/)

  if (trimmed === '') return []

  if (trimmed === 'help') {
    return [
      { type: 'output', content: 'Available commands:' },
      { type: 'output', content: '  whoami          About me' },
      { type: 'output', content: '  ls              List directories' },
      { type: 'output', content: '  ls projects     List my projects' },
      { type: 'output', content: '  cat skills      My tech stack' },
      { type: 'output', content: '  contact         Get in touch' },
      { type: 'output', content: '  git log         Recent commits' },
      { type: 'output', content: '  pwd             Current path' },
      { type: 'output', content: '  date            Current date' },
      { type: 'output', content: '  echo [text]     Print text' },
      { type: 'output', content: '  clear           Clear terminal' },
      { type: 'output', content: '  exit            Close terminal' },
    ]
  }

  if (trimmed === 'whoami') {
    return [
      { type: 'output', content: 'Valentin Chéron' },
      { type: 'output', content: 'Junior fullstack web developer' },
      { type: 'output', content: 'Ruby on Rails  ·  Next.js  ·  TypeScript' },
      { type: 'output', content: 'Location    France' },
      { type: 'output', content: 'Status      Open to opportunities' },
    ]
  }

  if (trimmed === 'ls') {
    return [{ type: 'output', content: 'projects/    skills/    contact/' }]
  }

  if (trimmed === 'ls projects' || trimmed === 'ls projects/') {
    return [
      { type: 'output', content: "kois-story/       eventbrite-v2/    atomic-design/" },
      { type: 'output', content: "rpg-ruby/         freedoc/          chatbot-openai/" },
      { type: 'output', content: "crazy-scrap/" },
    ]
  }

  if (trimmed === 'cat skills' || trimmed === 'cat skills.txt') {
    return [
      { type: 'output', content: '# Languages' },
      { type: 'output', content: 'Ruby  ·  JavaScript  ·  TypeScript  ·  HTML  ·  CSS' },
      { type: 'output', content: '' },
      { type: 'output', content: '# Frameworks' },
      { type: 'output', content: 'Ruby on Rails  ·  Next.js  ·  React  ·  Hotwire' },
      { type: 'output', content: '' },
      { type: 'output', content: '# Tools' },
      { type: 'output', content: 'Git  ·  PostgreSQL  ·  SQLite  ·  Docker' },
    ]
  }

  if (trimmed === 'contact') {
    return [
      { type: 'output', content: 'GitHub      github.com/ValVoy' },
      { type: 'output', content: 'LinkedIn    linkedin.com/in/valentin-cheron-b507851a3' },
      { type: 'output', content: 'Email       see contact section on this page' },
    ]
  }

  if (trimmed === 'git log') {
    return [
      { type: 'output', content: 'b77c3d6  feat: transition de page fluide' },
      { type: 'output', content: 'a34e8f7  feat: section En ce moment' },
      { type: 'output', content: 'b728c82  feat: refonte galerie + hero cycling text' },
      { type: 'output', content: '4dcb1c6  feat: projets réels + galerie images' },
      { type: 'output', content: '0fdff1a  feat: suppression light mode, Lighthouse 100/100' },
    ]
  }

  if (trimmed === 'pwd') {
    return [{ type: 'output', content: '/home/valentin/portfolio' }]
  }

  if (trimmed === 'date') {
    return [{ type: 'output', content: new Date().toString() }]
  }

  if (parts[0] === 'echo') {
    const text = parts.slice(1).join(' ')
    return [{ type: 'output', content: text || '' }]
  }

  if (trimmed.startsWith('sudo')) {
    return [{ type: 'error', content: 'Permission denied. Nice try.' }]
  }

  if (trimmed.startsWith('rm')) {
    return [{ type: 'error', content: 'Absolutely not.' }]
  }

  if (trimmed === 'vim' || trimmed === 'nano' || trimmed === 'emacs') {
    return [{ type: 'error', content: `${trimmed}: this is a portfolio, not a text editor.` }]
  }

  return [{ type: 'error', content: `command not found: ${trimmed}  (try "help")` }]
}

export function Terminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME)
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80)
  }, [open])

  // Backtick key trigger
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === '`') {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Custom event trigger (from footer button)
  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('open-terminal', handler)
    return () => window.removeEventListener('open-terminal', handler)
  }, [])

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const execute = useCallback((cmd: string) => {
    const trimmed = cmd.trim()

    if (trimmed.toLowerCase() === 'clear') {
      setLines([])
      setInput('')
      return
    }
    if (trimmed.toLowerCase() === 'exit') {
      setOpen(false)
      setInput('')
      return
    }

    const output = getOutput(trimmed)
    setLines((prev) => [
      ...prev,
      { type: 'prompt', content: trimmed },
      ...output,
      { type: 'output', content: '' },
    ])
    if (trimmed) setCmdHistory((prev) => [trimmed, ...prev])
    setHistoryIndex(-1)
    setInput('')
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      execute(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1)
      setHistoryIndex(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(historyIndex - 1, -1)
      setHistoryIndex(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="terminal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-12"
          style={{ backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)' }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden"
            style={{
              borderRadius: '0.75rem',
              backgroundColor: '#0d0d0f',
              border: '1px solid rgba(148, 170, 255, 0.12)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(148,170,255,0.04)',
              fontFamily: "'SF Mono', 'Fira Code', 'Fira Mono', 'Consolas', monospace",
              fontSize: '13px',
            }}
          >
            {/* ── Header macOS ── */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderBottom: '1px solid rgba(148,170,255,0.07)', backgroundColor: '#111113' }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le terminal"
                className="h-3 w-3 rounded-full transition-opacity hover:opacity-70"
                style={{ backgroundColor: '#ff5f57' }}
              />
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} aria-hidden />
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: '#28ca41' }} aria-hidden />
              <span
                className="mx-auto text-xs"
                style={{ color: 'rgba(172, 170, 173, 0.4)', letterSpacing: '0.02em' }}
              >
                valentin@portfolio:~
              </span>
            </div>

            {/* ── Output ── */}
            <div
              className="h-72 overflow-y-auto p-4 leading-relaxed"
              style={{ scrollbarWidth: 'none' }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => {
                if (line.type === 'prompt') {
                  return (
                    <div key={i} className="flex gap-2">
                      <span style={{ color: 'rgba(148,170,255,0.45)', userSelect: 'none', whiteSpace: 'nowrap' }}>
                        {PROMPT}
                      </span>
                      <span style={{ color: '#94aaff' }}>{line.content}</span>
                    </div>
                  )
                }
                if (line.type === 'error') {
                  return (
                    <div key={i} style={{ color: '#ffb4ab' }}>{line.content}</div>
                  )
                }
                return (
                  <div key={i} style={{ color: '#acaaad' }}>{line.content || '\u00a0'}</div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ borderTop: '1px solid rgba(148,170,255,0.07)' }}
            >
              <span style={{ color: 'rgba(148,170,255,0.45)', userSelect: 'none', whiteSpace: 'nowrap' }}>
                {PROMPT}
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none"
                style={{ color: '#94aaff', caretColor: '#94aaff', fontFamily: 'inherit', fontSize: 'inherit' }}
                spellCheck={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                aria-label="Terminal input"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
