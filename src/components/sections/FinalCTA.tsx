'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

export const FinalCTA = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'Final CTA Form'
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setStatus('error');
    }
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Side Content
      gsap.from('.cta-content-side > *', {
        x: -50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Reveal Form
      gsap.from(formRef.current, {
        x: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Background Light Movement
      gsap.to('.cta-glow', {
        x: '30%',
        y: '-20%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="contacts" ref={sectionRef} data-journey-section className="section-padding bg-black text-white relative overflow-hidden rounded-t-[60px] -mt-20">
      {/* Decorative background */}
      <div className="cta-glow absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-accent/20 via-transparent to-transparent pointer-events-none blur-[120px] opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Content Side */}
          <div className="cta-content-side">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-bold mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Акция: Замер бесплатно сегодня
            </div>

            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-10 leading-[1.1]">
              Готовы преобразить <br />
              <span className="text-accent">ваш интерьер?</span>
            </h2>

            <div className="space-y-8 mb-12">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Выезд за 2 часа</h4>
                  <p className="text-white/50">Приедем в любой район Москвы и области</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">+7 (999) 000-00-00</h4>
                  <p className="text-white/50">Ежедневно с 9:00 до 21:00</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Гарантия 15 лет</h4>
                  <p className="text-white/50">Зафиксировано в официальном договоре</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 inline-block">
              <div className="text-sm text-white/40 mb-2 uppercase tracking-widest font-bold">Осталось мест на сегодня:</div>
              <div className="text-3xl font-bold text-accent">3 свободных окна</div>
            </div>
          </div>

          {/* Form Side */}
          <div ref={formRef} className="bg-white rounded-[48px] p-10 md:p-16 text-black relative shadow-2xl shadow-accent/10">
            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold mb-4">Спасибо!</h3>
                <p className="text-black/50 text-lg leading-relaxed mb-8">
                  Мы получили вашу заявку и перезвоним вам в течение 15 минут.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-accent font-bold hover:underline"
                >
                  Отправить еще раз
                </button>
              </div>
            ) : status === 'error' ? (
              <div className="text-center py-10">
                <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <span className="text-4xl font-bold">!</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">Ошибка</h3>
                <p className="text-black/50 text-lg leading-relaxed mb-8">
                  Что-то пошло не так. Пожалуйста, попробуйте позже или позвоните нам.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-accent font-bold hover:underline"
                >
                  Попробовать снова
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">Оставьте заявку</h3>
                <p className="text-black/50 text-lg mb-10">
                  И получите скидку 10% на первое полотно
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-black/40 uppercase tracking-wider block mb-3 ml-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      placeholder="Иван Иванов"
                      className="w-full px-8 py-5 rounded-3xl bg-gray-soft border border-gray-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-lg"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-black/40 uppercase tracking-wider block mb-3 ml-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      className="w-full px-8 py-5 rounded-3xl bg-gray-soft border border-gray-border focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-lg font-mono"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <button
                    disabled={status === 'loading'}
                    className="w-full bg-accent hover:bg-accent-dark text-white py-6 rounded-3xl text-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-accent/20 disabled:opacity-50 disabled:scale-100"
                  >
                    {status === 'loading' ? 'Отправка...' : 'Перезвоните мне'}
                  </button>

                  <p className="text-center text-xs text-black/30 mt-6 leading-relaxed">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                    и принимаете <a href="#" className="underline">условия политики конфиденциальности</a>.
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
