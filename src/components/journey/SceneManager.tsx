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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
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

    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('.journey-scene');

      scenes.forEach((scene, i) => {
        const start = i * 150; // Each scene starts after 150vh of scroll

        if (i === 0) {
          gsap.set(scene, { opacity: 1, autoAlpha: 1, visibility: 'visible' });
        } else {
          gsap.set(scene, { opacity: 0, autoAlpha: 0, visibility: 'hidden' });

          // Fade In
          gsap.to(scene, {
            opacity: 1,
            autoAlpha: 1,
            visibility: 'visible',
            scrollTrigger: {
              trigger: '#journey-container',
              start: `${start}vh top`,
              end: `${start + 50}vh top`,
              scrub: true,
            }
          });

          // Fade Out previous
          gsap.to(scenes[i-1], {
            opacity: 0,
            autoAlpha: 0,
            visibility: 'hidden',
            scrollTrigger: {
              trigger: '#journey-container',
              start: `${start}vh top`,
              end: `${start + 50}vh top`,
              scrub: true,
            }
          });
        }
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, [children.length]);

  return (
    <div id="journey-container" className="relative w-full h-[1200vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-graphite">
        <div ref={containerRef} className="relative w-full h-full">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="journey-scene absolute inset-0 w-full h-full"
              style={{ zIndex: 10 + index }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
