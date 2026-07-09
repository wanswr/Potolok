'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export const ProcessScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerEmptyRef = useRef<HTMLDivElement>(null);
  const layerWorkRef = useRef<HTMLDivElement>(null);
  const layerFinalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Process Timeline (Starts at 700vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-wrapper',
          start: '600vh top',
          end: '750vh top',
          scrub: true,
        }
      });

      tl.to(layerWorkRef.current, { opacity: 1, duration: 1 })
        .to(layerFinalRef.current, { opacity: 1, duration: 1 });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full bg-graphite overflow-hidden">
      {/* Step 1: Empty Room */}
      <div ref={layerEmptyRef} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop"
          alt="Concrete Room"
          fill
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Step 2: Work in Progress */}
      <div ref={layerWorkRef} className="absolute inset-0 w-full h-full opacity-0">
        <Image
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop"
          alt="Technical Setup"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
      </div>

      {/* Step 3: Result */}
      <div ref={layerFinalRef} className="absolute inset-0 w-full h-full opacity-0">
        <Image
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2000&auto=format&fit=crop"
          alt="Finished Interior"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-20 h-full flex items-end p-6 md:p-20">
        <div className="max-w-4xl bg-black/20 backdrop-blur-md p-10 rounded-2xl border border-white/10">
          <h2 className="text-4xl md:text-7xl text-warm-white mb-4">
            Путь к результату
          </h2>
          <p className="text-lg md:text-xl text-stone font-light">
            Замер. Проектирование. Чистый монтаж за 1 день. <br />
            Мы берем на себя все сложности, оставляя вам только эстетику.
          </p>
        </div>
      </div>
    </section>
  );
};
