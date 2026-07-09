"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHighlighter } from "../ui/TextHighlighter";

const STATS = [
  { label: "лет опыта", value: "10+", description: "Создаем премиальные интерьеры с 2014 года" },
  { label: "готовых объектов", value: "1500+", description: "От частных апартаментов до коммерческих холлов" },
  { label: "выезд специалиста", value: "24 часа", description: "Оперативный замер и техническая консультация" },
  { label: "гарантия", value: "10 лет", description: "Официальный договор и пожизненная поддержка" },
];

export default function TrustScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      gsap.from(".trust-visual", {
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        duration: 2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 50%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-32 bg-graphite overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-32 flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1">
             <TextHighlighter
                text="Мы верим, что каждая деталь имеет значение. Наши мастера — это архитекторы пространства, превращающие технические задачи в искусство интерьера."
                className="text-2xl md:text-4xl font-light leading-relaxed text-left"
                highlightClassName="text-warm-white"
              />
          </div>
          <div className="flex-1 w-full trust-visual aspect-video relative rounded-sm overflow-hidden border border-warm-white/10">
             <Image
                src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop"
                alt="Process of work"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
             />
             <div className="absolute inset-0 bg-muted-gold/10 mix-blend-overlay" />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mt-20">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-start border-l border-warm-white/10 pl-8">
              <span className="text-muted-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-6">{stat.label}</span>
              <span className="text-5xl md:text-7xl font-extralight text-warm-white mb-6 tracking-tighter">{stat.value}</span>
              <p className="text-stone text-sm max-w-[180px] leading-relaxed font-light">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative architectural grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
    </section>
  );
}
