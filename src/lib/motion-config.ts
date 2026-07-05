/**
 * PotolokBel Journey Motion Configuration
 * Centralized settings for scroll-driven animations and section behavior.
 */

export const MOTION_CONFIG = {
  global: {
    smoothScrollDuration: 1.6,
    scrub: 1.5,
    ease: 'power3.inOut',
    atmosphereOpacity: 0.05,
    staggerAmount: 0.8,
  },

  sections: {
    hero: {
      flightDuration: '150%',
      zoomScale: 1.4,
      tiltY: 30,
      lightOpacity: 0.8,
    },
    features: {
      entranceY: '20vh',
      scale: 0.9,
      blur: 15,
      pinDuration: '+=100%',
      backgroundColor: '#050505',
    },
    types: {
      entranceY: '25vh',
      perspective: 2000,
      rotationX: -10,
      pinDuration: '+=120%',
      backgroundColor: '#0a0a0c',
    },
    calculator: {
      entranceY: '15vh',
      glowScale: 1.3,
      pinDuration: '+=80%',
      backgroundColor: '#050505',
    },
    portfolio: {
      entranceY: '20vh',
      parallaxAmount: 15,
      pinDuration: '+=100%',
      backgroundColor: '#08080a',
    },
    timeline: {
      entranceY: '15vh',
      progressStart: 'top 50%',
      progressEnd: 'bottom 50%',
      pinDuration: '+=150%',
      backgroundColor: '#050505',
    },
    reviews: {
      entranceY: '15vh',
      stagger: 0.2,
      pinDuration: '+=80%',
      backgroundColor: '#08080a',
    },
    faq: {
      entranceY: '10vh',
      pinDuration: '+=60%',
      backgroundColor: '#050505',
    },
    contacts: {
      entranceY: '20vh',
      glowX: '30%',
      glowY: '-20%',
      backgroundColor: '#000000',
    }
  },

  elements: {
    reveal: {
      y: 120,
      scale: 0.85,
      rotationX: -15,
      blur: 20,
    },
    exit: {
      opacity: 0.2,
      scale: 0.9,
      y: '-15vh',
      blur: 25,
    }
  }
};
