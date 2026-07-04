'use client';

import React from 'react';
import Image from 'next/image';

const projects = [
  {
    title: 'Минимализм в ЖК "Сити"',
    type: 'Световые линии',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop',
    size: 'large',
  },
  {
    title: 'Уютная спальня',
    type: 'Сатиновый потолок',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop',
    size: 'small',
  },
  {
    title: 'Современная кухня',
    type: 'Теневой профиль',
    image: 'https://images.unsplash.com/photo-1556912167-7502019904a0?q=80&w=2070&auto=format&fit=crop',
    size: 'small',
  },
  {
    title: 'Парящий потолок в гостиной',
    type: 'Контурная подсветка',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop',
    size: 'large',
  },
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="section-padding bg-gray-soft">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            Наши <br />
            <span className="text-accent">работы</span>
          </h2>
          <p className="text-xl text-black/60 leading-relaxed">
            Реализованные проекты, которыми мы гордимся.
            Каждый объект — это сочетание стиля, качества и внимания к деталям.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative rounded-[48px] overflow-hidden bg-white shadow-sm transition-all duration-700 h-[600px]`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <div className="text-accent font-bold mb-2 uppercase tracking-widest text-sm">{project.type}</div>
                <h3 className="text-3xl font-bold mb-6">{project.title}</h3>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 w-fit">
                  Подробнее о проекте
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-white border border-gray-border px-12 py-5 rounded-full text-lg font-bold hover:bg-black hover:text-white transition-all">
            Смотреть всё портфолио
          </button>
        </div>
      </div>
    </section>
  );
};
