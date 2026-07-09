'use client';

import React from 'react';
import Image from 'next/image';

export const LightScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" alt="Light" fill className="object-cover" />
        <div className="night-overlay absolute inset-0 z-10 opacity-0 bg-graphite/80" />
      </div>
      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-8xl text-warm-white mb-8">Дыхание света</h2>
          <p className="text-xl md:text-2xl text-stone max-w-2xl mx-auto font-light">Интеллектуальные сценарии освещения.</p>
        </div>
      </div>
    </section>
  );
};
