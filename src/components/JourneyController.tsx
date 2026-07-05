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
    // 1. Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
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

      sections.forEach((section, i) => {
        const isHero = section.getAttribute('data-journey-section') === 'hero';
        const isLast = i === sections.length - 1;
        const elements = section.querySelectorAll('[data-journey-element]');

        // --- SECTION PINNING ---
        // If it's not the hero, we pin it for a while to allow sub-animations
        if (!isHero && !isLast) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });
        }

        // --- SECTION ENTRANCE (Apple Reveal) ---
        if (!isHero) {
          gsap.fromTo(section,
            {
              opacity: 0,
              scale: 0.9,
              y: '20vh',
              filter: 'blur(15px)',
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 20%',
                scrub: 1,
              }
            }
          );
        }

        // --- SUB-ELEMENT SEQUENCING (High Fidelity) ---
        if (elements.length > 0) {
          gsap.fromTo(elements,
            {
              y: 120,
              opacity: 0,
              filter: 'blur(20px)',
              scale: 0.85,
              rotationX: -15,
              transformPerspective: 1000,
            },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              rotationX: 0,
              stagger: {
                amount: 0.8,
                from: 'start',
              },
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: isHero ? 'top top' : 'top 85%',
                end: isHero ? '+=60%' : 'top 15%',
                scrub: 1.5,
              }
            }
          );
        }

        // --- SECTION EXIT ---
        if (!isLast) {
          gsap.to(section, {
            opacity: 0.3,
            scale: 0.95,
            y: '-10vh',
            filter: 'blur(20px)',
            ease: 'power2.in',
            scrollTrigger: {
              trigger: section,
              start: 'bottom 90%',
              end: 'bottom top',
              scrub: 1.5,
            }
          });
        }
      });

      // Global Atmosphere morph
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
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,102,255,0.03),_transparent)]" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
