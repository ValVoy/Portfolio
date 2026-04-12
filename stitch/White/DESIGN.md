# Design System Specification: Technical Elegance & Tonal Depth

## 1. Overview & Creative North Star
**The Creative North Star: "The Architectural Archivist"**

This design system moves away from the sterile, high-blue-light energy of standard SaaS platforms. Instead, it draws inspiration from high-end architectural portfolios and physical technical journals. It is designed to feel warm yet precise, professional yet tactile. 

The aesthetic breaks the "standard template" look through **Tonal Layering**. We do not use lines to define space; we use light and mass. By leveraging the subtle shifts between Ivory and Cream, we create a UI that feels carved from a single block of material rather than assembled from disparate boxes. The high-contrast technical typography of *Space Grotesk* provides the "Kinetic" edge—a sharp, digital precision that cuts through the soft, organic background.

---

## 2. Colors: The Cream-to-Onyx Spectrum

The palette is a sophisticated transposition of high-performance dark modes into a tactile light mode. 

### Core Palette (Material Design Tokens)
- **Surface (Base):** `#FCF9F4` – The primary canvas. Warm, reduced eye strain.
- **Surface Container:** `#F0EDE9` – For secondary sectioning.
- **Primary (Action):** `#1A4FD7` – A high-chroma electric blue for intent and focus.
- **On-Surface (Titles):** `#1C1C19` – Deep Onyx. Used for maximum readability and authority.
- **On-Surface-Variant (Body):** `#434654` – A softened grey to reduce visual noise in long-form text.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or card definition.
- **Boundary Definition:** Use background color shifts. A `surface-container-low` section sitting on a `surface` background is the only "border" allowed.
- **Vertical Rhythm:** Use whitespace (the Spacing Scale) to denote the end of a thought or section, never a horizontal rule.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper.
- **Level 0 (Background):** `surface` (`#FCF9F4`)
- **Level 1 (Sectioning):** `surface-container` (`#F0EDE9`)
- **Level 2 (Cards/Interaction):** `surface-container-lowest` (`#FFFFFF`)

### The "Glass & Gradient" Rule
To add soul to the technical layout:
- **Floating Nav/Sidebars:** Use `surface-bright` at 80% opacity with a `20px` backdrop blur.
- **CTAs:** Primary buttons should use a subtle linear gradient from `primary` (#1A4FD7) to `primary-container` (#3E6AF1) at a 135-degree angle to provide a sense of "luminance" and depth.

---

## 3. Typography: Technical Modernism

We use **Space Grotesk** across all levels. Its monospaced-adjacent character widths give the system a "technical documentation" feel while remaining highly legible.

- **Display (L/M/S):** 3.5rem / 2.75rem / 2.25rem. Use `-0.02em` letter spacing. These are the "Hero" moments.
- **Headline (L/M/S):** 2rem / 1.75rem / 1.5rem. Use for major section starts. Bold weights only.
- **Title (L/M/S):** 1.375rem / 1.125rem / 1rem. Use for card headers and navigation. Medium weight.
- **Body (L/M):** 1rem / 0.875rem. Always use `on-surface-variant` (`#434654`) for body text to maintain the "warm" aesthetic. 
- **Label (M/S):** 0.75rem / 0.6875rem. All-caps for "Technical Specs" or "Metadata." Use `+0.05em` letter spacing for readability.

---

## 4. Elevation & Depth: The Layering Principle

Depth in this system is achieved through **Tonal Stacking**, not drop shadows.

- **The Stacking Principle:** Place a `surface-container-lowest` (#FFFFFF) card atop a `surface-container` (#F0EDE9) background. This creates a natural "lift" that mimics white paper on a cream desk.
- **Ambient Shadows:** Only use shadows for "Temporary" elements (Modals, Popovers).
    - **Specs:** `Y: 8px, Blur: 24px, Color: rgba(28, 28, 25, 0.06)`. 
    - The shadow is tinted with the Onyx `on-surface` color to feel like natural ambient occlusion.
- **The "Ghost Border":** For input fields or high-density data, use `outline-variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Precision & Softness

### Buttons
- **Primary:** Gradient-filled (Primary to Primary-Container), `Round Eight` (0.5rem) corners. Text is `on-primary` (White).
- **Secondary:** Surface-tinted. No border. Use `surface-container-highest` background with `primary` text.
- **Tertiary:** No background. Bold `primary` text with a subtle underline appearing only on hover.

### Inputs & Text Fields
- **Container:** `surface-container-low`.
- **Active State:** A 2px bottom-bar in `primary` blue. Avoid the "four-sided" active border to keep the architectural look.
- **Corners:** Maintain the `DEFAULT` (0.5rem) radius.

### Cards & Lists
- **Rule:** Absolute prohibition of divider lines between list items.
- **List Separation:** Use 8px of vertical padding and a subtle hover state shift to `surface-container-high`.
- **Card Content:** Group information using typography weight (e.g., a `label-md` technical tag above a `title-lg` header).

### Interactive Chips
- **Status:** Use the `tertiary` (Burnt Orange/Sienna) palette for warnings or technical status flags to provide a sophisticated "warmth" contrast to the Electric Blue.

---

## 6. Do's and Don'ts

### Do
- **DO** use intentional asymmetry. Offset a text block to the right to create a "portfolio" feel.
- **DO** use "Space Grotesk" Medium for technical labels in all-caps.
- **DO** prioritize white space over content density. If a screen feels "full," it is likely over-designed.

### Don't
- **DON'T** use pure black (#000000). Use the Onyx `on-surface` token (#1C1C19).
- **DON'T** use standard 1px borders. If you need a line, use a 4px wide vertical "accent bar" in `primary` blue to the left of a header.
- **DON'T** use 90-degree sharp corners. Everything must adhere to the `Round Eight` (0.5rem) or `XL` (1.5rem) scale to maintain the sophisticated, softened technical look.