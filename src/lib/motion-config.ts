/**
 * PotolokBel Premium Architectural Motion Configuration
 * Re-imagined for the high-end "Apple-level" storytelling.
 */

export const MOTION_CONFIG = {
  global: {
    smoothScrollDuration: 2.2, // Slower, more intentional scroll
    scrub: 1.2,
    perspective: 2000,
    atmosphereOpacity: 0.05,
    staggerAmount: 0.8,
  },

  scenes: {
    hero: {
      duration: '150%',
      zoomScale: 1.15,
      contentFadeOut: 0.4,
    },
    material: {
      duration: '100%',
      zoomScale: 1.4,
      lightSweepSpeed: 2,
    },
    transformation: {
      duration: '400%', // Long pinning for the transitions
      roomScale: 1.05,
      lightIntensity: {
        shadow: 0.6,
        floating: 1.2,
        lines: 0.9,
      }
    }
  },

  theme: {
    colors: {
      background: '#FDFCFB',
      foreground: '#121212',
      accent: '#C5A059',
      graphite: '#1C1C1C',
      stone: '#8E8E93',
      deepBlack: '#0A0A0A',
    }
  }
};
