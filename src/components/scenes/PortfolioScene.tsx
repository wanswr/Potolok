"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = ["Все", "Квартиры", "Дома", "Дизайнерские", "Коммерция"];

const PROJECTS = [
  {
    title: "Современная квартира 85 м²",
    category: "Квартиры",
    location: "Москва, ЖК Символ",
    type: "Теневой потолок EuroKraab",
    time: "3 дня",
    features: "Интегрированные треки Centrsvet",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Загородная резиденция",
    category: "Дома",
    location: "Миллениум Парк",
    type: "Парящие потолки",
    time: "10 дней",
    features: "Скрытые карнизы с электроприводом",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Бутик-отель 'Sky'",
    category: "Коммерция",
    location: "Санкт-Петербург",
    type: "Световые панели",
    time: "14 дней",
    features: "Акустические полотна Clipso",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  },
  {
    title: "Дизайнерский лофт",
    category: "Дизайнерские",
    location: "Artplay",
    type: "Бесщелевые системы",
    time: "5 дней",
    features: "Сложная геометрия освещения",
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop"
  }
];

export default function PortfolioScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredProjects = activeCategory === "Все"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section ref={containerRef} className="relative py-32 bg-graphite overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Портфолио</span>
            <h2 className="text-4xl md:text-7xl font-extralight text-warm-white">Реализованные <br /> объекты</h2>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8 pb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all border-b-2 pb-2
                  ${activeCategory === cat ? "text-muted-gold border-muted-gold" : "text-stone border-transparent hover:text-warm-white"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "circOut" }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-10 border border-warm-white/5">
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-graphite opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                </div>

                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-light text-warm-white mb-4 group-hover:text-muted-gold transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-stone text-sm uppercase tracking-widest">{project.location}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <span className="text-muted-gold text-xs uppercase tracking-widest font-bold">{project.type}</span>
                    <span className="text-stone text-[10px] uppercase tracking-widest">{project.time}</span>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-warm-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-stone text-sm italic font-light">Особенности: {project.features}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-24 flex justify-center">
           <button className="group relative bg-transparent border border-muted-gold text-muted-gold px-12 py-5 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-muted-gold hover:text-graphite">
             Смотреть все проекты
           </button>
        </div>
      </div>
    </section>
  );
}
