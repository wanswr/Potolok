"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const REVIEWS = [
  {
    name: "Елена С.",
    role: "Владелица квартиры в ЖК 'Рихард'",
    text: "Заказывали теневые потолки во всю квартиру. Поразила аккуратность ребят — всё чисто, углы идеальные. Настоящий премиум сервис.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Марк Воронов",
    role: "Дизайнер интерьеров",
    text: "Сотрудничаю с компанией уже на третьем проекте. Всегда четко по срокам и технически грамотно. Рекомендую для сложных задач.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop"
  }
];

const FAQS = [
  { q: "Сколько стоит квадратный метр?", a: "Стоимость рассчитывается индивидуально и зависит от типа профильной системы, сложности освещения и площади. Средний чек в премиум сегменте начинается от 2500 руб/м² под ключ." },
  { q: "Сколько времени занимает монтаж?", a: "Стандартная комната 20 м² монтируется за 4-6 часов. Квартира 100 м² — за 3-5 дней в зависимости от сложности систем." },
  { q: "Нужно ли выносить мебель?", a: "Мы работаем максимально аккуратно с использованием пылесосов. Крупную мебель достаточно сдвинуть к центру и накрыть пленкой, которую мы предоставляем." },
  { q: "Какую гарантию вы даете?", a: "10 лет на полотно (не желтеет, не провисает) и 2 года на монтажные работы и электрику по официальному договору." }
];

export const SocialProofScene = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="bg-warm-white py-32 overflow-hidden text-graphite">
      <div className="container mx-auto px-6">
        {/* Reviews */}
        <div className="mb-32">
          <div className="mb-16">
             <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Отзывы клиентов</span>
             <h2 className="text-4xl md:text-6xl font-light">Слова тех, кто <br /> нам доверяет</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {REVIEWS.map((r, i) => (
              <div key={i} className="flex flex-col gap-8 p-10 bg-graphite/5 rounded-sm border border-graphite/5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden grayscale">
                     <Image src={r.img} alt={r.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">{r.name}</h4>
                    <p className="text-stone text-xs uppercase tracking-widest">{r.role}</p>
                  </div>
                </div>
                <p className="text-stone text-lg italic font-light">"{r.text}"</p>
                <div className="flex gap-1">
                  {[...Array(r.rating)].map((_, i) => (
                    <span key={i} className="text-muted-gold text-xs">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl">
          <div className="mb-16">
             <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Вопросы и ответы</span>
             <h2 className="text-3xl md:text-5xl font-light">Узнайте все детали <br /> перед началом работ</h2>
          </div>

          <div className="flex flex-col border-t border-graphite/10">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-graphite/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-8 flex justify-between items-center text-left hover:text-muted-gold transition-colors"
                >
                  <span className="text-xl font-light">{faq.q}</span>
                  <span className="text-2xl font-extralight">{openFaq === i ? "−" : "+"}</span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 text-stone font-light leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
