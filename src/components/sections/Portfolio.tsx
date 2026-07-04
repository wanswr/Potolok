'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const portfolioItems = [
  {
    id: 1,
    title: 'Гостиная в современном стиле',
    before: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
  },
];

export const Portfolio = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].pageX - rect.left : (e as React.MouseEvent).pageX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsResizing(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section className="section-padding bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Наши работы</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Посмотрите на преображение интерьеров после установки наших потолков.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            ref={containerRef}
            className="relative aspect-video rounded-3xl overflow-hidden cursor-ew-resize select-none border-4 border-white shadow-2xl"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseDown={() => setIsResizing(true)}
            onTouchStart={() => setIsResizing(true)}
          >
            {/* After Image (Full width background) */}
            <Image
              src={portfolioItems[0].after}
              alt="После"
              fill
              className="object-cover"
              draggable={false}
            />
            <div className="absolute top-4 right-6 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold z-10">
              ПОСЛЕ
            </div>

            {/* Before Image (Clipped) */}
            <div
              className="absolute top-0 left-0 bottom-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-[100vw] max-w-[1024px] aspect-video">
                <Image
                  src={portfolioItems[0].before}
                  alt="До"
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>
              <div className="absolute top-4 left-6 bg-black/50 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                ДО
              </div>
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-gray-300 rounded-full" />
                  <div className="w-1 h-4 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Small thumbnails placeholders */}
             {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square relative rounded-2xl overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <Image src={`https://picsum.photos/id/${20+i}/400/400`} alt="Portfolio" fill className="object-cover" />
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};
