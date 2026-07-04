'use client';

import React from 'react';
import { ShieldCheck, Zap, Ruler, Banknote } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: <ShieldCheck className="w-12 h-12 text-accent" />,
    title: 'Гарантия 10 лет',
    description: 'Используем только сертифицированные полотна с долгим сроком службы.',
  },
  {
    icon: <Zap className="w-12 h-12 text-accent" />,
    title: 'Монтаж без пыли',
    description: 'Используем безопасное оборудование и системы пылеудаления.',
  },
  {
    icon: <Ruler className="w-12 h-12 text-accent" />,
    title: 'Бесплатный замер',
    description: 'Приедем в удобное время, проконсультируем и сделаем точный расчет.',
  },
  {
    icon: <Banknote className="w-12 h-12 text-accent" />,
    title: 'Фиксированная цена',
    description: 'Стоимость не меняется в процессе работ. Все прописываем в договоре.',
  },
];

export const TrustBlock = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Мы создаем идеальные потолки, уделяя внимание каждой детали и чистоте процесса.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl bg-[#F8F9FA] hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
