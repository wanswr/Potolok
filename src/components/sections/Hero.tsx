'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animations
      const tl = gsap.timeline();

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      .from(ctaRef.current?.children || [], {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }, '-=0.6');

      // Scroll Animations
      gsap.to(bgRef.current, {
        scale: 1.15,
        yPercent: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Future Scroll Video Placeholder Logic
      // This section is already set up to pin the container if we switch to canvas/video scrub
      /*
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
      });
      */
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background with Zoom/Parallax */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
          alt="Premium Interior"
          fill
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1
            ref={titleRef}
            className="text-5xl md:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            Натяжные потолки <br />
            <span className="text-white/90 font-medium">нового поколения</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Создаем безупречные интерьеры в Москве и МО. <br className="hidden md:block" />
            Чистый монтаж, премиальные материалы, гарантия 15 лет.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <button className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-white px-10 py-5 rounded-full text-lg font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98]">
              Рассчитать стоимость
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-10 py-5 rounded-full text-lg font-semibold transition-all">
              Посмотреть работы
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Scroll to explore</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};
