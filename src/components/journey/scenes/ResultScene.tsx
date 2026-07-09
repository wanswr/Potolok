'use client';

import React from 'react';

export const ResultScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite overflow-hidden">
      <div className="absolute top-20 left-6 md:left-20 z-20">
         <h2 className="text-4xl md:text-6xl text-warm-white mb-2">Живые проекты</h2>
      </div>
      <div className="flex h-full w-full items-center justify-center p-20">
        <div className="relative w-full h-[70vh] rounded-3xl overflow-hidden">
          <img src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=1000" alt="P1" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};
