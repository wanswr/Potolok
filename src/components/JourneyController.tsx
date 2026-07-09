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
    // 1. Initialize Lenis
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

      // Global 3D Setup
      gsap.set(wrapperRef.current, { perspective: MOTION_CONFIG.global.perspective });

      sections.forEach((section, i) => {
        const sectionId = section.getAttribute('data-journey-section') as keyof typeof MOTION_CONFIG.sections;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const config = MOTION_CONFIG.sections[sectionId] as any;
        const isHero = sectionId === 'hero';
        const isLast = i === sections.length - 1;
        const elements = section.querySelectorAll('[data-journey-element]');

        // --- 3D SECTION PINNING ---
        if (!isHero && !isLast && config && 'pinDuration' in config) {
          ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: config.pinDuration,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
          });
        }

        // --- 3D UNFOLDING ENTRANCE ---
        if (!isHero && config) {
          gsap.fromTo(section,
            {
              opacity: 0,
              scale: config.scale || 0.8,
              y: config.entranceY || '40vh',
              rotationX: config.entranceRotateX || -25,
              z: -500,
              filter: 'blur(20px)',
              transformPerspective: 2000,
              transformOrigin: 'center bottom',
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              rotationX: 0,
              z: 0,
              filter: 'blur(0px)',
              ease: 'power4.out',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 10%',
                scrub: MOTION_CONFIG.global.scrub,
              }
            }
          );
        }

        // --- SUB-ELEMENT 3D ASSEMBLY ---
        if (elements.length > 0) {
          const elConfig = MOTION_CONFIG.elements.reveal;
          gsap.fromTo(elements,
            {
              y: elConfig.y,
              z: elConfig.z,
              opacity: 0,
              filter: `blur(${elConfig.blur}px)`,
              scale: elConfig.scale,
              rotationX: elConfig.rotationX,
              transformPerspective: 1000,
            },
            {
              y: 0,
              z: 0,
              opacity: 1,
              filter: 'blur(0px)',
              scale: 1,
              rotationX: 0,
              stagger: {
                amount: MOTION_CONFIG.global.staggerAmount,
                from: 'start',
              },
              ease: 'expo.out',
              scrollTrigger: {
                trigger: section,
                start: isHero ? 'top top' : 'top 85%',
                end: isHero ? '+=60%' : 'top 15%',
                scrub: MOTION_CONFIG.global.scrub,
              }
            }
          );
        }

        // --- 3D STACKING EXIT (Sinking into background) ---
        if (!isLast) {
          const exitConfig = MOTION_CONFIG.elements.exit;
          gsap.to(section, {
            opacity: exitConfig.opacity,
            scale: exitConfig.scale,
            y: exitConfig.y,
            z: exitConfig.z,
            rotationX: exitConfig.rotationX,
            filter: `blur(${exitConfig.blur}px)`,
            transformOrigin: 'center top',
            ease: 'power2.in',
            scrollTrigger: {
              trigger: section,
              start: 'bottom 95%',
              end: 'bottom top',
              scrub: MOTION_CONFIG.global.scrub,
            }
          });
        }

        // --- DYNAMIC 3D ATMOSPHERE ---
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
      {/* Persisted Background Atmosphere with 3D Depth */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,102,255,1),_transparent)] blur-[100px]"
          style={{ opacity: MOTION_CONFIG.global.atmosphereOpacity }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-[0.05]" />
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
