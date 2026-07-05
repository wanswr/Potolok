'use client';

import React, { useRef } from 'react';
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
    light: 'soft-white',
  },
  {
    title: 'Сатиновый',
    description: 'Обладает легким перламутровым блеском и гладкой текстурой. Идеально для спален и гостиных.',
    features: ['Мягкий блеск', 'Элегантный вид', 'Универсальность'],
    price: 'от 650 ₽/м²',
    image: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=2030&auto=format&fit=crop',
    light: 'pearl',
  },
  {
    title: 'Глянцевый',
    description: 'Зеркальный эффект визуально расширяет пространство. Отлично подходит для небольших помещений.',
    features: ['Зеркальный эффект', 'Визуальный объем', 'Яркие цвета'],
    price: 'от 600 ₽/м²',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2064&auto=format&fit=crop',
    light: 'reflective',
  },
  {
    title: 'Звездное небо',
    description: 'Эффект ночного неба с тысячами мерцающих звезд. Идеально для детских и спален.',
    features: ['Мерцание', 'Оптоволокно', 'Уникальный дизайн'],
    price: 'от 2500 ₽/м²',
    image: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2071&auto=format&fit=crop',
    light: 'cosmic',
  },
  {
    title: 'Световой',
    description: 'Современное решение со встроенными световыми линиями или парящим эффектом по периметру.',
    features: ['Встроенный свет', 'WOW-эффект', 'Трендовый дизайн'],
    price: 'от 1200 ₽/м²',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faeaa6?q=80&w=2070&auto=format&fit=crop',
    light: 'led-lines',
  },
];

export const CeilingTypes = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    gsap.to(card, {
      rotateX: (y - centerY) / 20,
      rotateY: (centerX - x) / 20,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1200,
    });

    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: (x - centerX) / 12,
        y: (y - centerY) / 12,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' });
    }
  };

  return (
    <section
      id="types"
      ref={containerRef}
      data-journey-section="types"
      className="section-padding bg-gray-soft relative z-10 rounded-t-[60px] -mt-20"
    >
      <div className="container mx-auto px-6">
        <div className="types-header flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 data-journey-element className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
              Виды <br />
              <span className="text-accent">потолков</span>
            </h2>
            <p data-journey-element className="text-xl text-black/60">
              Подберем идеальное решение под ваш бюджет и интерьер.
              От классики до ультрасовременных световых решений.
            </p>
          </div>

          <button data-journey-element className="hidden md:flex items-center gap-3 text-lg font-bold group">
            Смотреть все виды
            <div className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '2000px' }}>
          {ceilingTypes.map((type, index) => (
            <div
              key={index}
              data-journey-element
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="ceiling-card group relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden bg-white border border-black/5 cursor-pointer will-change-transform"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={type.image}
                  alt={type.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <div className="mb-6 transform transition-transform duration-500">
                  <div className="text-accent font-bold text-lg mb-2">{type.price}</div>
                  <h3 className="text-4xl font-bold mb-4">{type.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed max-w-md">
                    {type.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
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
