import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { TrustBlock } from '@/components/sections/TrustBlock';
import { CeilingTypes } from '@/components/sections/CeilingTypes';
import { Calculator } from '@/components/sections/Calculator';
import { Portfolio } from '@/components/sections/Portfolio';
import { SocialProof } from '@/components/sections/SocialProof';
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
      <SocialProof />
      <FinalCTA />
      <StickyCTA />

      <footer className="bg-[#111111] py-12 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xl font-black text-white mb-4">LUX<span className="text-accent">CEILING</span></div>
          <p className="text-gray-500 text-sm">
            © 2024 LUXCEILING. Премиальные натяжные потолки в Москве и МО.
          </p>
        </div>
      </footer>
    </main>
  );
}
