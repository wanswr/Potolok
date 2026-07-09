"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const SERVICES = [
  {
    title: "Теневые потолки",
    desc: "Безупречный зазор для современного интерьера",
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Парящие потолки",
    desc: "Эффект невесомости и мягкая подсветка",
    img: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Световые линии",
    desc: "Графичное освещение любой сложности",
    img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Двухуровневые",
    desc: "Сложная архитектура вашего пространства",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Дизайнерские",
    desc: "Реализация эксклюзивных проектов",
    img: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Коммерческие",
    desc: "Решения для офисов, бутиков и отелей",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
  }
];

export const ServicesGrid = () => {
  return (
    <section className="bg-graphite py-32">
      <div className="container mx-auto px-6">
        <div className="mb-20">
          <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Каталог решений</span>
          <h2 className="text-4xl md:text-6xl font-extralight text-warm-white">Выберите свой идеальный потолок</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-warm-white/5"
            >
              <Image
                src={s.img}
                alt={s.title}
                fill
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/20 to-transparent opacity-80" />

              <div className="absolute inset-0 p-10 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 transition-transform duration-700">
                <h3 className="text-2xl font-light text-warm-white mb-3">{s.title}</h3>
                <p className="text-stone text-sm mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 leading-relaxed">
                  {s.desc}
                </p>
                <button className="self-start text-[10px] uppercase tracking-widest text-muted-gold font-bold border-b border-muted-gold/20 pb-2 hover:border-muted-gold transition-all">
                  Подробнее
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
