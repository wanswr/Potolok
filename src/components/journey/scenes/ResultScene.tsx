'use client';

import React from 'react';
import Image from 'next/image';

export const ResultScene = () => {
  return (
    <section className="relative w-full h-full bg-graphite overflow-hidden">
      <div className="absolute top-20 left-6 md:left-20 z-20">
         <h2 className="text-4xl md:text-6xl text-warm-white mb-2">Живые проекты</h2>
      </div>
      <div className="gallery-strip flex h-full w-[200vw] items-center px-6 md:px-20 gap-10 md:gap-20">
        <div className="relative w-screen h-[70vh] rounded-3xl overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=1000" alt="P1" fill className="object-cover" />
        </div>
        <div className="relative w-screen h-[70vh] rounded-3xl overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1600607687920-4e2a12cf1a50?auto=format&fit=crop&q=80&w=1000" alt="P2" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
};
