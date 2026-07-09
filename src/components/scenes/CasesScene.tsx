"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CASES = [
  {
    task: "Хотели современный интерьер без видимых переходов и плинтусов",
    solution: "Установили теневой потолок EuroKraab с интегрированным трековым освещением",
    result: "Получился безупречный минималистичный интерьер премиального уровня",
    img: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2070&auto=format&fit=crop"
  }
];

export const CasesScene = () => {
  return (
    <section className="bg-graphite py-32 border-t border-warm-white/5">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-6 block">Разбор кейса</span>
          <h2 className="text-4xl md:text-6xl font-light text-warm-white">От задачи до идеального результата</h2>
        </div>

        {CASES.map((c, i) => (
          <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 relative aspect-[16/9] rounded-sm overflow-hidden border border-warm-white/10">
               <Image src={c.img} alt="Case study" fill className="object-cover" />
            </div>

            <div className="lg:col-span-5 flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <span className="text-stone text-[10px] uppercase tracking-widest font-bold">Задача клиента</span>
                <p className="text-warm-white text-xl font-light leading-relaxed">{c.task}</p>
              </div>

              <div className="flex flex-col gap-4">
                <span className="text-muted-gold text-[10px] uppercase tracking-widest font-bold">Что сделали</span>
                <p className="text-stone text-lg font-light leading-relaxed">{c.solution}</p>
              </div>

              <div className="flex flex-col gap-4 p-8 bg-warm-white/5 border-l border-muted-gold">
                <span className="text-warm-white text-[10px] uppercase tracking-widest font-bold">Итоговый результат</span>
                <p className="text-warm-white text-lg font-light italic">"{c.result}"</p>
              </div>

              <button className="self-start text-[10px] uppercase tracking-[0.3em] font-bold text-muted-gold border-b border-muted-gold/20 pb-2 hover:border-muted-gold transition-all">
                Смотреть подробности кейса
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
