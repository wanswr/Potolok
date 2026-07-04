'use client';

import React, { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Преимущества', href: '#features' },
  { name: 'Виды потолков', href: '#types' },
  { name: 'Калькулятор', href: '#calculator' },
  { name: 'Наши работы', href: '#portfolio' },
  { name: 'Отзывы', href: '#reviews' },
  { name: 'Контакты', href: '#contacts' },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled ? "bg-white/80 backdrop-blur-md py-3 shadow-sm border-b border-black/5" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className={cn(
          "text-2xl font-bold tracking-tight transition-colors duration-500",
          isScrolled ? "text-black" : "text-white"
        )}>
          Potolok<span className="text-accent">Bel</span>
        </div>

        {/* Desktop Nav */}
        <nav className={cn(
          "hidden lg:flex items-center gap-8 text-[15px] font-medium transition-colors duration-500",
          isScrolled ? "text-black/70" : "text-white/80"
        )}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="tel:+79990000000"
            className={cn(
              "font-semibold flex items-center gap-2 text-[15px] transition-colors duration-500",
              isScrolled ? "text-black" : "text-white"
            )}
          >
            <Phone className="w-4 h-4 text-accent" />
            +7 (999) 000-00-00
          </a>
          <button className="bg-accent hover:bg-accent-dark text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-accent/10 text-[14px]">
            Рассчитать стоимость
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn("lg:hidden p-2 transition-colors duration-500", isScrolled ? "text-black" : "text-white")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 bg-white z-[60] flex flex-col p-10 transition-transform duration-500 lg:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex justify-between items-center mb-12">
          <div className="text-2xl font-bold tracking-tight text-black">
            Potolok<span className="text-accent">Bel</span>
          </div>
          <button
            className="p-2 text-black"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-6 text-xl font-semibold text-black">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4">
          <a href="tel:+79990000000" className="text-xl font-bold text-black">+7 (999) 000-00-00</a>
          <button className="bg-accent text-white py-4 rounded-xl font-bold">
            Заказать замер
          </button>
        </div>
      </div>
    </header>
  );
};
