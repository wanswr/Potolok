/**
 * Centralized Animation Configuration for the "PotolokBel Journey"
 * Defines scroll distances, durations, and specific motion parameters
 * for a unified, scroll-driven cinematic experience.
 */

export const JOURNEY_CONFIG = {
  // Total scroll height multiplier (e.g., 600vh total journey)
  totalScrollHeight: '800%',

  sections: {
    hero: {
      duration: 1.5, // Relative scroll duration
      zoom: 1.4,
      tiltY: 30,
      fadeOutStart: 0.8,
    },
    trust: {
      duration: 1.2,
      entranceY: 100,
      stagger: 0.1,
      cardRotation: 1,
    },
    types: {
      duration: 1.5,
      entranceY: 150,
      perspective: 1200,
    },
    calculator: {
      duration: 1,
      glowScale: 1.2,
    },
    portfolio: {
      duration: 1.5,
      imageParallax: 15,
    },
    timeline: {
      duration: 2,
      progressStart: 'top 50%',
      progressEnd: 'bottom 50%',
    },
    faq: {
      duration: 1,
      itemEntranceY: 40,
    },
    cta: {
      duration: 1.2,
      glowMovement: 30,
    }
  },

  // Global eases and durations for microinteractions
  defaults: {
    ease: 'expo.out',
    duration: 1.2,
    scrub: 1, // Smoothness of scroll tracking
  }
};
