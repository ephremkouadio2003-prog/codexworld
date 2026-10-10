"use client";

import Image from "next/image";
import React, { useState } from "react";

export interface AccordionItem {
  id: string;
  url: string;
  title: string;
  description: string;
  quote?: string;
  tags?: string[];
}

export const defaultItems: AccordionItem[] = [
  {
    id: "1",
    url: "/img/ephrem-kouadio.jpg",
    title: "Ephrem Kouadio",
    description: "Co-fondateur & Tech Lead · IA & Produit",
    quote: "Accompagner chaque vision de l'idée initiale jusqu'à un produit livré avec exigence et finesse.",
    tags: [
      "Architecture",
      "Fullstack",
      "Next.js",
      "Performance Cloud",
      "Marketing",
      "IA",
      "Automatisation",
      "Communication",
      "Produit",
      "Design UI/UX",
      "Stratégie",
      "Web & Mobile",
    ],
  },
  {
    id: "2",
    url: "/img/jeremie-kouassi.jpg",
    title: "Jérémie Kouassi",
    description: "Co-fondateur & Tech Lead · Produit",
    quote: "Bâtir des architectures robustes, ultra-performantes et pensées pour durer et scaler.",
    tags: [
      "Architecture",
      "Fullstack",
      "Next.js",
      "Performance Cloud",
      "Produit",
      "Design UI/UX",
      "Stratégie",
      "Web & Mobile",
    ],
  },
];

export interface TailwindImageAccordionProps {
  items?: AccordionItem[];
  className?: string;
}

export function TailwindImageAccordion({
  items = defaultItems,
  className = "",
}: TailwindImageAccordionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isTwoItems = items.length === 2;

  return (
    <div
      className={`group flex max-md:flex-col justify-center gap-3 w-full max-w-5xl mx-auto my-4 ${className}`}
      onMouseLeave={() => setHoveredId(null)}
    >
      {items.map((item) => {
        const isHovered = hoveredId === item.id;
        const isDimmed = hoveredId !== null && !isHovered;

        return (
          <article
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onClick={() => setHoveredId(isHovered ? null : item.id)}
            className={`group/article relative w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)] ${
              isTwoItems
                ? isHovered
                  ? "md:w-[68%]"
                  : isDimmed
                  ? "md:w-[32%]"
                  : "md:w-1/2"
                : isHovered
                ? "md:w-[60%]"
                : isDimmed
                ? "md:w-[20%]"
                : "md:w-1/3"
            } shadow-xl border border-ink/10`}
          >
            {/* Dark gradient overlay for readable text */}
            <div
              className={`absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/95 via-black/70 to-transparent z-10 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-80"
              }`}
            />

            {/* Inactive overlay when another card is hovered */}
            <div
              className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] z-10 transition-opacity duration-500 pointer-events-none ${
                isDimmed ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Founder info content */}
            <div className="absolute inset-0 text-white z-20 p-5 md:p-7 flex flex-col justify-end pointer-events-none">
              <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight text-white transition-all duration-300">
                {item.title}
              </h3>
              <p className="text-sm md:text-base font-semibold text-lime mt-1 transition-all duration-300">
                {item.description}
              </p>

              {/* Quote revealed on hover */}
              {item.quote && (
                <p
                  className={`text-xs md:text-sm text-paper/85 italic mt-2 line-clamp-2 transition-all duration-400 ${
                    isHovered
                      ? "opacity-100 max-h-16 translate-y-0"
                      : "opacity-0 max-h-0 translate-y-2 overflow-hidden"
                  }`}
                >
                  “{item.quote}”
                </p>
              )}

              {/* Tags revealed on hover */}
              {item.tags && item.tags.length > 0 && (
                <div
                  className={`flex flex-wrap gap-1.5 mt-3 transition-all duration-400 ${
                    isHovered
                      ? "opacity-100 max-h-48 translate-y-0"
                      : "opacity-0 max-h-0 translate-y-2 overflow-hidden"
                  }`}
                >
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-medium border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Founder portrait photo */}
            <Image
              className={`object-cover object-top h-96 md:h-[460px] w-full transition-transform duration-700 ease-out ${
                isHovered ? "scale-105" : "scale-100"
              }`}
              src={item.url}
              width={960}
              height={480}
              alt={item.title}
              priority
            />
          </article>
        );
      })}
    </div>
  );
}

export default TailwindImageAccordion;
