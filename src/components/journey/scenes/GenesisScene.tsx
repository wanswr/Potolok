'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export const GenesisScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Timeline (Scroll-triggered by SceneManager)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: true,
        }
      });

      tl.fromTo(bgRef.current,
        { scale: 1.2, filter: 'blur(20px)', opacity: 0 },
        { scale: 1, filter: 'blur(0px)', opacity: 1, ease: 'power2.out' }
      )
      .fromTo(contentRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        '-=0.5'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full flex items-center justify-center bg-graphite overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1600607687940-47a0f68d69ce?q=80&w=2070&auto=format&fit=crop"
          alt="Minimalist Architecture"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div ref={contentRef} className="relative z-10 text-center px-6">
        <h1 className="text-6xl md:text-9xl text-warm-white mb-6">
          Пространство <br /> начинается сверху
        </h1>
        <p className="text-xl md:text-2xl text-warm-white/60 max-w-2xl mx-auto font-light">
          Архитектурные натяжные потолки как основа современного интерьера.
        </p>
      </div>
    </section>
  );
};
