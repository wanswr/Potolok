'use client';

import React from 'react';

export const EvolutionScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" alt="Evolution" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-20">
        <h2 className="text-5xl md:text-8xl text-warm-white mb-6">Эволюция <br /> пространства</h2>
        <p className="text-xl md:text-2xl text-stone font-light max-w-2xl">От минималистичного теневого зазора до архитектурных световых инсталляций.</p>
      </div>
    </section>
  );
};
