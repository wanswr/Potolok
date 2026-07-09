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
        stagger: 0.2,
        duration: 1.5,
        ease: 'expo.out'
      }, '-=1.2');

      // 2. Scroll Animation (The Journey Start)
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
          filter: 'brightness(0.7)',
          ease: 'none'
        }, 0.5);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-graphite">
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <Image
          src="/images/room-classic.jpg"
          alt="Luxury Interior"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/20" />
      </div>

      <div ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="reveal mb-8">
           <span className="text-muted-gold text-sm font-bold tracking-[0.4em] uppercase">
             Est. 2012
           </span>
        </div>

        <h1 ref={titleRef} className="text-5xl md:text-8xl font-light tracking-tighter leading-tight mb-12 text-warm-white">
          Пространство <br />
          <span className="italic font-extralight text-stone">начинается сверху</span>
        </h1>

        <div className="reveal">
          <button className="group relative bg-warm-white text-graphite px-12 py-6 rounded-full text-lg font-light overflow-hidden transition-all hover:scale-105 active:scale-95">
            <span className="relative z-10 uppercase tracking-widest text-sm">Получить расчет проекта</span>
            <div className="absolute inset-0 bg-muted-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-warm-white/30">
        <div className="w-[1px] h-12 bg-gradient-to-b from-warm-white/0 to-warm-white/40 animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to explore</span>
      </div>
    </section>
  );
};
