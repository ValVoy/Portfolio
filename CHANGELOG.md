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
