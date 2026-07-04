'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Александр',
    role: 'Квартира 65м²',
    text: 'Заказывали потолки во всю квартиру. Мастера приехали вовремя, сделали всё за один день. Очень чисто, никакой пыли после сверления. Результат превзошел ожидания!',
    rating: 5,
  },
  {
    name: 'Мария',
    role: 'Кухня-гостиная',
    text: 'Долго выбирали между матовым и сатином. Технолог на замере привез образцы, помог определиться и подсказал по освещению. Рекомендую!',
    rating: 5,
  },
  {
    name: 'Дмитрий',
    role: 'Загородный дом',
    text: 'Нужно было сложное решение со световыми линиями. Ребята справились на отлично. Потолок выглядит очень современно и дорого.',
    rating: 5,
  },
];

export const SocialProof = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-accent text-accent" />
            ))}
          </div>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">Средний рейтинг 5.0 на основе 200+ отзывов</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-[#F8F9FA] border border-gray-100 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  "{item.text}"
                </p>
              </div>
              <div>
                <div className="font-bold text-lg">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
