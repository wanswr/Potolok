'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ceilingRates = [
  { id: 'matte', name: 'Матовый', price: 1000 },
  { id: 'glossy', name: 'Глянцевый', price: 1100 },
  { id: 'satin', name: 'Сатиновый', price: 1150 },
  { id: 'led', name: 'Световой / LED', price: 2000 },
];

export const Calculator = () => {
  const [area, setArea] = useState<number>(20);
  const [selectedType, setSelectedType] = useState(ceilingRates[0]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculated = area * selectedType.price;
    const finalPrice = Math.max(calculated, 8000); // Minimum order price
    setTotalPrice(finalPrice);
  }, [area, selectedType]);

  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-[#F8F9FA] rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Рассчитайте стоимость</h2>
              <p className="text-gray-600 mb-8">
                Выберите параметры вашего помещения, чтобы узнать предварительную стоимость установки.
              </p>

              <div className="space-y-8">
                {/* Area Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 flex justify-between">
                    Площадь помещения: <span>{area} м²</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={area}
                    onChange={(e) => setArea(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>5 м²</span>
                    <span>100 м²</span>
                  </div>
                </div>

                {/* Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Тип потолка:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {ceilingRates.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type)}
                        className={`py-3 px-4 rounded-xl text-sm font-medium transition-all border ${
                          selectedType.id === type.id
                            ? 'bg-accent text-white border-accent shadow-md'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-accent'
                        }`}
                      >
                        {type.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <span className="text-gray-500 mb-2 uppercase tracking-widest text-sm">Примерная стоимость:</span>
              <div className="text-5xl md:text-6xl font-bold text-accent mb-4">
                {totalPrice.toLocaleString()} <span className="text-2xl">₽</span>
              </div>
              <p className="text-sm text-gray-400 text-center mb-8">
                * Итоговая стоимость зависит от количества углов, освещения и сложности работ.
              </p>
              <button className="w-full bg-accent hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02]">
                Получить точный расчёт
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
