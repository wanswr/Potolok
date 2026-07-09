"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHighlighter } from "../ui/TextHighlighter";

const PROBLEMS = [
  "Старый неровный потолок",
  "Трещины и осыпающаяся штукатурка",
  "Устаревший дизайн с громоздкими плинтусами",
  "Сложность выбора надежных материалов"
];

const SOLUTIONS = [
  "Современный минималистичный дизайн",
  "Идеальная геометрия и ровная поверхность",
  "Скрытые системы освещения и теневые швы",
  "Чистый монтаж и долговечный результат"
];

export const PainSolutionScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: true,
        }
      });

      tl.to(".problem-list", { opacity: 0, y: -50, filter: "blur(10px)", duration: 1 })
        .fromTo(".solution-list",
          { opacity: 0, y: 50, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-warm-white py-32 overflow-hidden">
      <div ref={triggerRef} className="container mx-auto px-6 min-h-[60vh] flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full relative">

          {/* Problems State */}
          <div className="problem-list">
            <span className="text-stone text-[10px] uppercase tracking-[0.3em] font-bold mb-8 block">Устаревшие решения</span>
            <h2 className="text-3xl md:text-5xl font-light text-graphite mb-12 leading-tight">
              Забудьте о трещинах, неровностях <br /> и бесконечном ремонте
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROBLEMS.map((p, i) => (
                <div key={i} className="flex items-start gap-4 text-stone/60 font-light">
                  <span className="text-muted-gold/40 mt-1">✕</span>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions State (Absolute Overlay) */}
          <div className="solution-list absolute inset-0 opacity-0 pointer-events-none">
            <span className="text-muted-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-8 block">Премиальный подход</span>
            <h2 className="text-3xl md:text-5xl font-light text-graphite mb-12 leading-tight">
              Ваш интерьер заслуживает <br /> совершенства в деталях
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SOLUTIONS.map((s, i) => (
                <div key={i} className="flex items-start gap-4 text-graphite font-light">
                  <span className="text-muted-gold mt-1">✓</span>
                  <p>{s}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
