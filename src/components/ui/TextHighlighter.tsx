"use client";

import { useEffect, useRef } from "react";
import gsap from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextHighlighterProps {
  text: string;
  className?: string;
  highlightClassName?: string;
}

export const TextHighlighter = ({ text, className = "", highlightClassName = "text-warm-white" }: TextHighlighterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll(".word");

    gsap.fromTo(
      words,
      { opacity: 0.2 },
      {
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
        duration: 1,
      }
    );
  }, []);

  return (
    <div ref={containerRef} className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {text.split(" ").map((word, i) => (
        <span key={i} className={`word opacity-20 transition-colors duration-300 ${highlightClassName}`}>
          {word}
        </span>
      ))}
    </div>
  );
};
