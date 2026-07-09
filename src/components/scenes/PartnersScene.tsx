"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  { name: "KRAAB", description: "Инновационные системы профилей" },
  { name: "Lumfer", description: "Немецкие технологии освещения" },
  { name: "Bauf", description: "Премиальное полотно из Германии" },
  { name: "MSD", description: "Мировой стандарт экологичности" },
  { name: "Flexy", description: "Архитектурные решения для потолков" },
];

export const PartnersScene = () => {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-center items-center bg-graphite py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-muted-gold text-sm tracking-[0.3em] uppercase mb-4 block">Технологические партнеры</span>
          <h2 className="text-4xl md:text-5xl font-light text-warm-white">Используем лучшее</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 items-center justify-items-center">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-full h-24 flex items-center justify-center grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 mb-4 border border-warm-white/5 bg-warm-white/5 rounded-sm p-4 backdrop-blur-sm">
                 <span className="text-2xl font-bold tracking-tighter text-warm-white">{partner.name}</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-stone/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-warm-white/5" />
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-warm-white/5" />
    </section>
  );
};
