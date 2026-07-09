"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextHighlighter } from "../ui/TextHighlighter";

const STEPS = [
  {
    id: "type",
    question: "Тип вашего объекта",
    options: [
      { label: "Квартира", value: "apartment" },
      { label: "Частный дом", value: "house" },
      { label: "Коммерция", value: "commercial" },
    ]
  },
  {
    id: "style",
    question: "Желаемый стиль",
    options: [
      { label: "Минимализм", value: "minimalism" },
      { label: "Современный", value: "modern" },
      { label: "Классика", value: "classic" },
    ]
  },
  {
    id: "area",
    question: "Приблизительная площадь",
    options: [
      { label: "до 50 м²", value: "small" },
      { label: "50 - 100 м²", value: "medium" },
      { label: "от 100 м²", value: "large" },
    ]
  },
  {
    id: "contact",
    question: "Ваши контакты",
    isForm: true
  }
];

export default function ContactScene() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    type: "",
    style: "",
    area: "",
    name: "",
    phone: "",
  });

  const nextStep = (value?: string) => {
    if (value) {
      const key = STEPS[currentStep].id;
      setFormData(prev => ({ ...prev, [key]: value }));
    }
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо! Ваш проект отправлен на расчет. Мы свяжемся с вами в течение 30 минут.");
  };

  return (
    <section className="relative min-h-screen w-full bg-warm-white text-graphite flex items-center justify-center py-24 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16">
          <span className="text-muted-gold text-sm tracking-[0.3em] uppercase mb-4 block">Консультация эксперта</span>
          <TextHighlighter
            text="Рассчитайте стоимость и получите проект освещения в подарок"
            className="text-4xl md:text-6xl font-light leading-tight max-w-3xl"
            highlightClassName="text-graphite"
          />
          <p className="text-stone mt-8 max-w-lg text-lg leading-relaxed">
            Мы подготовим для вас смету в 3-х вариантах бюджета и профессиональный PDF-проект освещения вашего интерьера.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-8">
            <div className="bg-graphite/5 p-8 md:p-12 rounded-sm backdrop-blur-sm border border-graphite/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="min-h-[250px]"
                >
                  <h3 className="text-xl md:text-2xl mb-8 font-light text-graphite/80 flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full border border-muted-gold text-muted-gold flex items-center justify-center text-sm font-mono">{currentStep + 1}</span>
                    {STEPS[currentStep].question}
                  </h3>

                  {STEPS[currentStep].isForm ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-stone/60">Ваше имя</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-graphite/20 py-3 focus:border-muted-gold outline-none transition-colors text-lg"
                            placeholder="Александр"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] uppercase tracking-widest text-stone/60">Телефон</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="bg-transparent border-b border-graphite/20 py-3 focus:border-muted-gold outline-none transition-colors text-lg"
                            placeholder="+7 (___) ___-__-__"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-6 mt-8">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-sm border border-muted-gold flex-shrink-0 mt-1 flex items-center justify-center">
                            <div className="w-2 h-2 bg-muted-gold rounded-full" />
                          </div>
                          <p className="text-xs text-stone/70 max-w-md">
                            Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных и бронируете за собой индивидуальную скидку на монтаж.
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="group relative bg-graphite text-warm-white px-12 py-6 self-start overflow-hidden transition-all hover:pr-16"
                        >
                          <span className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold">Получить расчет и проект</span>
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">→</span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-wrap gap-4">
                      {STEPS[currentStep].options?.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => nextStep(option.value)}
                          className={`px-10 py-6 border transition-all duration-500 text-lg font-light
                            ${formData[STEPS[currentStep].id as keyof typeof formData] === option.value
                              ? "border-muted-gold bg-muted-gold/5 text-muted-gold"
                              : "border-graphite/10 bg-white/50 hover:border-graphite/40 hover:bg-white"
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-12 pt-8 border-t border-graphite/5 flex justify-between items-center">
                {currentStep > 0 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="text-stone/60 text-xs uppercase tracking-widest hover:text-graphite transition-colors flex items-center gap-2"
                  >
                    ← Назад
                  </button>
                ) : <div />}

                <div className="flex gap-2">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 transition-all duration-500 ${i === currentStep ? "w-8 bg-muted-gold" : "w-2 bg-graphite/10"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 pl-0 md:pl-8">
            <div className="flex flex-col gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-[0.3em] text-muted-gold font-bold mb-8">Почему выбирают нас?</h4>
                <ul className="flex flex-col gap-6">
                  {[
                    { title: "Без запаха", desc: "Полотна MSD/Bauf с высшим эко-сертификатом" },
                    { title: "Чистый монтаж", desc: "Строительные пылесосы и укрытие мебели" },
                    { title: "Идеальные углы", desc: "Теневой профиль EuroKraab и демпферные системы" },
                    { title: "15 лет гарантии", desc: "Официальный договор и пожизненный сервис" },
                  ].map((item, i) => (
                    <li key={i} className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-graphite uppercase tracking-wide">{item.title}</span>
                      <span className="text-xs text-stone/70 leading-relaxed">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8 border-t border-graphite/5">
                <p className="text-[10px] uppercase tracking-widest text-stone/40 mb-2">На связи 24/7</p>
                <p className="text-lg font-light mb-1">8 (800) 555-35-35</p>
                <p className="text-sm text-stone">hello@potolokbel.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
