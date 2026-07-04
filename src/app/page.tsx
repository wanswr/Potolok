import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { TrustBlock } from '@/components/sections/TrustBlock';
import { CeilingTypes } from '@/components/sections/CeilingTypes';
import { Calculator } from '@/components/sections/Calculator';
import { Portfolio } from '@/components/sections/Portfolio';
import { Timeline } from '@/components/sections/Timeline';
import { SocialProof } from '@/components/sections/SocialProof';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { StickyCTA } from '@/components/ui/StickyCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TrustBlock />
      <CeilingTypes />
      <Calculator />
      <Portfolio />
      <Timeline />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <StickyCTA />

      <footer className="bg-[#111111] py-20 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold text-white mb-6">Potolok<span className="text-accent">Bel</span></div>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Премиальные натяжные потолки в Москве и Московской области.
                Создаем уют и безупречный стиль в вашем доме с 2012 года.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-white">TG</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-white">WA</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                  <span className="text-xs font-bold text-white">VK</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Навигация</h4>
              <ul className="space-y-4 text-gray-500">
                <li><a href="#features" className="hover:text-white transition-colors">Преимущества</a></li>
                <li><a href="#types" className="hover:text-white transition-colors">Виды потолков</a></li>
                <li><a href="#calculator" className="hover:text-white transition-colors">Калькулятор</a></li>
                <li><a href="#portfolio" className="hover:text-white transition-colors">Наши работы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Контакты</h4>
              <ul className="space-y-4 text-gray-500">
                <li>г. Москва, ул. Примерная, 12</li>
                <li><a href="tel:+79990000000" className="hover:text-white transition-colors">+7 (999) 000-00-00</a></li>
                <li>Пн-Вс: 9:00 - 21:00</li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-sm">
              © 2024 PotolokBel. Все права защищены.
            </p>
            <div className="flex gap-8 text-sm text-gray-600">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
