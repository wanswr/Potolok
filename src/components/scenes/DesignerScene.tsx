"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const DesignerScene = () => {
  return (
    <section className="bg-warm-white py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 relative aspect-square w-full max-w-xl">
             <Image
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop"
                alt="Designer Workspace"
                fill
                className="object-cover grayscale"
             />
             <div className="absolute inset-0 border-[20px] border-graphite/5 -m-10 pointer-events-none" />
          </div>

          <div className="flex-1">
            <span className="text-muted-gold text-[10px] uppercase tracking-[0.4em] font-bold mb-8 block">Профессиональное сотрудничество</span>
            <h2 className="text-4xl md:text-6xl font-light text-graphite mb-10 leading-tight">
              Создаем потолочные решения для <br /> дизайнерских проектов
            </h2>
            <p className="text-stone text-lg mb-12 font-light leading-relaxed">
              Мы понимаем язык дизайнеров и архитекторов. Предоставляем технические консультации, разрабатываем сложные узлы примыкания и гарантируем реализацию самой смелой идеи в рамках бюджета.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {[
                { t: "Техподдержка", d: "Чертежи узлов и консультации на этапе проекта" },
                { t: "База моделей", d: "3D-модели наших систем освещения" },
                { t: "Образцы", d: "Предоставляем кейсы с материалами для мудбордов" },
                { t: "Спецусловия", d: "Индивидуальная партнерская программа" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-graphite">{item.t}</h4>
                  <p className="text-stone text-xs font-light">{item.d}</p>
                </div>
              ))}
            </div>

            <button className="bg-graphite text-warm-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-muted-gold transition-colors">
              Стать партнером
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
