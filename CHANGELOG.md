# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-15

### Added
- **Features:** Interactive Terminal easter egg and custom 404 page with macOS terminal styling and typewriter effect.
- **Sections:** "Now" (En ce moment) section featuring current projects (LifeOs), readings, and learning focus.
- **UI:** Hero section with `CyclingText` for dynamic roles and enhanced "Kinetic" ambient glow.
- **Navigation:** Project-to-project navigation (Previous/Next) on detail pages for better user flow.
- **Components:** `ProjectGallery` with 16:9 ratio, touch-swipe support, slide animations, and lightbox integration.
- **SEO:** Dynamic Open Graph (OG) image generation for each project using Next.js `ImageResponse` on Edge runtime.
- **UX:** Smooth page transitions (blur/fade) and a custom scroll progress bar with spring physics.
- **Data:** Full integration of real project data and images (EventBrite, Atomic Design, RPG, FreeDoc, Chatbot, etc.).

### Changed
- **Identity:** Transitioned to a "Dark Only" unified theme to strengthen the "Kinetic Luminescence" visual identity.
- **Visuals:** Optimized mobile/tablet responsiveness for the project slider with CSS snap-scroll and peek effects.
- **Content:** Refined all typography, including dash normalization (em-dash) and spacing.

### Fixed
- **SEO:** Resolved 404 metadata conflicts and improved dynamic OG image parameter handling.
- **UX:** Fixed terminal cursor blinking animation using keyframes for better cross-browser consistency.

## [1.0.0] - 2026-04-14

### Added
- **Phase 8:** Final production deployment on Vercel (`valentincheron.vercel.app`).
- **Security:** Implemented strict Content-Security-Policy (CSP) and security headers.
- **Environment:** Centralized `siteUrl` configuration via `NEXT_PUBLIC_SITE_URL`.
- **Infrastructure:** Configured `proxy.ts` for localized routing and redirects (Next.js 16).
- **i18n:** Extracted project role labels into localization dictionaries (`fr.ts`, `en.ts`).
- **Optimization:** Centralized `THEME_DURATION` constants for synchronized theme transitions.
- **SEO:** Verified and validated `sitemap.xml` and `robots.txt` with dynamic multi-language support.

### Changed
- Updated README with deployment status and setup instructions.
- Cleaned up development-specific configuration files (removed redundant `middleware.ts`).

## [0.3.0] - 2026-04-12

### Added
- **Phase 5:** Full Dark/Light mode support with "Architectural Archivist" light palette.
- **Phase 5:** Implemented high-performance theme transition using RAF (Request Animation Frame) for 60fps color interpolation.
- **Phase 5:** Added "Celestial Glow" animation (sun/moon trajectory) during theme switching.
- **Phase 6:** Dynamic Project Detail pages (`/projects/[id]`) with specific metadata and layouts.
- **Phase 6:** Created `ProjectImage` component with automatic placeholders and optimized `next/image` integration.
- **Phase 6:** Context-aware language switcher (preserves current route when switching between FR/EN).
- **Phase 7:** Completed English translations for all data and UI components.
- **Accessibility:** Added Skip Navigation links, global focus-visible states, and improved ARIA attributes.
- **Security:** Hardened Security Headers (CSP-ready, X-Frame-Options, etc.) in `next.config.ts`.
- **SEO:** Dynamic metadata, JSON-LD structured data, and enhanced Sitemap for project pages.

### Changed
- Refactored Tailwind v4 `@theme` configuration to fix dynamic theming (removed `inline` keyword).
- Optimized section glows to avoid hard edges without using `overflow-hidden`.
- Improved Navbar styling in light mode for better contrast.

## [0.2.0] - 2026-04-09

### Added
- **Phase 1:** Real project data integration (4 projects, 14 skills, full profile).
- **Phase 2:** Core UI component library (`Button`, `Card`, `Chip`) with Kinetic Luminescence styling.
- **Phase 3:** Global layout components (`Header`, `Footer`) with language switcher and Glassmorphism.
- **Phase 4 (Partial):** `Hero` section with availability badge, dynamic bio, and primary/tertiary CTAs.
- TypeScript strict typings for all data models, including new `LocalizedString` for full i18n data support.
- Environment variable support for sensitive contact info.
- New audit reports (#04, #05) validating architecture, i18n consistency, and UI fidelity.

### Fixed
- **i18n:** Centralized all UI strings in `data/i18n/` (Header/Footer no longer use hardcoded translations).
- **Dev Experience:** Fixed HMR/Hot Reload on Windows by enabling Webpack polling.
- **UI:** Extended `Button` component to support both `button` and `anchor` elements with strict typing.

## [0.1.0] - 2026-04-09

### Added
- Initial project structure for Next.js 16/React 19.
- Tailwind CSS v4 configuration with "Kinetic Luminescence" design tokens.
- Design System specification document (`stitch/DESIGN.md`).
- Project governance documents for Claude and Gemini instances.
- First automated audit report (#01).

### Changed
- Refactored application for full i18n support (dynamic routing `/[lang]`).
- Centralized translation system in `app/data/i18n`.
- Moved `/governance` directory to project root for better separation of concerns.
- Cleaned up duplicate configuration files in the `/app` directory.
