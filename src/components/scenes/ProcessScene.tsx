"use client";

import { useRef, useEffect } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  {
    id: "measure",
    title: "Точный замер",
    description: "Лазерное сканирование пространства для идеального прилегания профиля.",
  },
  {
    id: "design",
    title: "Архитектурный проект",
    description: "Разработка узлов примыкания и световых решений в 3D.",
  },
  {
    id: "install",
    title: "Чистый монтаж",
    description: "Безопасное оборудование и отсутствие пыли в вашем интерьере.",
  },
  {
    id: "result",
    title: "Безупречный финал",
    description: "Гарантия на полотно 15 лет и пожизненная поддержка.",
  }
];

export default function ProcessScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(SVGSVGElement | null)[]>([]);
  const visualRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          scrub: true,
          pin: true,
        },
      });

      STEPS.forEach((_, i) => {
        // Entrance of step content and visual
        tl.to(visualRefs.current[i], { opacity: 1, duration: 0.5 }, i * 1.5);
        tl.fromTo(stepRefs.current[i],
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 1 },
          i * 1.5
        );

        // Animate SVG lines
        const svg = iconRefs.current[i];
        if (svg) {
          const paths = svg.querySelectorAll("path, line, rect, circle");
          tl.fromTo(paths,
            { strokeDasharray: 500, strokeDashoffset: 500 },
            { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" },
            i * 1.5
          );
        }

        // Exit of step content (except last)
        if (i < STEPS.length - 1) {
          tl.to(visualRefs.current[i], { opacity: 0, duration: 0.5 }, (i * 1.5) + 1.2);
          tl.to(stepRefs.current[i],
            { opacity: 0, x: -50, duration: 1 },
            (i * 1.5) + 1.2
          );
        }
      });

      // Progress line animation
      tl.to("#process-progress", { width: "100%", ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const icons = [
    (props: any) => (
      <svg {...props} viewBox="0 0 200 200" className="w-full h-full fill-none stroke-muted-gold stroke-[0.5]">
        <rect x="40" y="40" width="120" height="120" />
        <line x1="40" y1="40" x2="160" y2="160" />
        <line x1="160" y1="40" x2="40" y2="160" />
        <circle cx="100" cy="100" r="2" fill="currentColor" />
        <path d="M40 60 L45 60 L45 40" />
        <path d="M155 40 L155 60 L160 60" />
        <path d="M160 140 L155 140 L155 160" />
        <path d="M45 160 L45 140 L40 140" />
      </svg>
    ),
    (props: any) => (
      <svg {...props} viewBox="0 0 200 200" className="w-full h-full fill-none stroke-muted-gold stroke-[0.5]">
        <path d="M30 150 L100 120 L170 150" />
        <path d="M30 50 L100 80 L170 50" />
        <line x1="30" y1="50" x2="30" y2="150" />
        <line x1="100" y1="80" x2="100" y2="120" />
        <line x1="170" y1="50" x2="170" y2="150" />
        <path d="M100 80 L60 60" strokeDasharray="4 4" />
        <path d="M100 80 L140 60" strokeDasharray="4 4" />
      </svg>
    ),
    (props: any) => (
      <svg {...props} viewBox="0 0 200 200" className="w-full h-full fill-none stroke-muted-gold stroke-[0.5]">
        <path d="M40 40 H160 V160 H40 Z" />
        <path d="M40 50 H160" />
        <path d="M40 60 H160" strokeOpacity="0.3" />
        <circle cx="100" cy="40" r="5" />
        <line x1="80" y1="40" x2="80" y2="160" strokeDasharray="2 2" />
        <line x1="120" y1="40" x2="120" y2="160" strokeDasharray="2 2" />
      </svg>
    ),
    (props: any) => (
      <svg {...props} viewBox="0 0 200 200" className="w-full h-full fill-none stroke-muted-gold stroke-[0.5]">
        <path d="M100 40 L160 100 L100 160 L40 100 Z" />
        <path d="M100 60 L140 100 L100 140 L60 100 Z" />
        <circle cx="100" cy="100" r="10" />
      </svg>
    ),
  ];

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-graphite overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="text-[20vw] font-black text-warm-white/10 select-none">PROCESS</div>
      </div>

      <div className="container mx-auto h-full flex flex-col md:flex-row items-center justify-center gap-12 px-6">
        {/* Visual Column */}
        <div className="relative w-64 h-64 md:w-96 md:h-96">
          {STEPS.map((step, i) => {
            const Icon = icons[i];
            return (
              <div
                key={`icon-${step.id}`}
                ref={(el) => { visualRefs.current[i] = el; }}
                className="absolute inset-0 flex items-center justify-center opacity-0"
              >
                <div className="w-full h-full p-8 md:p-12">
                  <Icon ref={(el: SVGSVGElement) => { iconRefs.current[i] = el; }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Text Column */}
        <div className="relative w-full max-w-lg h-64 md:h-auto">
          {STEPS.map((step, i) => (
            <div
              key={`text-${step.id}`}
              ref={(el) => { stepRefs.current[i] = el; }}
              className="absolute top-0 left-0 w-full opacity-0"
            >
              <div className="flex flex-col">
                <span className="text-muted-gold font-mono text-sm mb-4">0{i + 1} // ЭТАП</span>
                <h2 className="text-4xl md:text-5xl font-light text-warm-white mb-6">
                  {step.title}
                </h2>
                <p className="text-stone text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-stone/20">
        <div id="process-progress" className="h-full bg-muted-gold w-0" />
      </div>
    </section>
  );
}
