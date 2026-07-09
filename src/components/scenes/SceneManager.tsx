"use client";

import { useEffect, useRef, useState } from "react";
import { HeroScene } from "./HeroScene";
import { MaterialScene } from "./MaterialScene";
import { CeilingTypesScene } from "./CeilingTypesScene";
import { ServicesGrid } from "./ServicesGrid";
import { DesignerScene } from "./DesignerScene";
import { CasesScene } from "./CasesScene";
import { AdvantagesScene } from "./AdvantagesScene";
import { SocialProofScene } from "./SocialProofScene";
import { PainSolutionScene } from "./PainSolutionScene";
import LightScene from "./LightScene";
import ProcessScene from "./ProcessScene";
import PortfolioScene from "./PortfolioScene";
import TrustScene from "./TrustScene";
import ContactScene from "./ContactScene";
import { PartnersScene } from "./PartnersScene";
import Lenis from "lenis";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SceneManager() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;


    // 1. Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      smoothWheel: true,
    });

    // 2. Synchronize GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 3. Refresh ScrollTrigger after a short delay to ensure layout is ready
    const refreshAndLoad = () => {
      ScrollTrigger.refresh();
      setIsLoaded(true);
    };

    // Use multiple triggers to ensure refresh happens
    const timer = setTimeout(refreshAndLoad, 1000);
    window.addEventListener('load', refreshAndLoad);

    // Clean up
    return () => {
      lenis.destroy();
      clearTimeout(timer);
      window.removeEventListener('load', refreshAndLoad);
    };
  }, []);

  return (
    <main
      ref={containerRef}
      className={`relative w-full bg-graphite transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <section id="hero">
        <HeroScene />
      </section>
      <section id="pain"><PainSolutionScene /></section>
      <section id="material">
        <MaterialScene />
      </section>
      <section id="types">
        <CeilingTypesScene />
      </section>
      <section id="services"><ServicesGrid /></section>
      <section id="light">
        <LightScene />
      </section>
      <section id="advantages"><AdvantagesScene /></section>
      <section id="social"><SocialProofScene /></section>
      <section id="process">
        <ProcessScene />
      </section>
      <section id="cases"><CasesScene /></section>
      <section id="designer"><DesignerScene /></section>
      <section id="portfolio">
        <PortfolioScene />
      </section>
      <section id="partners">
        <PartnersScene />
      </section>
      <section id="trust">
        <TrustScene />
      </section>
      <section id="contact">
        <ContactScene />
      </section>
    </main>
  );
}
