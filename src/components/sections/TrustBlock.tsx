'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Sparkles, Clock, Ruler } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Clock,
    title: 'Монтаж за 1 день',
    description: 'Установка потолка в одной комнате занимает от 2 до 4 часов.',
  },
  {
    icon: Ruler,
    title: 'Бесплатный замер',
    description: 'Технолог приедет в удобное время, сделает расчет и подберет материал.',
  },
  {
    icon: Sparkles,
    title: 'Чистый монтаж',
    description: 'Используем профессиональное оборудование с пылеудалением. Никакой грязи.',
  },
  {
    icon: Shield,
    title: 'Гарантия 15 лет',
    description: 'Официальный договор и гарантия на материалы и все виды работ.',
  },
  {
    icon: Zap,
    title: 'Работа по договору',
    description: 'Фиксированная стоимость, которая не изменится в процессе работы.',
  },
];

export const TrustBlock = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      id="features"
      ref={sectionRef}
      data-journey-section="features"
      className="section-padding bg-black overflow-hidden rounded-t-[80px] relative z-20 -mt-20 shadow-[0_-20px_100px_rgba(0,0,0,0.8)]"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2
            ref={titleRef}
            data-journey-element
            className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white"
          >
            Почему выбирают <br />
            <span className="text-accent">PotolokBel</span>
          </h2>

          <p data-journey-element className="text-xl text-white/40 leading-relaxed max-w-2xl">
            Мы объединили премиальный сервис, лучшие материалы и профессиональный подход,
            чтобы вы наслаждались результатом долгие годы.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '3000px' }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              data-journey-element
              className="group p-8 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:shadow-[0_0_50px_rgba(0,102,255,0.15)] transition-all duration-500 hover:-translate-y-6 hover:rotate-2 hover:scale-[1.02] transform-gpu"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <benefit.icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
              </div>

              <h3 className="text-2xl font-bold mb-4 text-white">{benefit.title}</h3>

              <p className="text-white/40 leading-relaxed text-[15px]">
                {benefit.description}
              </p>
            </div>
          ))}

          <div data-journey-element className="p-8 rounded-[32px] bg-accent flex flex-col justify-between text-white md:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Работаем по всей Москве и области
              </h3>
              <p className="text-white/80 leading-relaxed mb-8">
                Выезд замерщика в день обращения. Бесплатно.
              </p>
            </div>

            <button className="bg-white text-accent px-8 py-4 rounded-full font-bold w-fit hover:scale-105 transition-transform">
              Записаться на замер
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
