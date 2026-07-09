'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Материя', href: '#material' },
  { name: 'Эволюция', href: '#evolution' },
  { name: 'Свет', href: '#light' },
  { name: 'Проекты', href: '#projects' },
  { name: 'Контакты', href: '#contacts' },
];

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
        "fixed top-0 left-0 w-full z-[100] transition-all duration-500",
        isScrolled
          ? "bg-graphite/80 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter text-warm-white">
          Potolok<span className="text-accent italic">Bel</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-widest text-warm-white/60">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-warm-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="tel:+79990000000"
            className="text-warm-white font-medium flex items-center gap-2 text-sm"
          >
            <Phone className="w-3 h-3 text-accent" />
            +7 (999) 000-00-00
          </a>

          <button className="bg-warm-white text-graphite px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-transform hover:scale-105">
            Консультация
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-warm-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-graphite z-[110] flex flex-col p-10 transition-transform duration-500 lg:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-12">
          <div className="text-2xl font-bold tracking-tighter text-warm-white">
            Potolok<span className="text-accent italic">Bel</span>
          </div>

          <button
            className="p-2 text-warm-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-8 text-3xl font-bold text-warm-white">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-6">
          <a href="tel:+79990000000" className="text-2xl font-bold text-warm-white">
            +7 (999) 000-00-00
          </a>
          <button className="bg-accent text-graphite py-5 rounded-full font-bold uppercase tracking-widest">
            Заказать замер
          </button>
        </div>
      </div>
    </header>
  );
};
