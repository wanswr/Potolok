'use client';

import React from 'react';
import Image from 'next/image';

export const MaterialScene = () => {
  return (
    <section className="relative w-full h-full flex items-center justify-center bg-graphite overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
          alt="Material"
          fill
          className="object-cover opacity-60"
        />
        <div className="light-sweep absolute inset-0 bg-gradient-to-r from-transparent via-warm-white/10 to-transparent w-[200%] -skew-x-12" />
      </div>
      <div className="relative z-10 text-center px-6">
        <h2 className="text-5xl md:text-8xl text-warm-white mb-8">Материя качества</h2>
        <p className="text-xl md:text-2xl text-stone max-w-3xl mx-auto font-light leading-relaxed">
          Безупречно ровное полотно. <br />
          Мы используем только сертифицированные материалы.
        </p>
      </div>
    </section>
  );
};
