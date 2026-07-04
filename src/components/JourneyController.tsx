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

  useEffect(() => {
    // 1. Initialize Lenis for smooth scroll (Apple feel)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('section[data-journey-section]');

      sections.forEach((section, i) => {
        const isHero = i === 0;
        const isLast = i === sections.length - 1;

        // Complex Section Entrance (Apple Reveal)
        if (!isHero) {
          gsap.fromTo(section,
            {
              y: '20vh',
              opacity: 0,
              scale: 0.9,
              clipPath: 'inset(10% 5% 10% 5% round 60px)',
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 60px)',
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 10%',
                scrub: 1.5,
              }
            }
          );
        }

        // Deep-Dive Element Sequencing
        const elements = section.querySelectorAll('[data-journey-element]');
        if (elements.length > 0) {
          gsap.from(elements, {
            y: 150,
            opacity: 0,
            rotationX: -15,
            scale: 0.8,
            filter: 'blur(10px)',
            stagger: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 20%',
              scrub: 1.5,
            }
          });
        }

        // Section Stacking Exit
        if (!isLast) {
          gsap.to(section, {
            scale: 0.85,
            opacity: 0.4,
            filter: 'blur(8px)',
            y: '-10vh',
            ease: 'power1.in',
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: 1,
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
    <div ref={wrapperRef} id="journey-wrapper" className="relative">
      {children}
    </div>
  );
};
