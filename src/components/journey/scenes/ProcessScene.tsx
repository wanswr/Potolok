'use client';

import React from 'react';

export const ProcessScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=2000" alt="Result" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-20 h-full flex items-end p-6 md:p-20">
        <div className="max-w-4xl bg-black/20 backdrop-blur-md p-10 rounded-2xl border border-white/10">
          <h2 className="text-4xl md:text-7xl text-warm-white mb-4">Путь к результату</h2>
          <p className="text-lg md:text-xl text-stone font-light">Замер. Проектирование. Чистый монтаж за 1 день.</p>
        </div>
      </div>
    </section>
  );
};
