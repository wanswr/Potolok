'use client';

import React from 'react';
import Image from 'next/image';

export const EvolutionScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" alt="Evolution" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      <div className="evo-layer absolute inset-0 w-full h-full opacity-0">
         <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black/80 to-transparent" />
      </div>
      <div className="evo-layer absolute inset-0 w-full h-full opacity-0">
         <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(197,160,89,0.3)]" />
      </div>
      <div className="evo-layer absolute inset-0 w-full h-full opacity-0">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-accent/60 blur-sm shadow-[0_0_20px_rgba(197,160,89,0.8)]" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-20">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-8xl text-warm-white mb-6">Эволюция <br /> пространства</h2>
          <p className="text-xl md:text-2xl text-stone font-light max-w-2xl">От минималистичного теневого зазора до архитектурных световых инсталляций.</p>
        </div>
      </div>
    </section>
  );
};
