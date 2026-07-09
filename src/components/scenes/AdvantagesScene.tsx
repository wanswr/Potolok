"use client";

import { motion } from "framer-motion";

const ADVANTAGES = [
  { t: "Опыт 10 лет", d: "Знаем все тонкости монтажа и работаем с самыми сложными архитектурными узлами." },
  { t: "Свои бригады", d: "Работаем только штатным составом без привлечения случайных рабочих. Полный контроль качества." },
  { t: "Соблюдение сроков", d: "Четкий график работ, прописанный в договоре. Мы ценим ваше время." },
  { t: "Лучшие материалы", d: "Используем только сертифицированные полотна и профильные системы Bauf, MSD, EuroKraab." },
  { t: "Аккуратность", d: "Максимально чистый монтаж с использованием профессионального уборочного оборудования." },
  { t: "Гарантия 10 лет", d: "Официальный договор и полная ответственность за результат на долгие годы." }
];

export const AdvantagesScene = () => {
  return (
    <section className="bg-graphite py-32 border-t border-warm-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-24 text-center">
          <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Почему выбирают нас</span>
          <h2 className="text-4xl md:text-6xl font-extralight text-warm-white">Реальные преимущества <br /> вместо пустых слов</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {ADVANTAGES.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-6 p-8 border border-warm-white/5 hover:border-muted-gold/20 transition-colors duration-500 rounded-sm"
            >
              <div className="w-10 h-10 rounded-full border border-muted-gold/30 flex items-center justify-center text-muted-gold text-xs font-bold">
                0{i + 1}
              </div>
              <h3 className="text-xl font-light text-warm-white">{adv.t}</h3>
              <p className="text-stone text-sm leading-relaxed font-light">{adv.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
