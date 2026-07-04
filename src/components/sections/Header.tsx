'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className={cn(
          "text-2xl font-black tracking-tighter transition-colors",
          isScrolled ? "text-gray-900" : "text-white"
        )}>
          LUX<span className="text-accent">CEILING</span>
        </div>

        {/* Desktop Nav */}
        <nav className={cn(
          "hidden md:flex items-center gap-8 font-medium",
          isScrolled ? "text-gray-600" : "text-white/80"
        )}>
          <a href="#" className="hover:text-accent transition-colors">Преимущества</a>
          <a href="#" className="hover:text-accent transition-colors">Виды</a>
          <a href="#" className="hover:text-accent transition-colors">Расчет</a>
          <a href="#" className="hover:text-accent transition-colors">Портфолио</a>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a
            href="tel:+79990000000"
            className={cn(
              "font-bold flex items-center gap-2",
              isScrolled ? "text-gray-900" : "text-white"
            )}
          >
            <Phone className="w-5 h-5 text-accent" />
            +7 (999) 000-00-00
          </a>
          <button className="bg-accent hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-accent/20 text-sm">
            Заказать замер
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("md:hidden p-2", isScrolled ? "text-gray-900" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <button
          className="absolute top-6 right-6 p-2 text-gray-900"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
        <nav className="flex flex-col items-center gap-6 text-2xl font-bold text-gray-900">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Преимущества</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Виды</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Расчет</a>
          <a href="#" onClick={() => setIsMobileMenuOpen(false)}>Портфолио</a>
        </nav>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a href="tel:+79990000000" className="text-xl font-bold">+7 (999) 000-00-00</a>
          <button className="bg-accent text-white px-10 py-4 rounded-full font-bold">
            Заказать замер
          </button>
        </div>
      </div>
    </header>
  );
};
