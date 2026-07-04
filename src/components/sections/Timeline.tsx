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
      // PROGRESS LINE (SAFE)
      if (progressRef.current && containerRef.current) {
        gsap.fromTo(
          progressRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 50%',
              end: 'bottom 50%',
              scrub: true,
            },
          }
        );
      }

      // STEPS ANIMATION
      const stepsElements = gsap.utils.toArray<HTMLElement>('.timeline-step');
      stepsElements.forEach((step) => {
        const circle = step.querySelector('.step-circle');
        if (!circle) return;

        gsap.to(circle, {
          scale: 1.15,
          backgroundColor: '#0066FF',
          borderColor: '#0066FF',
          color: '#ffffff',
          ease: 'none',
          scrollTrigger: {
            trigger: step,
            start: 'top 65%',
            end: 'top 40%',
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-journey-section="timeline"
      className="section-padding bg-white overflow-hidden relative z-10 rounded-t-[60px] -mt-20"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 data-journey-element className="text-4xl md:text-6xl font-bold tracking-tight mb-20 text-center">
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
                <div
                  key={index}
                  data-journey-element
                  className="timeline-step relative flex flex-col md:flex-row items-center"
                >
                  <div className="step-circle absolute left-[20px] md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-2 border-gray-border flex items-center justify-center font-bold text-xl z-20 transition-all duration-500">
                    {index + 1}
                  </div>

                  <div className={`step-content pl-16 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-20 md:text-right' : 'md:ml-auto md:pl-20'}`}>
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
