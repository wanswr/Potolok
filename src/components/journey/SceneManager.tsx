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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

    // 2. Master GSAP Animation
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('.journey-scene');

      // Create a master timeline for the whole journey
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-wrapper',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      scenes.forEach((scene, i) => {
        // Transition between scenes
        if (i > 0) {
          // Fade In current
          masterTl.to(scene, {
            opacity: 1,
            autoAlpha: 1,
            visibility: 'visible',
            duration: 1,
          }, `scene-${i}`);

          // Fade Out previous
          masterTl.to(scenes[i-1], {
            opacity: 0,
            autoAlpha: 0,
            visibility: 'hidden',
            duration: 1,
          }, `scene-${i}`);
        }

        // Internal scene animations (targeted by ID/Class)
        // Genesis (i=0)
        if (i === 0) {
          masterTl.fromTo(scene.querySelector('.scene-bg'),
            { scale: 1.2, filter: 'blur(20px)' },
            { scale: 1, filter: 'blur(0px)', duration: 2 },
            0
          );
          masterTl.fromTo(scene.querySelector('.scene-content'),
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1 },
            0.5
          );
        }

        // Material (i=1)
        if (i === 1) {
          masterTl.fromTo(scene.querySelector('.light-sweep'),
            { xPercent: -100 },
            { xPercent: 100, duration: 2 },
            `scene-${i}+=0.5`
          );
        }

        // Evolution (i=2)
        if (i === 2) {
          const layers = scene.querySelectorAll('.evo-layer');
          layers.forEach((layer, li) => {
            masterTl.to(layer, { opacity: 1, duration: 1 }, `scene-${i}+=${li * 0.5 + 0.5}`);
          });
        }

        // Light (i=3)
        if (i === 3) {
          masterTl.to(scene.querySelector('.night-overlay'),
            { opacity: 0.8, duration: 2 },
            `scene-${i}+=0.5`
          );
        }

        // Process (i=4)
        if (i === 4) {
          const pLayers = scene.querySelectorAll('.proc-layer');
          pLayers.forEach((layer, li) => {
             masterTl.to(layer, { opacity: 1, duration: 1 }, `scene-${i}+=${li * 0.5 + 0.5}`);
          });
        }

        // Result (i=5)
        if (i === 5) {
          masterTl.to(scene.querySelector('.gallery-strip'),
            { xPercent: -50, duration: 3 },
            `scene-${i}+=0.2`
          );
        }

        // Final (i=6)
        if (i === 6) {
          masterTl.fromTo(scene.querySelector('.final-content'),
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1 },
            `scene-${i}+=0.5`
          );
        }

        // Add some "waiting" time for each scene
        masterTl.to({}, { duration: 1 });
      });

    }, wrapperRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div id="journey-wrapper" className="relative w-full h-[1400vh]">
      <div className="sticky top-0 w-full h-screen overflow-hidden bg-graphite">
        <div ref={containerRef} className="relative w-full h-full">
          {React.Children.map(children, (child, index) => (
            <div
              key={index}
              className="journey-scene absolute inset-0 w-full h-full opacity-0 invisible"
              style={{
                zIndex: 10 + index,
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? 'visible' : 'hidden'
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
