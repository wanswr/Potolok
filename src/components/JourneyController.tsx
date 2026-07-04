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
    // 1. Initialize Lenis with refined parameters for premium smoothness
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('section[data-journey-section]');

      sections.forEach((section, i) => {
        const isHero = i === 0;
        const isLast = i === sections.length - 1;
        const elements = section.querySelectorAll('[data-journey-element]');

        // --- SECTION PINNING & SEQUENCED REVEAL ---
        // Instead of just scrolling through, we pin the section if it has complex elements
        if (elements.length > 0 && !isHero && !isLast) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=80%',
            pin: true,
            pinSpacing: true,
          });
        }

        // --- ENTRANCE JOURNEY (Non-Destructive) ---
        if (!isHero) {
          gsap.fromTo(section,
            {
              y: '15vh',
              opacity: 0,
              scale: 0.95,
              filter: 'blur(10px)',
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 20%',
                scrub: 1.2,
              }
            }
          );
        }

        // --- ELEMENT ASSEMBLY (Apple Fidelity) ---
        if (elements.length > 0) {
          gsap.from(elements, {
            y: 80,
            opacity: 0,
            filter: 'blur(8px)',
            scale: 0.9,
            stagger: {
              amount: 0.6,
              from: 'start',
            },
            ease: 'expo.out',
            scrollTrigger: {
              trigger: section,
              start: isHero ? 'top top' : 'top 80%',
              end: 'top 20%',
              scrub: 1,
            }
          });
        }

        // --- GENTLE SECTION EXIT ---
        if (!isLast) {
          gsap.to(section, {
            opacity: 0.2,
            scale: 0.95,
            y: '-10vh',
            filter: 'blur(10px)',
            ease: 'power1.in',
            scrollTrigger: {
              trigger: section,
              start: 'bottom 90%',
              end: 'bottom top',
              scrub: 1,
            }
          });
        }
      });

      // Global Atmosphere (Dark/Light morph)
      gsap.to('main', {
        backgroundColor: '#050505',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
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
      {/* Persisted Interior Canvas Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,102,255,0.05),_transparent)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.03]" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
