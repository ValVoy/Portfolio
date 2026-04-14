/**
 * Durée de l'animation de transition de thème (dark ↔ light).
 * Partagée entre ThemeTransition (RAF loop) et ThemeProvider (setTimeout).
 */
export const THEME_DURATION_S = 1.6
export const THEME_DURATION_MS = THEME_DURATION_S * 1000

// Moment auquel le thème bascule réellement (~44% de l'animation)
export const THEME_SWITCH_MS = Math.round(THEME_DURATION_MS * 0.44) // ~704ms
