"use client";

import { useEffect, useRef } from "react";
import { HeroScene } from "./HeroScene";
import { MaterialScene } from "./MaterialScene";
import { CeilingTypesScene } from "./CeilingTypesScene";
import LightScene from "./LightScene";
import ProcessScene from "./ProcessScene";
import PortfolioScene from "./PortfolioScene";
import TrustScene from "./TrustScene";
import ContactScene from "./ContactScene";
import Lenis from "lenis";

export default function SceneManager() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main ref={containerRef} className="relative w-full bg-graphite">
      <section id="hero">
        <HeroScene />
      </section>
      <section id="material">
        <MaterialScene />
      </section>
      <section id="types">
        <CeilingTypesScene />
      </section>
      <section id="light">
        <LightScene />
      </section>
      <section id="process">
        <ProcessScene />
      </section>
      <section id="portfolio">
        <PortfolioScene />
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
