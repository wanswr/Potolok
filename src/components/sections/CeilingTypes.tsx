'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

const ceilingTypes = [
  {
    id: 'matte',
    title: 'Матовый потолок',
    description: 'Классическое решение. Выглядит как идеально ровная оштукатуренная поверхность.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    color: 'bg-gray-100',
  },
  {
    id: 'glossy',
    title: 'Глянцевый потолок',
    description: 'Визуально расширяет пространство за счет зеркального эффекта. Идеально для небольших комнат.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    color: 'bg-white',
  },
  {
    id: 'satin',
    title: 'Сатиновый потолок',
    description: 'Мягкий перламутровый блеск. Сочетает преимущества матовых и глянцевых полотен.',
    image: 'https://images.unsplash.com/photo-1617104424032-b9bd6972d0e4?auto=format&fit=crop&w=800&q=80',
    color: 'bg-slate-50',
  },
  {
    id: 'led',
    title: 'Световые линии / LED',
    description: 'Современное дизайнерское освещение, интегрированное прямо в плоскость потолка.',
    image: 'https://images.unsplash.com/photo-1513506494265-99b15e8c093a?auto=format&fit=crop&w=800&q=80',
    color: 'bg-blue-50',
  },
];

export const CeilingTypes = () => {
  return (
    <section className="section-padding bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Виды потолков</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Подберем идеальное решение под ваш интерьер и бюджет.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {ceilingTypes.map((type, index) => (
            <CeilingCard key={type.id} type={type} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CeilingCard = ({ type, index }: { type: typeof ceilingTypes[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-sm border border-gray-100"
    >
      <div className="aspect-[16/10] relative overflow-hidden">
        <Image
          src={type.image}
          alt={type.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {type.description}
        </p>
        <button className="text-accent font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
          Подробнее <span>→</span>
        </button>
      </div>
    </motion.div>
  );
};
