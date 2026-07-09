"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    // Logic for API call here
    alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
  };

  return (
    <section className="relative min-h-screen w-full bg-warm-white text-graphite flex items-center justify-center py-24 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-stone/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-16">
          <span className="text-muted-gold text-sm tracking-[0.3em] uppercase mb-4 block">Консультация</span>
          <h2 className="text-5xl md:text-7xl font-light leading-tight">
            Создайте свой <br /> идеальный интерьер
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="min-h-[300px]"
              >
                <h3 className="text-2xl mb-8 font-light text-stone">
                  {STEPS[currentStep].question}
                </h3>

                {STEPS[currentStep].isForm ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-stone/60">Ваше имя</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-graphite/20 py-3 focus:border-muted-gold outline-none transition-colors"
                          placeholder="Александр"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-xs uppercase tracking-widest text-stone/60">Телефон</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-transparent border-b border-graphite/20 py-3 focus:border-muted-gold outline-none transition-colors"
                          placeholder="+7 (___) ___-__-__"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="mt-8 bg-graphite text-warm-white px-12 py-5 self-start hover:bg-muted-gold transition-colors duration-500 uppercase tracking-widest text-sm"
                    >
                      Отправить проект
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {STEPS[currentStep].options?.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => nextStep(option.value)}
                        className={`px-8 py-4 border transition-all duration-300 text-lg font-light
                          ${formData[STEPS[currentStep].id as keyof typeof formData] === option.value
                            ? "border-muted-gold bg-muted-gold/5 text-muted-gold"
                            : "border-graphite/10 hover:border-graphite/40"
                          }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="mt-12 text-stone/60 text-sm uppercase tracking-widest hover:text-graphite transition-colors"
              >
                ← Назад
              </button>
            )}
          </div>

          <div className="md:col-span-4 border-l border-graphite/5 pl-12 hidden md:block">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-stone/40 mb-2">Наш офис</p>
                <p className="text-sm">Москва, ул. Архитектора Власова, 47</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone/40 mb-2">Телефон</p>
                <p className="text-sm font-medium">8 (800) 555-35-35</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-stone/40 mb-2">Email</p>
                <p className="text-sm">hello@potolokbel.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-12 flex items-center gap-4">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-500 ${i === currentStep ? "w-12 bg-muted-gold" : "w-4 bg-graphite/10"}`}
          />
        ))}
      </div>
    </section>
  );
}
