"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const SCENARIOS = [
  {
    id: "day",
    title: "Естественный свет",
    description: "Наполняет пространство энергией и чистотой.",
    image: "/images/room-classic.jpg",
    overlay: "rgba(255, 255, 255, 0)",
    brightness: 1,
  },
  {
    id: "sunset",
    title: "Мягкий закат",
    description: "Уютные тени и теплое свечение для отдыха.",
    image: "/images/room-classic.jpg",
    overlay: "rgba(255, 100, 0, 0.1)",
    brightness: 0.8,
  },
  {
    id: "evening",
    title: "Вечерний сценарий",
    description: "Акцентное освещение выделяет важные детали.",
    image: "/images/room-classic.jpg",
    overlay: "rgba(0, 20, 50, 0.2)",
    brightness: 0.6,
  },
  {
    id: "night",
    title: "Ночная магия",
    description: "Деликатная подсветка создает атмосферу приватности.",
    image: "/images/room-classic.jpg",
    overlay: "rgba(0, 0, 30, 0.5)",
    brightness: 0.4,
  }
];

export default function LightScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      SCENARIOS.forEach((_, i) => {
        if (i === 0) return;

        // Transition image
        tl.to(imageRefs.current[i], {
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        }, i - 0.5);

        // Transition content
        tl.to(cardRefs.current[i - 1], {
          opacity: 0,
          y: -20,
          duration: 0.5,
        }, i - 0.5);

        tl.fromTo(cardRefs.current[i], {
          opacity: 0,
          y: 20,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.5,
        }, i);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Base Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SCENARIOS[0].image}
          alt="Base Light"
          fill
          className="object-cover opacity-60"
          priority
        />
      </div>

      {/* Dynamic Light Layers */}
      {SCENARIOS.map((scenario, i) => (
        <div
          key={scenario.id}
          ref={(el) => { imageRefs.current[i] = el; }}
          className="absolute inset-0 z-10"
          style={{
            opacity: i === 0 ? 1 : 0,
            background: scenario.overlay,
            mixBlendMode: i === 0 ? "normal" : "multiply",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
             <Image
              src={scenario.image}
              alt={scenario.title}
              fill
              className="object-cover"
              style={{
                filter: i === 1 ? "sepia(0.3) brightness(0.8) saturate(1.5)" :
                        i === 2 ? "brightness(0.6) contrast(1.2) saturate(0.8) hue-rotate(10deg)" :
                        i === 3 ? "brightness(0.4) contrast(1.4) saturate(0.5) hue-rotate(200deg)" : "none"
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>
      ))}

      {/* Content Cards */}
      <div className="absolute inset-0 z-20 flex items-end justify-center pb-24 px-6">
        <div className="relative w-full max-w-4xl">
          {SCENARIOS.map((scenario, i) => (
            <div
              key={scenario.id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute bottom-0 left-0 w-full"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <div className="flex flex-col items-start max-w-xl">
                <span className="text-muted-gold text-sm tracking-[0.3em] uppercase mb-4 block">
                  Световой сценарий {i + 1}
                </span>
                <h2 className="text-4xl md:text-6xl font-light text-warm-white mb-6 leading-tight">
                  {scenario.title}
                </h2>
                <p className="text-stone text-lg md:text-xl max-w-md leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator for the section */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4">
        {SCENARIOS.map((_, i) => (
          <div key={i} className="w-1 h-8 bg-stone/20 rounded-full overflow-hidden">
            <div className="w-full h-full bg-muted-gold origin-top scale-y-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
