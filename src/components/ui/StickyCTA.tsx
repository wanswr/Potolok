'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const StickyCTA = () => {
  return (
    <>
      {/* Desktop Sticky Phone */}
      <div className="fixed bottom-10 right-10 z-[40] hidden md:flex flex-col gap-4">
        <a
          href="https://wa.me/79990000000"
          className="w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          aria-label="WhatsApp"
        >
          <MessageCircle size={32} />
        </a>
        <a
          href="tel:+79990000000"
          className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
          aria-label="Call us"
        >
          <Phone size={32} />
        </a>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full z-[40] md:hidden glass-morphism border-t border-black/5 p-4 flex gap-4">
        <a
          href="tel:+79990000000"
          className="flex-1 bg-black text-white h-14 rounded-2xl flex items-center justify-center gap-3 font-bold"
        >
          <Phone size={20} />
          Позвонить
        </a>
        <button
          onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex-1 bg-accent text-white h-14 rounded-2xl flex items-center justify-center gap-3 font-bold shadow-lg shadow-accent/20"
        >
          Расчёт цены
        </button>
      </div>
    </>
  );
};
