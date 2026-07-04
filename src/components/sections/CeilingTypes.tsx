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
    light: 'soft-white',
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLDivElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });

    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: (x - centerX) / 10,
        y: (y - centerY) / 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (card: HTMLDivElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
    const img = card.querySelector('img');
    if (img) {
      gsap.to(img, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Title Block
      gsap.from('.types-header > *', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });

      // Ceiling Cards with staggered lift and subtle rotation
      gsap.from('.ceiling-card', {
        y: 100,
        rotationX: -10,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="types" ref={containerRef} data-journey-section className="section-padding bg-gray-soft relative z-10 rounded-t-[60px] -mt-20">
      <div className="container mx-auto px-6">
        <div className="types-header flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" style={{ perspective: '2000px' }}>
          {ceilingTypes.map((type, index) => (
            <div
              key={index}
              data-journey-element
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              className="ceiling-card group relative h-[500px] md:h-[600px] rounded-[40px] overflow-hidden bg-white border border-black/5 cursor-pointer will-change-transform"
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
