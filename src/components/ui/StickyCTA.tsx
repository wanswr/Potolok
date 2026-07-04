'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (100vh)
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <a
        href="https://wa.me/79990000000"
        target="_blank"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      <a
        href="tel:+79990000000"
        className="w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <Phone className="w-7 h-7" />
      </a>
    </div>
  );
};
