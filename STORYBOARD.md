# Storyboard: PotolokBel Premium Experience

## Concept: "The Architectural Journey"
Instead of scrolling past blocks, the user "travels" through a high-end interior space.

---

## Scene 1: Hero — "The Invitation"
*   **Visual:** Deep perspective of a luxury minimalist living room. Focus on the ceiling.
*   **Text:** "Пространство начинается сверху" (Space starts from above).
*   **Motion:**
    *   Entrance: Title blurs and fades in (Apple-style).
    *   Scroll: Camera moves slowly forward (Scale 1.0 -> 1.15).
    *   Atmosphere: Subtle light dust particles and a moving light source.
*   **GSAP Logic:** `ScrollTrigger` pins the section. Timeline handles scale and opacity.
*   **Duration:** 150vh.

## Scene 2: Material — "The Macroscopic View"
*   **Visual:** Extreme close-up (Macro) of the ceiling texture.
*   **Transition:** Seamless zoom from the Hero's ceiling into the texture.
*   **Text:** "Безупречная фактура" (Impeccable texture).
*   **Motion:**
    *   A "light sweep" (gradient mask) moves across the texture to show depth/grain.
    *   Parallax movement of the texture background.
*   **GSAP Logic:** Transition linked to Hero's end. Scale goes from 1.0 to 1.5.
*   **Duration:** 100vh.

## Scene 3: Transformation — "The Evolution of Light"
*   **Visual:** A single static room view. The ceiling changes states.
*   **States:**
    1.  **Shadow Profile:** Minimalist gap at the edge.
    2.  **Floating Ceiling:** Soft halo glow around the perimeter.
    3.  **Light Lines:** Graphic geometric lighting integrated into the surface.
*   **Motion:**
    *   Smooth cross-fades between layers.
    *   Room lighting adjusts to match the ceiling state (Global Illumination effect).
*   **GSAP Logic:** Pinning the room. Scrubbing through a timeline that toggles layer visibility and light intensity.
*   **Duration:** 300vh.

---

## Technical Architecture

### 1. SceneManager (Orchestrator)
A central component that wraps all scenes. It initializes Lenis and manages the global GSAP context.

### 2. Scene Components
Each scene is a self-contained component (`HeroScene`, `MaterialScene`, etc.) with its own `ref` and internal timeline logic, exposed to the `SceneManager`.

### 3. Design Tokens
- **Background:** `#FAFAFA` (Warm White), `#121212` (Graphite).
- **Accents:** `#C5A059` (Muted Gold).
- **Typography:** Inter (Variable), large headings, generous letter spacing.

### 4. Animation System
- **Transitions:** Blur-in / Scale-out.
- **Scroll:** 100% scrub-based for that "interactive movie" feel.
- **Performance:** CSS Transform and Opacity only. Heavy images lazy-loaded or pre-loaded based on proximity.
