'use client';

import React from 'react';

export const LightScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" alt="Light" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
        <h2 className="text-5xl md:text-8xl text-warm-white mb-8">Дыхание света</h2>
        <p className="text-xl md:text-2xl text-stone max-w-2xl mx-auto font-light">Интеллектуальные сценарии освещения.</p>
      </div>
    </section>
  );
};
