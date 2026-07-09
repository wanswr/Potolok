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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-wrapper',
          start: '300vh top',
          end: '450vh top',
          scrub: true,
        }
      });

      tl.to(layerShadowRef.current, { opacity: 1, duration: 1 })
        .to(layerFloatingRef.current, { opacity: 1, duration: 1 })
        .to(layerLinesRef.current, { opacity: 1, duration: 1 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop" alt="Luxury Living" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div ref={layerShadowRef} className="absolute inset-0 w-full h-full opacity-0">
         <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/80 to-transparent" />
      </div>
      <div ref={layerFloatingRef} className="absolute inset-0 w-full h-full opacity-0">
         <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(197,160,89,0.3)]" />
      </div>
      <div ref={layerLinesRef} className="absolute inset-0 w-full h-full opacity-0">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-accent/60 blur-sm shadow-[0_0_20px_rgba(197,160,89,0.8)]" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-20">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-8xl text-warm-white mb-6">Эволюция <br /> пространства</h2>
          <p className="text-xl md:text-2xl text-stone font-light max-w-2xl">
            От минималистичного теневого зазора до архитектурных световых инсталляций.
          </p>
        </div>
      </div>
    </section>
  );
};
