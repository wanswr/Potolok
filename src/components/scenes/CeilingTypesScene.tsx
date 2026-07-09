'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { MOTION_CONFIG } from '@/lib/motion-config';

const states = [
  {
    id: 'standard',
    title: 'Классика',
    desc: 'Идеально ровное белое полотно.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    overlay: null,
  },
  {
    id: 'shadow',
    title: 'Теневой профиль',
    desc: 'Эстетичный зазор между стеной и потолком.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop',
    accentColor: '#1C1C1C',
  },
  {
    id: 'floating',
    title: 'Парящий потолок',
    desc: 'Мягкий свет по периметру создает эффект невесомости.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
    accentColor: '#C5A059',
  },
  {
    id: 'lines',
    title: 'Световые линии',
    desc: 'Графичное освещение как элемент дизайна.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
    accentColor: '#FFFFFF',
  }
];

export const CeilingTypesScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: MOTION_CONFIG.scenes.transformation.duration,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const step = Math.min(
              Math.floor(self.progress * states.length),
              states.length - 1
            );
            setActiveStep(step);
          }
        }
      });

      // Layer transitions
      states.forEach((_, i) => {
        if (i === 0) return;
        tl.to(imagesRef.current[i], {
          opacity: 1,
          ease: 'none',
        }, i / states.length)
        .fromTo(imagesRef.current[i], {
          scale: 1.1,
        }, {
          scale: 1,
          ease: 'none'
        }, i / states.length);
      });

      // Global zoom
      tl.to(containerRef.current, {
        scale: MOTION_CONFIG.scenes.transformation.roomScale,
        ease: 'none'
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-background">
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        {states.map((state, i) => (
          <div
            key={state.id}
            ref={(el) => { if (el) imagesRef.current[i] = el; }}
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i }}
          >
            <Image
              src={state.image}
              alt={state.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>

      <div className="relative z-[50] h-full flex flex-col justify-end pb-24 px-6 md:px-24">
        <div className="max-w-2xl bg-background/10 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10">
          <div className="flex gap-2 mb-6">
            {states.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-500 ${i === activeStep ? 'w-12 bg-accent' : 'w-4 bg-white/20'}`}
              />
            ))}
          </div>

          <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-4 transition-all duration-500">
            {states[activeStep].title}
          </h3>
          <p className="text-xl text-foreground/60 leading-relaxed max-w-xl transition-all duration-500">
            {states[activeStep].desc}
          </p>

          <div className="mt-8 flex gap-6">
             <button className="text-accent font-bold uppercase tracking-widest text-xs border-b border-accent/20 pb-2 hover:border-accent transition-colors">
               Технические детали
             </button>
             <button className="text-foreground/40 font-bold uppercase tracking-widest text-xs border-b border-transparent pb-2 hover:text-foreground transition-colors">
               Стоимость решения
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};
