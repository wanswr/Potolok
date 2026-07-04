'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ceilingTypes = [
  {
    title: 'Матовый',
    description: 'Классическое решение, которое выглядит как идеально ровная оштукатуренная поверхность. Не бликует.',
    features: ['Без бликов', 'Скрывает дефекты', 'Долговечность'],
    price: 'от 550 ₽/м²',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop',
  },
  {
    title: 'Сатиновый',
    description: 'Обладает легким перламутровым блеском и гладкой текстурой. Идеально для спален и гостиных.',
    features: ['Мягкий блеск', 'Элегантный вид', 'Универсальность'],
    price: 'от 650 ₽/м²',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2030&auto=format&fit=crop',
  },
  {
    title: 'Глянцевый',
    description: 'Зеркальный эффект визуально расширяет пространство. Отлично подходит для небольших помещений.',
    features: ['Зеркальный эффект', 'Визуальный объем', 'Яркие цвета'],
    price: 'от 600 ₽/м²',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop',
  },
  {
    title: 'Световой',
    description: 'Современное решение со встроенными световыми линиями или парящим эффектом по периметру.',
    features: ['Встроенный свет', 'WOW-эффект', 'Трендовый дизайн'],
    price: 'от 1200 ₽/м²',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?q=80&w=2070&auto=format&fit=crop',
  },
];

export const CeilingTypes = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ceiling-card', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="types" ref={containerRef} className="section-padding bg-gray-soft">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Виды <br />
              <span className="text-accent">потолков</span>
            </h2>
            <p className="text-xl text-black/60">
              Подберем идеальное решение под ваш бюджет и интерьер.
              От классики до ультрасовременных световых решений.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-3 text-lg font-bold group">
            Смотреть все виды
            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ceilingTypes.map((type, index) => (
            <div
              key={index}
              className="ceiling-card group relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden bg-white border border-black/5"
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <div className="mb-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="text-accent font-bold text-lg mb-2">{type.price}</div>
                  <h3 className="text-4xl font-bold mb-4">{type.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                    {type.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {type.features.map((feature, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm border border-white/10">
                      {feature}
                    </span>
                  ))}
                </div>

                <button className="w-full md:w-fit bg-white text-black px-8 py-4 rounded-full font-bold transition-all hover:bg-accent hover:text-white">
                  Выбрать этот тип
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
