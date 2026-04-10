# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
