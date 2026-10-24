"use client";

import { useEffect, useRef, useState } from "react";
import { process } from "@/content/site";

// Frise des quatre étapes : une orbite pointillée qui se remplit de vert au
// fil du scroll (desktop), une ligne verticale sur mobile.
const PATH = "M0 100 Q75 10 150 100 T300 100 T450 100 T600 100 T750 100 T900 100 T1050 100 T1200 100";
const NODES = [
  { x: 150, at: 0.125 },
  { x: 450, at: 0.375 },
  { x: 750, at: 0.625 },
  { x: 1050, at: 0.875 },
];

export default function ProcessOrbit() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;
    const update = () => {
      ticking = false;
      if (reduce) {
        setP(1);
        return;
      }
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const v = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      setP(Math.max(0, Math.min(1, v)));
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    const raf = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Orbite (desktop) */}
      <svg
        viewBox="0 0 1200 200"
        aria-hidden="true"
        focusable="false"
        className="hidden w-full overflow-visible lg:block"
      >
        <path d={PATH} fill="none" stroke="#4a4558" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
        <path
          d={PATH}
          pathLength={1}
          fill="none"
          stroke="var(--lime)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="1"
          style={{ strokeDashoffset: 1 - p, transition: "stroke-dashoffset .15s linear" }}
        />
        {NODES.map((n, i) => {
          const on = p >= n.at;
          return (
            <g key={n.x} style={{ transition: "all .4s" }}>
              <circle
                cx={n.x}
                cy="100"
                r="30"
                fill={on ? "var(--lime)" : "var(--ink)"}
                stroke={on ? "var(--lime)" : "#4a4558"}
                strokeWidth="3"
                style={{ transition: "fill .4s, stroke .4s" }}
              />
              <text
                x={n.x}
                y="100"
                textAnchor="middle"
                dominantBaseline="central"
                fill={on ? "var(--ink)" : "#b9b4c9"}
                className="font-display text-[18px]"
                style={{ transition: "fill .4s" }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Ligne verticale (mobile) */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-[21px] top-2 w-[3px] rounded-full lg:hidden"
        style={{ background: "repeating-linear-gradient(to bottom,#4a4558 0 3px,transparent 3px 14px)" }}
      >
        <i
          className="absolute inset-0 origin-top rounded-full bg-lime"
          style={{ transform: `scaleY(${p})`, transition: "transform .15s linear" }}
        />
      </span>

      <ol className="relative grid gap-9 pl-16 lg:grid-cols-4 lg:gap-8 lg:pl-0">
        {process.map((s, i) => {
          const on = p >= s.at;
          return (
            <li key={s.title} data-reveal className="relative lg:px-1 lg:text-center">
              <span
                aria-hidden="true"
                className={`absolute -left-16 top-0 grid h-11 w-11 place-items-center rounded-full border-[3px] font-display text-sm transition-colors duration-300 lg:hidden ${
                  on ? "border-lime bg-lime text-ink" : "border-[#4a4558] bg-ink text-paper/60"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-[clamp(2.4rem,3.6vw,3.5rem)] uppercase leading-[0.9] tracking-[-0.02em]">
                {s.title}
              </h3>
              <p className="mt-3 max-w-[20em] leading-relaxed text-paper/70 lg:mx-auto">{s.text}</p>
              <span className="mt-4 inline-block rounded-full border-[1.5px] border-[#4a4558] px-3 py-2 text-xs font-bold uppercase tracking-wide text-lime">
                {s.tag}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
