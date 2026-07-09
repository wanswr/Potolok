"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  { id: "1", title: "Заявка", desc: "Обсуждаем ваши пожелания и назначаем время встречи." },
  { id: "2", title: "Бесплатный замер", desc: "Точный расчет и техническая консультация на объекте." },
  { id: "3", title: "Подбор решения", desc: "Выбор материалов, систем освещения и профилей." },
  { id: "4", title: "Производство", desc: "Подготовка полотна и комплектующих под ваш проект." },
  { id: "5", title: "Монтаж", desc: "Чистая и аккуратная установка сертифицированными мастерами." },
  { id: "6", title: "Приемка работы", desc: "Контроль качества и ваша улыбка от результата." }
];

export default function ProcessScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".process-step", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-graphite py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Как мы работаем</span>
          <h2 className="text-4xl md:text-6xl font-extralight text-warm-white">Путь к идеальному потолку</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12">
          {STEPS.map((s) => (
            <div key={s.id} className="process-step relative flex flex-col gap-6 group">
              <span className="text-8xl font-black text-warm-white/5 absolute -top-10 -left-6 select-none group-hover:text-muted-gold/10 transition-colors duration-700">
                0{s.id}
              </span>
              <div className="relative z-10">
                <h3 className="text-2xl font-light text-warm-white mb-4">{s.title}</h3>
                <p className="text-stone text-sm leading-relaxed font-light max-w-xs">{s.desc}</p>
              </div>
              <div className="w-12 h-[1px] bg-muted-gold/30 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
