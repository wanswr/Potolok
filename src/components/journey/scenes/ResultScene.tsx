'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const projects = [
  {
    title: 'Minimalist Penthouse',
    location: 'Moscow City',
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=1000'
  },
  {
    title: 'Modern Villa',
    location: 'Barvikha',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a12cf1a50?q=80&w=1000'
  }
];

export const ResultScene = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Gallery Timeline (Starts at 850vh)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#journey-container',
          start: '750vh top',
          end: '900vh top',
          scrub: true,
        }
      });

      tl.to(containerRef.current, {
        xPercent: -50,
        ease: 'none'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="absolute inset-0 w-full h-full bg-graphite overflow-hidden">
      <div className="absolute top-20 left-6 md:left-20 z-20">
         <h2 className="text-4xl md:text-6xl text-warm-white mb-2">Живые проекты</h2>
         <p className="text-stone font-light text-xl italic">Более 500 реализованных интерьеров</p>
      </div>

      <div ref={containerRef} className="flex h-full w-[200vw] items-center px-6 md:px-20 gap-10 md:gap-20">
        {projects.map((project, i) => (
          <div key={i} className="relative w-screen h-[70vh] rounded-3xl overflow-hidden group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10">
               <h3 className="text-3xl text-warm-white font-bold">{project.title}</h3>
               <p className="text-stone">{project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
