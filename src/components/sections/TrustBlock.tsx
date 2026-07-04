'use client';

import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="section-padding bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Почему выбирают <br />
            <span className="text-accent">PotolokBel</span>
          </h2>
          <p className="text-xl text-black/60 leading-relaxed">
            Мы объединили премиальный сервис, лучшие материалы и профессиональный подход,
            чтобы вы наслаждались результатом долгие годы.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-8 rounded-[32px] bg-gray-soft border border-gray-border hover:bg-white hover:shadow-2xl hover:shadow-black/5 transition-all duration-500"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <benefit.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-black/50 leading-relaxed text-[15px]">
                {benefit.description}
              </p>
            </div>
          ))}

          <div className="p-8 rounded-[32px] bg-accent flex flex-col justify-between text-white md:col-span-2 lg:col-span-1">
            <div>
              <h3 className="text-3xl font-bold mb-4">Работаем по всей Москве и области</h3>
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
