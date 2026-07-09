"use client";

import { useRef, useEffect, useLayoutEffect } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const PROJECTS = [
  {
    id: 1,
    title: "Minimalist Loft",
    type: "Теневой профиль EuroKraab",
    location: "ЖК 'Сердце Столицы'",
    image: "/images/room-classic.jpg",
  },
  {
    id: 2,
    title: "Modern Residence",
    type: "Световые линии Flexy",
    location: "КП 'Миллениум Парк'",
    image: "/images/room-classic.jpg",
  },
  {
    id: 3,
    title: "Executive Office",
    type: "Парящий потолок с подсветкой",
    location: "БЦ 'Москва Сити'",
    image: "/images/room-classic.jpg",
  }
];

export default function PortfolioScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !galleryRef.current) return;

    const ctx = gsap.context(() => {
      // Calculate the horizontal travel distance
      const getGalleryWidth = () => galleryRef.current?.scrollWidth || 0;
      const getWindowWidth = () => window.innerWidth;

      const portfolioTween = gsap.to(galleryRef.current, {
        x: () => -(getGalleryWidth() - getWindowWidth()),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getGalleryWidth()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax effect for images
      gsap.utils.toArray(".portfolio-image").forEach((img: any) => {
        gsap.to(img, {
          x: -100,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            containerAnimation: portfolioTween,
            scrub: true,
            invalidateOnRefresh: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-graphite overflow-hidden">
      <div className="absolute top-12 left-12 z-10">
        <span className="text-muted-gold text-sm tracking-[0.3em] uppercase mb-4 block">Галерея проектов</span>
        <h2 className="text-5xl font-light text-warm-white">Избранные объекты</h2>
      </div>

      <div
        ref={galleryRef}
        className="flex h-full items-center pl-12 gap-24 whitespace-nowrap"
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="relative w-[70vw] h-[70vh] flex-shrink-0 group"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="portfolio-image object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            </div>

            <div className="absolute bottom-[-4rem] left-0 text-warm-white flex flex-col gap-2">
              <h3 className="text-3xl font-light tracking-wide">{project.title}</h3>
              <div className="flex items-center gap-4 text-stone text-sm uppercase tracking-widest">
                <span>{project.type}</span>
                <span className="w-8 h-[1px] bg-muted-gold" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="w-[30vw] h-full flex items-center justify-center flex-shrink-0">
           <button className="text-muted-gold text-xl border-b border-muted-gold/30 pb-2 hover:text-warm-white transition-colors">
             Смотреть все проекты
           </button>
        </div>
      </div>
    </section>
  );
}
