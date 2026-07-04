'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'Заявка',
    description: 'Оставьте заявку на сайте или позвоните нам. Менеджер проконсультирует вас и назначит время замера.',
  },
  {
    title: 'Бесплатный замер',
    description: 'Наш технолог приедет с образцами материалов, сделает точный замер и составит смету прямо на месте.',
  },
  {
    title: 'Производство',
    description: 'Изготавливаем полотно по вашим размерам на собственном производстве с использованием премиум материалов.',
  },
  {
    title: 'Монтаж',
    description: 'Чистый монтаж за 1 день. Используем безопасное оборудование и систему пылеудаления.',
  },
  {
    title: 'Гарантия',
    description: 'Вы принимаете работу, подписываем акт и вы получаете официальную гарантию 15 лет.',
  },
];

export const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
          end: 'bottom 60%',
          scrub: true,
        },
      });

      // Animate steps
      gsap.utils.toArray<HTMLElement>('.timeline-step').forEach((step) => {
        gsap.from(step, {
          x: -20,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-20 text-center">
            Как мы <span className="text-accent">работаем</span>
          </h2>

          <div ref={containerRef} className="relative">
            {/* Background Line */}
            <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-soft -translate-x-1/2" />

            {/* Progress Line */}
            <div
              ref={progressRef}
              className="absolute left-[20px] md:left-1/2 top-0 w-[2px] bg-accent -translate-x-1/2 z-10 h-0"
            />

            <div className="space-y-32">
              {steps.map((step, index) => (
                <div key={index} className="timeline-step relative flex flex-col md:flex-row items-center">
                  {/* Step Number Circle */}
                  <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-gray-border flex items-center justify-center font-bold text-lg z-20 transition-colors group-hover:border-accent">
                    <div className="w-4 h-4 rounded-full bg-accent opacity-0 transition-opacity" />
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className={`pl-16 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:ml-auto md:pl-20'}`}>
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-xl text-black/50 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
