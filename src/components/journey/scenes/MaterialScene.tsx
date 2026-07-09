'use client';

import React from 'react';

export const MaterialScene = () => {
  return (
    <section className="relative w-full h-full flex items-center justify-center bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
          alt="Material"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="relative z-10 text-center px-6">
        <h2 className="text-5xl md:text-8xl text-warm-white mb-8">Материя качества</h2>
        <p className="text-xl md:text-2xl text-stone max-w-3xl mx-auto font-light leading-relaxed">Безупречно ровное полотно. Мы используем только сертифицированные материалы.</p>
      </div>
    </section>
  );
};
