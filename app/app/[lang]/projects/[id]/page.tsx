import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getDictionary, hasLocale } from '@/data/i18n'
import { projects } from '@/data/projects'
import { Chip } from '@/components/ui/Chip'
import { ProjectImage } from '@/components/ui/ProjectImage'
import { t } from '@/lib/i18n'
import type { ProjectRole, ProjectStatus } from '@/data/types'

const roleLabel: Record<ProjectRole, string> = {
  fullstack: 'Fullstack',
  frontend: 'Frontend',
  backend: 'Backend',
  lead: 'Lead',
}

const baseUrl = 'https://portfolio.vercel.app'

export async function generateStaticParams() {
  const locales = ['fr', 'en'] as const
  return locales.flatMap((lang) => projects.map((p) => ({ lang, id: p.id })))
}

export async function generateMetadata({
  params,
}: PageProps<'/[lang]/projects/[id]'>): Promise<Metadata> {
  const { lang, id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return {}

  const title = project.title
  const description = t(project.description, lang)

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${lang}/projects/${id}`,
      languages: { fr: `/fr/projects/${id}`, en: `/en/projects/${id}` },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${baseUrl}/${lang}/projects/${id}`,
    },
  }
}

export default async function ProjectPage({
  params,
}: PageProps<'/[lang]/projects/[id]'>) {
  const { lang, id } = await params

  if (!hasLocale(lang)) notFound()

  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  const dict = await getDictionary(lang)
  const d = dict.project
  const dp = dict.projects

  const statusLabel: Record<ProjectStatus, string> = {
    in_progress: dp.statusInProgress,
    completed: dp.statusCompleted,
    archived: dp.statusCompleted,
  }

  return (
    <main id="main-content">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative w-full pt-32 pb-24">
        {/* Ambient glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 70% 40%, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent)',
          }}
        />

        <div className="relative mx-auto w-full max-w-4xl px-6">
          {/* Back link */}
          <Link
            href={`/${lang}#projects`}
            className="font-body mb-10 inline-block text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--color-primary-fixed-dim)' }}
          >
            {d.back}
          </Link>

          {/* Meta badges */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span
              className="font-body text-xs uppercase tracking-[0.1em]"
              style={{
                color:
                  project.status === 'in_progress'
                    ? 'var(--color-primary)'
                    : 'var(--color-secondary)',
              }}
            >
              {statusLabel[project.status]}
            </span>
            <span style={{ color: 'var(--color-outline)' }} aria-hidden="true">·</span>
            <span
              className="font-body text-xs uppercase tracking-[0.1em]"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {project.teamProject ? dp.team : dp.solo}
            </span>
            <span style={{ color: 'var(--color-outline)' }} aria-hidden="true">·</span>
            <span
              className="font-body text-xs tabular-nums"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {project.year}
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display text-5xl font-bold tracking-[-0.02em] sm:text-6xl lg:text-7xl"
            style={{ color: 'var(--color-on-surface)' }}
          >
            {project.title}
          </h1>

          {/* Role badge */}
          <p
            className="font-body mt-5 text-base"
            style={{ color: 'var(--color-on-surface-variant)' }}
          >
            <span
              className="text-xs uppercase tracking-[0.1em] mr-2"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {d.roleLabel}
            </span>
            <span
              className="font-medium"
              style={{ color: 'var(--color-primary)' }}
            >
              {roleLabel[project.role]}
            </span>
          </p>
        </div>
      </section>

      {/* ── Visuel ───────────────────────────────────────────────── */}
      <div className="relative mx-auto w-full max-w-4xl px-6 pb-16">
        <ProjectImage image={project.image} title={project.title} variant="detail" />
      </div>

      {/* ── Content ──────────────────────────────────────────────── */}
      <section className="w-full pb-[160px]">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_280px]">

          {/* Main — long description */}
          <div>
            <p
              className="font-body text-base leading-[1.8]"
              style={{ color: 'var(--color-on-surface-variant)' }}
            >
              {t(project.longDescription, lang)}
            </p>

            {/* Links */}
            <div className="mt-10 flex flex-wrap gap-6">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-primary-fixed-dim)' }}
                aria-label={`${d.openRepo} — ${project.title}`}
              >
                {d.openRepo} →
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: 'var(--color-tertiary)' }}
                  aria-label={`${d.openLive} — ${project.title}`}
                >
                  {d.openLive} ↗
                </a>
              )}
            </div>
          </div>

          {/* Sidebar — stack */}
          <aside>
            <div
              className="p-8"
              style={{
                backgroundColor: 'var(--color-surface-container)',
                borderRadius: '1.5rem',
                boxShadow: '0 4px 24px color-mix(in srgb, var(--color-primary) 5%, transparent)',
              }}
            >
              <h2
                className="font-body mb-5 text-xs uppercase tracking-[0.1em]"
                style={{ color: 'var(--color-primary)' }}
              >
                Stack
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </div>

              <dl className="mt-8 space-y-4">
                <div>
                  <dt
                    className="font-body text-xs uppercase tracking-[0.1em]"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    {d.yearLabel}
                  </dt>
                  <dd
                    className="font-body mt-1 text-sm tabular-nums"
                    style={{ color: 'var(--color-on-surface)' }}
                  >
                    {project.year}
                  </dd>
                </div>
                <div>
                  <dt
                    className="font-body text-xs uppercase tracking-[0.1em]"
                    style={{ color: 'var(--color-on-surface-variant)' }}
                  >
                    {d.typeLabel}
                  </dt>
                  <dd
                    className="font-body mt-1 text-sm"
                    style={{ color: 'var(--color-on-surface)' }}
                  >
                    {project.teamProject ? dp.team : dp.solo}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
