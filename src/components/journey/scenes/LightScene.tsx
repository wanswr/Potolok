'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export const LightScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Light Story Timeline (Starts at 500vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-container',
          start: '450vh top',
          end: '600vh top',
          scrub: true,
        }
      });

      tl.fromTo(overlayRef.current,
        { backgroundColor: 'rgba(0,0,0,0)' },
        { backgroundColor: 'rgba(10,10,20,0.85)', ease: 'none' }
      )
      .fromTo(contentRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        '<'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Atmospheric Interior"
          fill
          className="object-cover"
        />
        {/* Night Overlay */}
        <div ref={overlayRef} className="absolute inset-0 z-10" />
      </div>

      <div ref={contentRef} className="relative z-20 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-8xl text-warm-white mb-8">
            Дыхание света
          </h2>
          <p className="text-xl md:text-2xl text-stone max-w-2xl mx-auto font-light">
            Интеллектуальные сценарии освещения. <br />
            От бодрящего утра до уютного камерного вечера.
          </p>
        </div>
      </div>
    </section>
  );
};
