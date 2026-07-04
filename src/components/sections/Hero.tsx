'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation
      const entranceTl = gsap.timeline();
      entranceTl
        .from(titleRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
        })
        .from(subtitleRef.current, {
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
        }, '-=1.2')
        .from(ctaRef.current?.children || [], {
          y: 20,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
        }, '-=1')
        .from(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 1,
        }, '-=0.5');

      // 2. Scroll-Driven "Camera Flight"
      // Pin the container for 150vh
      const flightTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      flightTl
        // Phase 1: Moving into the room
        .to(bgWrapperRef.current, {
          scale: 1.4,
          ease: 'none',
          duration: 1,
        }, 0)
        .to(contentRef.current, {
          y: -100,
          opacity: 0,
          scale: 0.9,
          ease: 'none',
          duration: 0.5,
        }, 0)
        .to(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.2,
        }, 0)

        // Phase 2: Tilting up to the ceiling
        .to(bgWrapperRef.current, {
          yPercent: 30, // Moves image down to show more of the "top" part (simulating camera tilt up)
          ease: 'power2.inOut',
          duration: 1,
        }, 0.5)

        // Subtle light movement effect
        .to('.hero-light', {
          opacity: 0.8,
          x: 100,
          y: -50,
          duration: 1,
        }, 0);

    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Immersive Background */}
      <div
        ref={bgWrapperRef}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />

        {/* Dynamic Light Overlay */}
        <div className="hero-light absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/20 blur-[150px] rounded-full opacity-0 z-10" />

        <Image
          src="https://images.unsplash.com/photo-1600607687940-47a0f68d69ce?q=80&w=2070&auto=format&fit=crop"
          alt="Premium Stretch Ceiling Room"
          fill
          priority
          className="w-full h-full object-cover origin-center"
        />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="relative z-20 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center text-white pt-48"
      >
        <div className="max-w-4xl">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-12 overflow-hidden">
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-white/80">Premium Quality</span>
          </div>

          <h1
            ref={titleRef}
            className="text-6xl md:text-9xl font-bold mb-8 leading-[1] tracking-tight"
          >
            Потолки как <br />
            <span className="text-accent italic">искусство</span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-3xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Трансформируем пространство светом и формой. <br className="hidden md:block" />
            Монтаж за 1 день с пожизненной гарантией.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group relative w-full sm:w-auto bg-accent text-white px-12 py-6 rounded-full text-xl font-bold transition-all overflow-hidden">
              <span className="relative z-10">Рассчитать стоимость</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="w-full sm:w-auto px-12 py-6 rounded-full text-xl font-semibold border border-white/20 backdrop-blur-md hover:bg-white/10 transition-all">
              Галерея работ
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
        <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-bold">Начните погружение</span>
      </div>
    </section>
  );
};
