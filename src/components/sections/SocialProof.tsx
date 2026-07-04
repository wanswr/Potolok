'use client';

import React from 'react';
import { Star } from 'lucide-react';

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
    <section id="reviews" data-journey-section="reviews" className="section-padding bg-white relative z-10 rounded-t-[60px] -mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 data-journey-element className="text-3xl md:text-5xl font-bold mb-4">Отзывы клиентов</h2>

          <div data-journey-element className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-6 h-6 fill-accent text-accent" />
            ))}
          </div>

          <p data-journey-element className="text-gray-500 font-medium uppercase tracking-widest text-sm">
            Средний рейтинг 5.0 на основе 200+ отзывов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              data-journey-element
              className="p-8 rounded-3xl bg-[#F8F9FA] border border-gray-100 flex flex-col justify-between h-full will-change-transform"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-gray-700 italic mb-6 leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              <div>
                <div className="font-bold text-lg">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
