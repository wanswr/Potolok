'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { MOTION_CONFIG } from '@/lib/motion-config';

export const MaterialScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !imageRef.current || !textRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: MOTION_CONFIG.scenes.material.duration,
          pin: true,
          scrub: true,
        }
      });

      tl.from(imageRef.current, {
        scale: 0.8,
        filter: 'blur(20px)',
        opacity: 0,
        ease: 'none'
      }, 0)
      .to(imageRef.current, {
        scale: MOTION_CONFIG.scenes.material.zoomScale,
        ease: 'none'
      }, 0)
      .from(textRef.current, {
        y: 100,
        opacity: 0,
        filter: 'blur(10px)',
        ease: 'none'
      }, 0.2)
      .to(sweepRef.current, {
        xPercent: 200,
        ease: 'power2.inOut'
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-deep-black">
      <div ref={imageRef} className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="relative w-full h-full">
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop"
              alt="Ceiling Texture Macro"
              fill
              className="object-cover opacity-60"
            />
            <div
              ref={sweepRef}
              className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            />
        </div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <div ref={textRef} className="max-w-3xl">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-6">
             Безупречная <br />
             <span className="text-accent italic">фактура</span>
          </h2>
          <p className="text-xl text-white/50 leading-relaxed">
            Каждое полотно проходит 3 этапа контроля качества. <br />
            Идеально ровная поверхность, созданная для игры света.
          </p>
        </div>
      </div>
    </section>
  );
};
