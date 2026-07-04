'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Minus, Plus, Calculator as CalcIcon } from 'lucide-react';

const ceilingPrices: Record<string, number> = {
  'Матовый': 550,
  'Сатиновый': 650,
  'Глянцевый': 600,
  'Световой': 1200,
};

export const Calculator = () => {
  const [area, setArea] = useState(20);
  const [type, setType] = useState('Матовый');
  const [lights, setLights] = useState(4);
  const [corners, setCorners] = useState(4);
  const [total, setTotal] = useState(0);

  const displayTotalRef = useRef<HTMLSpanElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.calc-card', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });

      // Background glow pulse
      gsap.to('.calc-glow', {
        opacity: 0.4,
        scale: 1.2,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const basePrice = (ceilingPrices[type] || 500) * area;
    const lightsPrice = lights * 450;
    const cornersPrice = Math.max(0, corners - 4) * 200;
    const newTotal = basePrice + lightsPrice + cornersPrice;

    const obj = { value: total };
    gsap.to(obj, {
      value: newTotal,
      duration: 1,
      ease: 'power2.out',
      onUpdate: () => {
        if (displayTotalRef.current) {
          displayTotalRef.current.innerText = Math.round(obj.value).toLocaleString('ru-RU');
        }
      },
      onComplete: () => setTotal(newTotal)
    });
  }, [area, type, lights, corners, total]);

  return (
    <section id="calculator" ref={sectionRef} className="section-padding bg-white relative z-10 rounded-t-[60px] -mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto calc-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Form Side */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <CalcIcon className="text-accent" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Онлайн <span className="text-accent">калькулятор</span>
                </h2>
              </div>

              <div className="space-y-10">
                {/* Area Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-lg font-bold">Площадь комнаты</label>
                    <span className="text-2xl font-bold text-accent">{area} м²</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full h-2 bg-gray-soft rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>

                {/* Ceiling Type */}
                <div>
                  <label className="text-lg font-bold block mb-4">Тип полотна</label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(ceilingPrices).map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`py-4 px-6 rounded-2xl text-[15px] font-semibold transition-all border ${
                          type === t
                            ? 'bg-accent text-white border-accent shadow-lg shadow-accent/20'
                            : 'bg-white text-black border-gray-border hover:border-accent'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Counters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <label className="text-lg font-bold block mb-4">Светильники</label>
                    <div className="flex items-center gap-4 bg-gray-soft p-2 rounded-2xl border border-gray-border">
                      <button
                        onClick={() => setLights(Math.max(0, lights - 1))}
                        className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="flex-1 text-center font-bold text-xl">{lights}</span>
                      <button
                        onClick={() => setLights(lights + 1)}
                        className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-lg font-bold block mb-4">Углы в комнате</label>
                    <div className="flex items-center gap-4 bg-gray-soft p-2 rounded-2xl border border-gray-border">
                      <button
                        onClick={() => setCorners(Math.max(4, corners - 1))}
                        className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="flex-1 text-center font-bold text-xl">{corners}</span>
                      <button
                        onClick={() => setCorners(corners + 1)}
                        className="w-12 h-12 rounded-xl bg-white flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Result Side */}
            <div className="relative p-10 md:p-16 rounded-[48px] bg-black text-white overflow-hidden">
              <div className="relative z-10">
                <div className="text-white/60 text-lg mb-4">Предварительная стоимость</div>
                <div className="text-6xl md:text-8xl font-bold mb-8 flex items-baseline gap-4">
                  <span ref={displayTotalRef}>0</span>
                  <span className="text-3xl md:text-4xl text-white/40">₽</span>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="flex justify-between items-center text-white/70 py-4 border-b border-white/10">
                    <span>Материал ({type})</span>
                    <span className="font-bold text-white">{(ceilingPrices[type] * area).toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between items-center text-white/70 py-4 border-b border-white/10">
                    <span>Светильники ({lights} шт)</span>
                    <span className="font-bold text-white">{(lights * 450).toLocaleString('ru-RU')} ₽</span>
                  </div>
                </div>

                <button className="w-full bg-accent hover:bg-accent-dark text-white py-6 rounded-3xl text-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                  Получить точный расчёт
                </button>
                <p className="text-center mt-6 text-white/40 text-sm">
                  *Расчет является предварительным и не является публичной офертой.
                </p>
              </div>

              {/* Decorative background element */}
              <div className="calc-glow absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[120px] rounded-full -mr-20 -mt-20" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
