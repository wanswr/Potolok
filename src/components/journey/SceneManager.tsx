'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SceneManagerProps {
  children: React.ReactNode[];
}

export const SceneManager: React.FC<SceneManagerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scenes = gsap.utils.toArray<HTMLElement>('.journey-scene');

      scenes.forEach((scene, i) => {
        // We ensure the first scene is visible and the rest are hidden
        gsap.set(scene, {
          opacity: i === 0 ? 1 : 0,
          autoAlpha: i === 0 ? 1 : 0,
          visibility: i === 0 ? 'visible' : 'hidden'
        });

        const startOffset = i * 200; // Each scene gets its 200vh window

        if (i > 0) {
          // Fade IN current scene and Fade OUT previous one
          gsap.timeline({
            scrollTrigger: {
              trigger: '#journey-wrapper',
              start: `${startOffset}vh top`,
              end: `${startOffset + 100}vh top`,
              scrub: true,
            }
          })
          .to(scene, { opacity: 1, autoAlpha: 1, visibility: 'visible' }, 0)
          .to(scenes[i-1], { opacity: 0, autoAlpha: 0, visibility: 'hidden' }, 0);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [children.length]);

  return (
    <div id="journey-wrapper" style={{ position: 'relative', width: '100%', height: '1400vh' }}>
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
        <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
          {React.Children.map(children, (child, index) => (
            <div key={index} className="journey-scene" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
