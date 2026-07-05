'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { MOTION_CONFIG } from '@/lib/motion-config';

gsap.registerPlugin(ScrollTrigger);

interface JourneyControllerProps {
  children: React.ReactNode;
}

export const JourneyController: React.FC<JourneyControllerProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Lenis with Config
    const lenis = new Lenis({
      duration: MOTION_CONFIG.global.smoothScrollDuration,
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
        const sectionId = section.getAttribute('data-journey-section') as keyof typeof MOTION_CONFIG.sections;
        const config = MOTION_CONFIG.sections[sectionId] as any;
        const isHero = sectionId === 'hero';
        const isLast = i === sections.length - 1;
        const elements = section.querySelectorAll('[data-journey-element]');

        // --- ENHANCED SECTION PINNING ---
        if (!isHero && !isLast && config?.pinDuration) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: config.pinDuration,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });
        }

        // --- PREMIUM ENTRANCE JOURNEY (Using Config) ---
        if (!isHero && config) {
          gsap.fromTo(section,
            {
              opacity: 0,
              scale: MOTION_CONFIG.sections.features.scale, // fallback scale
              y: config.entranceY || '20vh',
              filter: `blur(${MOTION_CONFIG.sections.features.blur}px)`,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              ease: MOTION_CONFIG.global.ease,
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 15%',
                scrub: MOTION_CONFIG.global.scrub,
              }
            }
          );
        }

        // --- SUB-ELEMENT HIGH-FIDELITY ASSEMBLY ---
        if (elements.length > 0) {
          const elConfig = MOTION_CONFIG.elements.reveal;
          gsap.fromTo(elements,
            {
              y: elConfig.y,
              opacity: 0,
              filter: `blur(${elConfig.blur}px)`,
              scale: elConfig.scale,
              rotationX: elConfig.rotationX,
              transformPerspective: 1000,
            },
            {
              y: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              rotationX: 0,
              stagger: {
                amount: MOTION_CONFIG.global.staggerAmount,
                from: 'start',
              },
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: isHero ? 'top top' : 'top 85%',
                end: isHero ? '+=60%' : 'top 10%',
                scrub: MOTION_CONFIG.global.scrub,
              }
            }
          );
        }

        // --- SECTION EXIT (Layered Stacking) ---
        if (!isLast) {
          const exitConfig = MOTION_CONFIG.elements.exit;
          gsap.to(section, {
            opacity: exitConfig.opacity,
            scale: exitConfig.scale,
            y: exitConfig.y,
            filter: `blur(${exitConfig.blur}px)`,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: section,
              start: 'bottom 95%',
              end: 'bottom top',
              scrub: MOTION_CONFIG.global.scrub,
            }
          });
        }

        // --- DYNAMIC BACKGROUND ATMOSPHERE ---
        if (config?.backgroundColor) {
          gsap.to('main', {
            backgroundColor: config.backgroundColor,
            scrollTrigger: {
              trigger: section,
              start: 'top 50%',
              end: 'bottom 50%',
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
    <div ref={wrapperRef} id="journey-wrapper" className="relative">
      {/* Persisted Background Atmosphere with Configurable Opacity */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,102,255,1),_transparent)]"
          style={{ opacity: MOTION_CONFIG.global.atmosphereOpacity }}
        />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
