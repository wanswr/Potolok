'use client';

import React from 'react';
import Image from 'next/image';

export const GenesisScene = () => {
  return (
    <section className="relative w-full h-full flex items-center justify-center bg-graphite overflow-hidden">
      <div className="scene-bg absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1600607687940-47a0f68d69ce?auto=format&fit=crop&q=80&w=2070"
          alt="Genesis"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="scene-content relative z-10 text-center px-6">
        <h1 className="text-6xl md:text-9xl text-warm-white mb-6">Пространство <br /> начинается сверху</h1>
        <p className="text-xl md:text-2xl text-warm-white/60 max-w-2xl mx-auto font-light">Архитектурные натяжные потолки как основа современного интерьера.</p>
      </div>
    </section>
  );
};
