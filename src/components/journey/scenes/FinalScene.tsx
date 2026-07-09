'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const FinalScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-wrapper',
          start: '1050vh top',
          end: '1150vh top',
          scrub: true,
        }
      });

      tl.fromTo(contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full bg-graphite flex items-center justify-center overflow-hidden">
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-5xl md:text-9xl text-warm-white mb-12">
          Готовы <br /> начать?
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
           <button className="px-12 py-6 bg-accent text-graphite text-xl font-bold rounded-full transition-transform hover:scale-105 active:scale-95">
             Обсудить проект
           </button>
           <button className="px-12 py-6 border border-warm-white/20 text-warm-white text-xl font-medium rounded-full hover:bg-warm-white/10 transition-colors">
             Смотреть каталог
           </button>
        </div>

        <p className="mt-20 text-stone/40 text-sm uppercase tracking-widest font-bold">
          PotolokBel — Искусство вашего пространства
        </p>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};
