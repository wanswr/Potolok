"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHighlighter } from "../ui/TextHighlighter";

const STATS = [
  { label: "Лет опыта", value: "12+", description: "Создаем потолки с 2012 года" },
  { label: "Объектов", value: "2500+", description: "От частных студий до загородных резиденций" },
  { label: "Гарантия", value: "15 лет", description: "На полотно и монтажные работы" },
];

export default function TrustScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-graphite border-y border-warm-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-24 flex justify-center text-center">
          <TextHighlighter
            text="Мы не просто устанавливаем потолки. Мы создаем архитектурную среду, где каждый узел примыкания и каждый луч света выверен до миллиметра."
            className="text-3xl md:text-5xl font-light max-w-5xl leading-tight justify-center"
            highlightClassName="text-warm-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mt-20">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-center text-center">
              <span className="text-muted-gold text-sm tracking-[0.3em] uppercase mb-6">{stat.label}</span>
              <span className="text-6xl md:text-8xl font-light text-warm-white mb-6 font-serif">{stat.value}</span>
              <p className="text-stone max-w-[200px] leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-warm-white/10 to-transparent pointer-events-none" />
    </section>
  );
}
