'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { JOURNEY_CONFIG } from '@/lib/motion-config';

gsap.registerPlugin(ScrollTrigger);

interface JourneyControllerProps {
  children: React.ReactNode;
}

export const JourneyController: React.FC<JourneyControllerProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Setup Smooth Scrolling (if needed) or main scroll tracking
      // For now we rely on native scroll but with high scrub values in our triggers

      // 2. Global Section Transition Logic
      // We can iterate through sections if we have a way to identify them
      // Or we can define specific complex transitions here

      const sections = gsap.utils.toArray<HTMLElement>('section[data-journey-section]');

      sections.forEach((section, i) => {
        // Individual Section Reveal with Parallax
        gsap.fromTo(section,
          {
            y: i === 0 ? 0 : 150,
            opacity: i === 0 ? 1 : 0.8,
            scale: i === 0 ? 1 : 0.95,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'top top',
              scrub: JOURNEY_CONFIG.defaults.scrub,
            }
          }
        );

        // Section Outro (Disappearing)
        if (i < sections.length - 1) {
          gsap.to(section, {
            y: -150,
            opacity: 0.5,
            scale: 0.9,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              scrub: JOURNEY_CONFIG.defaults.scrub,
            }
          });
        }
      });

      // Special complex orchestration can go here
      // For example, the Hero to Trust transition
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} id="journey-wrapper" className="relative">
      <div ref={contentRef} id="journey-content">
        {children}
      </div>
    </div>
  );
};
