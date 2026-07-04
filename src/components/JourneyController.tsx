'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface JourneyControllerProps {
  children: React.ReactNode;
}

export const JourneyController: React.FC<JourneyControllerProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('section[data-journey-section]');

      // Pinning the entire content to allow layered transitions
      // Note: This requires the wrapper to have a set height or the content to be pinned

      sections.forEach((section, i) => {
        const isHero = i === 0;
        const isLast = i === sections.length - 1;
        const elements = section.querySelectorAll('[data-journey-element]');

        // --- ENTRANCE JOURNEY ---
        if (!isHero) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top center',
              scrub: 1.5,
            }
          });

          tl.fromTo(section,
            {
              y: '40vh',
              opacity: 0,
              scale: 0.8,
              filter: 'blur(20px)',
              transformPerspective: 1000,
              rotationX: -10,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              rotationX: 0,
              ease: 'power3.inOut',
            }
          );
        }

        // --- ELEMENT ASSEMBLY ---
        if (elements.length > 0) {
          gsap.from(elements, {
            y: 100,
            opacity: 0,
            filter: 'blur(10px)',
            scale: 0.9,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 20%',
              scrub: 1,
            }
          });
        }

        // --- SECTION STACKING (EXIT) ---
        if (!isLast) {
          gsap.to(section, {
            y: '-30vh',
            scale: 0.85,
            opacity: 0,
            filter: 'blur(30px)',
            ease: 'power2.in',
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 1,
            }
          });
        }

        // --- DYNAMIC LIGHTING TRANSITION ---
        if (section.id === 'types') {
          gsap.to('main', {
            backgroundColor: '#0a0a0c',
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            }
          });
        }
      });

    }, wrapperRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} id="journey-wrapper" className="relative overflow-hidden">
      <div ref={contentRef} id="journey-content" className="relative">
        {children}
      </div>
    </div>
  );
};
