'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export const EvolutionScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerShadowRef = useRef<HTMLDivElement>(null);
  const layerFloatingRef = useRef<HTMLDivElement>(null);
  const layerLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Evolution Timeline (Starts at 200vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-wrapper',
          start: '200vh top',
          end: '500vh top',
          scrub: true,
        }
      });

      // Step 1: Shadow Gap (200vh - 300vh)
      tl.to(layerShadowRef.current, { opacity: 1, duration: 1 })
        .to({}, { duration: 0.5 }) // Pause

      // Step 2: Floating Effect (300vh - 400vh)
      tl.to(layerFloatingRef.current, { opacity: 1, duration: 1 })
        .to({}, { duration: 0.5 })

      // Step 3: Light Lines (400vh - 500vh)
      tl.to(layerLinesRef.current, { opacity: 1, duration: 1 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full bg-graphite overflow-hidden">
      {/* Base Room Layer */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Living Room"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Evolution Layers (Overlays) */}
      <div ref={layerShadowRef} className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000">
         <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/80 to-transparent" />
         <div className="absolute top-10 left-10 text-warm-white/80 uppercase tracking-widest text-sm font-bold">Shadow Profile</div>
      </div>

      <div ref={layerFloatingRef} className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000">
         <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(197,160,89,0.3)]" />
         <div className="absolute top-6 md:p-20 left-10 text-accent uppercase tracking-widest text-sm font-bold">Floating Effect</div>
      </div>

      <div ref={layerLinesRef} className="absolute inset-0 w-full h-full opacity-0 transition-opacity duration-1000">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-accent/60 blur-sm shadow-[0_0_20px_rgba(197,160,89,0.8)]" />
         <div className="absolute top-30 left-10 text-accent uppercase tracking-widest text-sm font-bold">Light Architecture</div>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-20">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-8xl text-warm-white mb-6">
            Эволюция <br /> пространства
          </h2>
          <p className="text-xl md:text-2xl text-stone font-light max-w-2xl">
            От минималистичного теневого зазора до архитектурных световых инсталляций.
            Одна комната — бесконечные возможности.
          </p>
        </div>
      </div>
    </section>
  );
};
