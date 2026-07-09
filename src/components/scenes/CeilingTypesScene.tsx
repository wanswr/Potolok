'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from '@/lib/gsap';
import { MOTION_CONFIG } from '@/lib/motion-config';

const states = [
  {
    id: 'shadow',
    title: 'Теневые потолки',
    desc: 'EuroKraab — эстетичный зазор между стеной и потолком для безупречного минимализма.',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop',
    features: ['Идеальная геометрия', 'Без пластиковых вставок', 'Современный вид']
  },
  {
    id: 'floating',
    title: 'Парящие потолки',
    desc: 'Мягкий свет по периметру создает эффект легкости и визуально расширяет пространство.',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop',
    features: ['Визуальный объем', 'Атмосферное освещение', 'Скрытый монтаж']
  },
  {
    id: 'light',
    title: 'Световые решения',
    desc: 'Интегрированные линии и световые панели для основного и декоративного освещения.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
    features: ['Без люстр', 'Равномерный свет', 'Smart Home ready']
  },
  {
    id: 'complex',
    title: 'Сложные конструкции',
    desc: 'Многоуровневые системы и дизайнерские решения для уникальных архитектурных задач.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    features: ['Любая форма', 'Зонирование', 'Индивидуальный проект']
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

      states.forEach((_, i) => {
        if (i === 0) return;
        tl.to(imagesRef.current[i], {
          opacity: 1,
          ease: 'none',
        }, i / states.length);
      });

      tl.to(containerRef.current, {
        scale: MOTION_CONFIG.scenes.transformation.roomScale,
        ease: 'none'
      }, 0);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-graphite">
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
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-graphite via-transparent to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-[50] h-full flex flex-col justify-center px-6 md:px-24 max-w-4xl">
        <div className="bg-graphite/40 backdrop-blur-3xl p-10 md:p-16 rounded-sm border border-warm-white/10">
          <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block">Наши услуги</span>

          <h3 className="text-3xl md:text-6xl font-extralight text-warm-white mb-6 transition-all duration-500">
            {states[activeStep].title}
          </h3>
          <p className="text-lg md:text-xl text-stone leading-relaxed mb-10 transition-all duration-500 font-light">
            {states[activeStep].desc}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {states[activeStep].features.map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-xs uppercase tracking-widest text-warm-white/60">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-gold" />
                {f}
              </div>
            ))}
          </div>

          <div className="flex gap-6">
             <button className="group bg-muted-gold text-graphite px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95">
               Подробнее
             </button>
             <button className="text-warm-white/40 hover:text-warm-white text-[10px] font-bold uppercase tracking-widest border-b border-warm-white/10 pb-1 transition-all">
               Рассчитать стоимость
             </button>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="absolute bottom-12 right-24 hidden md:flex flex-col gap-4">
        {states.map((_, i) => (
          <div
            key={i}
            className={`w-[2px] transition-all duration-500 ${i === activeStep ? 'h-12 bg-muted-gold' : 'h-4 bg-warm-white/10'}`}
          />
        ))}
      </div>
    </section>
  );
};
