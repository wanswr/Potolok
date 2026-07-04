'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Clock, Send } from 'lucide-react';

export const FinalCTA = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');

    // Simulate API call
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <section className="section-padding bg-[#1A1A1A] text-white overflow-hidden relative">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 blur-[120px] rounded-full translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Замер бесплатно <br />
              <span className="text-accent">уже сегодня</span>
            </h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-bold">Выезд за 2 часа</div>
                  <div className="text-gray-400">Приедем в любой район Москвы</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="font-bold">+7 (999) 000-00-00</div>
                  <div className="text-gray-400">Ежедневно с 9:00 до 21:00</div>
                </div>
              </div>
            </div>

            <div className="inline-block p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Осталось мест на сегодня:</div>
              <div className="text-2xl font-bold text-accent-gold">3 свободных окна</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 text-gray-900 shadow-2xl">
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Спасибо!</h3>
                <p className="text-gray-600">Мы перезвоним вам в течение 15 минут.</p>
                <button
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-accent font-semibold"
                >
                  Отправить еще раз
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Оставьте заявку</h3>
                <p className="text-gray-500 mb-8">И получите скидку 10% на первое полотно</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                    <input
                      name="name"
                      required
                      type="text"
                      placeholder="Иван"
                      className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                    <input
                      name="phone"
                      required
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-4 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                  </div>
                  <button
                    disabled={formStatus === 'loading'}
                    className="w-full bg-accent hover:bg-blue-700 text-white py-5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                  >
                    {formStatus === 'loading' ? 'Отправка...' : 'Перезвоните мне'}
                  </button>
                  <p className="text-[10px] text-gray-400 text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
