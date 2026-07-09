'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from '@/lib/gsap';
import { MOTION_CONFIG } from '@/lib/motion-config';

export const HeroScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !bgRef.current || !contentRef.current) return;

      // 1. Entrance Animation
      const tl = gsap.timeline();
      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        filter: 'blur(15px)',
        duration: 1.8,
        ease: 'expo.out'
      })
      .from(contentRef.current.querySelectorAll('.reveal'), {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'expo.out'
      }, '-=1.4');

      // 2. Scroll Animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: MOTION_CONFIG.scenes.hero.duration,
          pin: true,
          scrub: true,
          anticipatePin: 1,
        }
      });

      scrollTl
        .to(bgRef.current, {
          scale: MOTION_CONFIG.scenes.hero.zoomScale,
          ease: 'none'
        }, 0)
        .to(contentRef.current, {
          opacity: 0,
          y: -50,
          filter: 'blur(10px)',
          ease: 'none'
        }, 0)
        .to(bgRef.current, {
          filter: 'brightness(0.5) blur(5px)',
          ease: 'none'
        }, 0.5);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-graphite">
      {/* Dynamic Background */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        {/* Using a high-end architectural video/image loop */}
        <Image
          src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
          alt="Premium Interior"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="reveal mb-6">
           <span className="inline-block px-4 py-1 border border-muted-gold/30 rounded-full text-muted-gold text-[10px] font-bold tracking-[0.4em] uppercase bg-muted-gold/5 backdrop-blur-md">
             Premium Architectural Solutions
           </span>
        </div>

        <h1 ref={titleRef} className="text-4xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.1] mb-8 text-warm-white max-w-6xl">
          Натяжные потолки и интерьерные решения <br className="hidden md:block" />
          <span className="italic font-extralight text-muted-gold/80">премиум-класса</span>
        </h1>

        <p className="reveal text-stone text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
          Создаем идеально ровные потолки любой сложности <br className="hidden md:block" />
          с гарантией качества и аккуратным монтажом
        </p>

        <div className="reveal flex flex-col md:flex-row gap-4 md:gap-6">
          <button className="group relative bg-muted-gold text-graphite px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-muted-gold/20">
            <span className="relative z-10">Получить расчет</span>
            <div className="absolute inset-0 bg-warm-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button className="group relative bg-transparent border border-warm-white/20 text-warm-white px-10 py-5 rounded-full text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:border-warm-white/60 hover:bg-warm-white/5 active:scale-95">
            <span className="relative z-10">Записаться на замер</span>
          </button>
        </div>

        {/* Quick Advantages */}
        <div className="reveal mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-warm-white/10 pt-12">
          {[
            { label: 'Опыт работы', val: '10+ лет' },
            { label: 'Проектов', val: '1500+' },
            { label: 'Гарантия', val: '10 лет' },
            { label: 'Монтаж', val: 'Аккуратный' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-muted-gold text-xl md:text-2xl font-light mb-1">{item.val}</span>
              <span className="text-[10px] uppercase tracking-widest text-stone/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-warm-white/20">
        <div className="w-[1px] h-10 bg-gradient-to-b from-warm-white/0 to-warm-white/40 animate-pulse" />
        <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Explore Quality</span>
      </div>
    </section>
  );
};
