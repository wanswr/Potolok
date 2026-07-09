"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextHighlighter } from "../ui/TextHighlighter";

export default function ContactScene() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо! Ваша заявка принята. Мы свяжемся с вами в течение 30 минут для расчета стоимости.");
  };

  return (
    <section className="relative min-h-screen w-full bg-graphite text-warm-white flex items-center justify-center py-32 px-6 overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-muted-gold/10 via-transparent to-transparent opacity-50" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">

          <div className="lg:col-span-6">
            <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block">Начнем ваш проект</span>
            <h2 className="text-4xl md:text-7xl font-extralight leading-[1.1] mb-10">
              Создайте интерьер, <br /> который будет <br /> радовать каждый день
            </h2>

            <div className="flex flex-col gap-10 mb-16">
               <div className="flex flex-col gap-2">
                  <p className="text-stone text-[10px] uppercase tracking-widest font-bold mb-4">Бесплатный сервис для вас:</p>
                  <ul className="flex flex-col gap-4">
                    {["Бесплатный расчет стоимости за 15 минут", "Консультация ведущего дизайнера-технолога", "Индивидуальный подбор систем освещения"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-stone text-lg font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 pt-12 border-t border-warm-white/10">
               <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone/40 mb-2">Наш офис</p>
                  <p className="text-sm font-light">Москва, ул. Архитектора Власова, 47</p>
               </div>
               <div>
                  <p className="text-[10px] uppercase tracking-widest text-stone/40 mb-2">Связь</p>
                  <p className="text-lg font-light">8 (800) 555-35-35</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-warm-white/5 backdrop-blur-3xl p-10 md:p-16 border border-warm-white/10 rounded-sm">
              <h3 className="text-2xl font-light mb-12">Получите расчет стоимости</h3>

              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone/60">Ваше имя</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-warm-white/20 py-4 focus:border-muted-gold outline-none transition-colors text-lg font-light"
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
                    className="bg-transparent border-b border-warm-white/20 py-4 focus:border-muted-gold outline-none transition-colors text-lg font-light"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone/60">Комментарий (необязательно)</label>
                  <textarea
                    name="comment"
                    rows={1}
                    value={formData.comment}
                    onChange={handleInputChange}
                    className="bg-transparent border-b border-warm-white/20 py-4 focus:border-muted-gold outline-none transition-colors text-lg font-light resize-none"
                    placeholder="Например: площадь 50м2, теневой профиль"
                  />
                </div>

                <div className="flex flex-col gap-6 mt-6">
                  <p className="text-[10px] text-stone/60 leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь с Политикой конфиденциальности. <br />
                    Ваши данные в безопасности.
                  </p>
                  <button
                    type="submit"
                    className="group relative bg-muted-gold text-graphite px-12 py-6 overflow-hidden transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 uppercase tracking-[0.2em] text-xs font-bold">Получить расчет стоимости</span>
                    <div className="absolute inset-0 bg-warm-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Custom Footer Integrated */}
      <div className="absolute bottom-12 left-0 w-full px-6 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30 text-[10px] uppercase tracking-widest">
         <div className="flex gap-8">
            <a href="#" className="hover:text-muted-gold transition-colors">Политика</a>
            <a href="#" className="hover:text-muted-gold transition-colors">Реквизиты</a>
         </div>
         <p>© 2024 POTOLOKBEL. PREMIUM INTERIORS.</p>
         <div className="flex gap-8">
            <a href="#" className="hover:text-muted-gold transition-colors">Instagram</a>
            <a href="#" className="hover:text-muted-gold transition-colors">Telegram</a>
         </div>
      </div>
    </section>
  );
}
