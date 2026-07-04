'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

const faqs = [
  {
    question: 'Сколько длится монтаж?',
    answer: 'В среднем монтаж потолка в одной комнате (15-20 м²) занимает от 2 до 4 часов. Если проект сложный (многоуровневый или с большим количеством световых линий), время может увеличиться, но мы всегда стремимся завершить работы за 1 день.',
  },
  {
    question: 'Нужно ли выносить мебель?',
    answer: 'Полностью выносить мебель не обязательно. Достаточно обеспечить доступ к стенам по периметру комнаты (отодвинуть мебель на 1-1.5 метра). Крупную мебель и технику мы рекомендуем накрыть защитной пленкой.',
  },
  {
    question: 'Есть ли запах после установки?',
    answer: 'Новые потолки могут иметь легкий специфический запах в течение первых 24-48 часов после установки. Мы используем только сертифицированные полотна премиум-класса (MSD Premium, Pongs), которые абсолютно безопасны и быстро проветриваются.',
  },
  {
    question: 'Какой срок гарантии?',
    answer: 'Мы предоставляем официальную гарантию 15 лет на целостность и цвет полотна, а также 3 года на монтажные работы. Все обязательства прописываются в договоре.',
  },
  {
    question: 'Можно ли установить встроенное освещение?',
    answer: 'Да, натяжные потолки идеально подходят для любых типов освещения: точечные светильники, люстры, световые линии, трековые системы или "парящий" эффект. Мы поможем спроектировать схему освещения на этапе замера.',
  },
  {
    question: 'Какие потолки лучше выбрать?',
    answer: 'Выбор зависит от вашего интерьера и задач. Матовые — классика, похожая на идеальную штукатурку. Глянцевые — визуально расширяют пространство. Сатиновые — компромисс с мягким блеском. Наш замерщик привезет образцы, чтобы вы могли увидеть их вживую.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} data-journey-section className="section-padding bg-white relative z-10 rounded-t-[60px] -mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-16 text-center">
            Часто задаваемые <span className="text-accent">вопросы</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "faq-item border border-gray-border rounded-[32px] overflow-hidden transition-all duration-500",
                  openIndex === index ? "bg-gray-soft shadow-sm" : "bg-white hover:border-accent/30"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-8 flex items-center justify-between text-left"
                >
                  <span className="text-xl md:text-2xl font-bold pr-8">{faq.question}</span>
                  <div className={cn(
                    "w-10 h-10 rounded-full border border-gray-border flex items-center justify-center transition-transform duration-500",
                    openIndex === index ? "rotate-180 bg-accent text-white border-accent" : ""
                  )}>
                    <ChevronDown size={20} />
                  </div>
                </button>

                <div className={cn(
                  "overflow-hidden transition-all duration-500 ease-in-out",
                  openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}>
                  <p className="p-8 pt-0 text-lg text-black/50 leading-relaxed border-t border-black/5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
