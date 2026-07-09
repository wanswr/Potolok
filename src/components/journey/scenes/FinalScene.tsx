'use client';

import React from 'react';

export const FinalScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h2 className="text-5xl md:text-9xl text-warm-white mb-12">Готовы <br /> начать?</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
           <button className="px-12 py-6 bg-accent text-graphite text-xl font-bold rounded-full">Обсудить проект</button>
           <button className="px-12 py-6 border border-warm-white/20 text-warm-white text-xl font-medium rounded-full">Смотреть каталог</button>
        </div>
      </div>
    </section>
  );
};
