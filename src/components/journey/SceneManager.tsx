'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface SceneManagerProps {
  children: React.ReactNode[];
}

export const SceneManager: React.FC<SceneManagerProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Smooth Scroll (Lenis)
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

    // 2. Global Pinning and Scene Transitions
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('.journey-scene');

      // Pin the wrapper
      ScrollTrigger.create({
        trigger: '#journey-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        pin: '.journey-container',
        pinSpacing: false,
      });

      // Simple Fade Transitions between scenes
      scenes.forEach((scene, i) => {
        if (i === 0) {
          gsap.set(scene, { opacity: 1, autoAlpha: 1 });
          return;
        }

        gsap.set(scene, { opacity: 0, autoAlpha: 0 });

        // Start fading in early
        const startOffset = i * 150; // Each scene roughly 150vh apart in logic

        gsap.to(scene, {
          opacity: 1,
          autoAlpha: 1,
          scrollTrigger: {
            trigger: '#journey-wrapper',
            start: `${startOffset}vh top`,
            end: `${startOffset + 50}vh top`,
            scrub: true,
          }
        });

        // Fade out previous
        if (i > 0) {
          gsap.to(scenes[i-1], {
            opacity: 0,
            autoAlpha: 0,
            scrollTrigger: {
              trigger: '#journey-wrapper',
              start: `${startOffset}vh top`,
              end: `${startOffset + 50}vh top`,
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
  }, [children.length]);

  return (
    <div ref={wrapperRef} className="journey-container fixed inset-0 w-full h-screen overflow-hidden bg-graphite pointer-events-auto">
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="journey-scene absolute inset-0 w-full h-full overflow-hidden"
          style={{ zIndex: 10 + index }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
