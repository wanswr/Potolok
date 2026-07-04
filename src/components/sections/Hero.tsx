'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [currentFrame, setCurrentFrame] = useState(0);

  // Total frames for the scroll animation
  const frameCount = 30;

  // Placeholder image sequence generation (in a real app, these would be real frames)
  // For the demo, we will simulate the sequence with a few repeated placeholders or gradients
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Using a placeholder service that can simulate some variation
      // In a real project, these would be /public/frames/hero-001.jpg etc.
      img.src = `https://picsum.photos/id/${10 + (i % 5)}/1920/1080`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  useEffect(() => {
    if (images.length < frameCount || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const render = (index: number) => {
      if (images[index]) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image with "cover" behavior
        const img = images[index];
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;
        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        }

        context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }
    };

    const airbnb = { frame: 0 };

    gsap.to(airbnb, {
      frame: frameCount - 1,
      snap: { frame: 1 },
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        scrub: 0.5,
        pin: true,
      },
      onUpdate: () => {
        render(Math.round(airbnb.frame));
      },
    });

    render(0);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(Math.round(airbnb.frame));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
        <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
          Натяжные потолки <br />
          <span className="text-accent">под ключ за 1 день</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200">
          Чистый монтаж • гарантия • без пыли
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-accent hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
            Рассчитать стоимость
          </button>
          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-semibold transition-all">
            Наши работы
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-sm uppercase tracking-widest">Листайте вниз</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};
