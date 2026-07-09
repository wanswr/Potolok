/**
 * PotolokBel Premium 3D Motion Configuration
 * Drives the high-fidelity Apple-style "Journey" experience.
 */

export const MOTION_CONFIG = {
  global: {
    smoothScrollDuration: 1.8,
    scrub: 1.5,
    perspective: 2500, // Deep perspective for 3D feel
    atmosphereOpacity: 0.08,
    staggerAmount: 1.2,
    canvasParallax: 0.1, // Reactivity to mouse/scroll
  },

  sections: {
    hero: {
      flightDuration: '150%',
      zoomScale: 1.5,
      tiltY: 35,
      lightOpacity: 0.9,
    },
    features: {
      entranceY: '40vh',
      entranceRotateX: -25,
      scale: 0.85,
      pinDuration: '+=120%',
      backgroundColor: '#050505',
    },
    types: {
      entranceY: '45vh',
      entranceRotateX: -30,
      perspective: 3000,
      pinDuration: '+=150%',
      backgroundColor: '#0a0a0c',
    },
    calculator: {
      entranceY: '30vh',
      entranceRotateX: -20,
      pinDuration: '+=100%',
      backgroundColor: '#050505',
    },
    portfolio: {
      entranceY: '35vh',
      entranceRotateX: -25,
      pinDuration: '+=130%',
      backgroundColor: '#08080a',
    },
    timeline: {
      entranceY: '30vh',
      entranceRotateX: -20,
      pinDuration: '+=180%',
      backgroundColor: '#050505',
    },
    reviews: {
      entranceY: '25vh',
      entranceRotateX: -15,
      pinDuration: '+=100%',
      backgroundColor: '#08080a',
    },
    faq: {
      entranceY: '20vh',
      entranceRotateX: -10,
      pinDuration: '+=80%',
      backgroundColor: '#050505',
    },
    contacts: {
      entranceY: '35vh',
      entranceRotateX: -25,
      backgroundColor: '#000000',
    }
  },

  elements: {
    reveal: {
      y: 150,
      z: 200, // Move forward from depth
      scale: 0.8,
      rotationX: -20,
      blur: 30,
    },
    exit: {
      opacity: 0.1,
      scale: 0.8,
      y: '-20vh',
      z: -300, // Sink into background
      rotationX: 15,
      blur: 40,
    }
  }
};
