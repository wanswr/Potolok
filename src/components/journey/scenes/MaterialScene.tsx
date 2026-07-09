'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export const MaterialScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-container',
          start: '150vh top',
          end: '300vh top',
          scrub: true,
        }
      });

      tl.fromTo(textureRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' }
      )
      .fromTo(lightRef.current,
        { xPercent: -100, opacity: 0 },
        { xPercent: 100, opacity: 0.6, ease: 'power1.inOut' },
        '<'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full flex items-center justify-center bg-graphite overflow-hidden">
      <div ref={textureRef} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
          alt="Premium Texture"
          fill
          className="object-cover opacity-60"
        />
        <div ref={lightRef} className="absolute inset-0 bg-gradient-to-r from-transparent via-warm-white/10 to-transparent w-[200%] -skew-x-12" />
      </div>

      <div className="relative z-10 text-center px-6">
        <h2 className="text-5xl md:text-8xl text-warm-white mb-8">Материя качества</h2>
        <p className="text-xl md:text-2xl text-stone max-w-3xl mx-auto font-light leading-relaxed">
          Безупречно ровное полотно. <br />
          Мы используем только сертифицированные материалы <br />
          с уникальной глубиной фактуры.
        </p>
      </div>
    </section>
  );
};
