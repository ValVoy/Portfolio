# Design System Specification: The Kinetic Luminescence

## 1. Overview & Creative North Star
**Creative North Star: "The Neon Architect"**

This design system moves away from the static, "boxed-in" nature of traditional developer portfolios. It is built on the philosophy of **Kinetic Luminescence**: the idea that a digital environment should feel like a living, breathing IDE—highly technical, yet sophisticated and fluid. 

We break the "template" look by rejecting rigid, outlined grids in favor of **intentional asymmetry** and **atmospheric depth**. By utilizing a high-contrast typography scale (Space Grotesk vs. Inter) and overlapping "glass" surfaces, we create an editorial layout that feels like a high-end tech publication rather than a generic resume. The interface doesn't just display code; it curates an experience of technical mastery.

---

## 2. Colors
The palette is rooted in a "Deep Charcoal" foundation, punctuated by high-energy electric blues and violets.

### The "No-Line" Rule
**Designers are strictly prohibited from using 1px solid borders for sectioning.** To define boundaries, you must use background shifts. For example, a `surface-container-low` section should sit directly against the `background` to create a natural, soft edge. Boundaries are felt through tonal transitions, not drawn with lines.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. We use a "Nested Depth" approach:
- **Base Layer:** `surface` (#0e0e10) — The infinite void.
- **Section Layer:** `surface-container-low` (#131315) — Subtle differentiation for large content blocks.
- **Component Layer:** `surface-container-highest` (#262528) — For active cards and interactive elements.
- **Nesting Logic:** Place a `surface-container-lowest` (#000000) card inside a `surface-container-low` section to create a "sunken" or "embedded" feel.

### The "Glass & Gradient" Rule
To achieve a signature feel, floating elements (modals, navigation bars) must use **Glassmorphism**.
- **Recipe:** `surface-variant` at 60% opacity + `backdrop-blur: 24px`.
- **Signature Textures:** Main CTAs should never be flat. Use a linear gradient from `primary` (#94aaff) to `primary-dim` (#3e6af1) at a 135-degree angle to provide "visual soul."

---

## 3. Typography
We use a dual-font strategy to balance technical precision with editorial authority.

*   **Display & Headlines:** *Space Grotesk*. A high-end sans-serif with quirky, technical terminals that echo the geometry of code.
*   **Body & Labels:** *Inter*. Chosen for its extreme legibility at small sizes and "neutral-premium" aesthetic.

**Hierarchy as Identity:**
- **Display-LG (3.5rem):** Reserved for hero impact statements. Use tight letter-spacing (-0.02em).
- **Headline-MD (1.75rem):** Used for project titles. It should feel authoritative.
- **Label-MD (0.75rem):** Used for "Metadata" (e.g., tech stacks, dates). Always in uppercase with +0.1em tracking to mimic a terminal's precision.

---

## 4. Elevation & Depth
In this system, elevation is a product of light and transparency, not shadow alone.

*   **The Layering Principle:** Avoid shadows for static cards. Instead, use the `surface-container` tiers. A `surface-container-high` card on a `surface-dim` background provides all the "lift" needed.
*   **Ambient Shadows:** For floating elements (e.g., "Active" project cards), use a 64px blur shadow using `primary` at 8% opacity. This creates a "neon glow" rather than a dirty grey drop shadow.
*   **The Ghost Border Fallback:** If accessibility requires a container edge, use a "Ghost Border": `outline-variant` (#48474a) at **15% opacity**. It should be felt, not seen.
*   **Glassmorphism:** Use semi-transparent `surface-bright` for overlays. This allows the primary accents of the background to bleed through, ensuring the UI feels integrated into the environment.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `on-primary` text, `xl` (1.5rem) rounded corners.
*   **Secondary:** Glass effect (`surface-variant` at 20% opacity) with a `primary` ghost border (20% opacity).
*   **Tertiary:** Text-only in `primary-fixed-dim`, using `label-md` styling.

### Cards & Projects
*   **Constraint:** No dividers. Use `surface-container-high` for the card body. 
*   **Interaction:** On hover, transition the background to `surface-bright` and apply the Ambient Shadow.
*   **Layout:** Use asymmetrical padding (e.g., `padding-top: 40px`, `padding-bottom: 24px`) to create an editorial flow.

### Chips (Tech Stack Tags)
*   **Visuals:** `surface-container-highest` background with `secondary` text. 
*   **Shape:** `full` (pill-shaped) to contrast against the `xl` rounded corners of the cards.

### Input Fields
*   **Style:** Minimalist. No background fill. Use a bottom-only `outline-variant` (30% opacity). 
*   **Focus State:** The bottom border transitions to a `primary` gradient, and the `label-sm` glows with `primary-dim`.

---

## 6. Do's and Don'ts

### Do
*   **Use Large Whitespace:** Let sections breathe. Use 160px vertical gaps between major portfolio sections.
*   **Embrace Asymmetry:** Offset your text columns from your image columns to create a "custom-coded" look.
*   **Color as Hint:** Use `tertiary` (#a1faff) sparingly—only for "Success" states or critical "New" badges.

### Don't
*   **Don't use 100% White:** Never use `#FFFFFF` for body text. Use `on-surface-variant` (#acaaad) for body and `on-surface` (#f6f3f5) for headlines to reduce eye strain in dark mode.
*   **Don't use standard Dividers:** If you feel the need for a line, use a 48px wide, 2px tall horizontal bar in `primary-dim` instead of a full-width divider.
*   **Don't crowd the edges:** This design system relies on the `xl` (1.5rem) corner radius. Ensure content is padded at least 32px away from the edges of cards.