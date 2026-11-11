/* eslint-disable @next/next/no-img-element -- ImageResponse (Satori) n'accepte que <img>, pas next/image. */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image de partage (WhatsApp, LinkedIn, Facebook, X…) aux couleurs de la marque.
// Utilisée par tous les fichiers opengraph-image.tsx du site.
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const assets = Promise.all([
  readFile(join(process.cwd(), "assets/ArchivoBlack-Regular.ttf")),
  readFile(join(process.cwd(), "public/img/logo-mark-white.png")),
  readFile(join(process.cwd(), "public/img/logo-word-white.png")),
]);

type Props = {
  /** Petite ligne au-dessus du titre (ex. « Services · Abidjan »). */
  eyebrow?: string;
  /** Titre principal ; la dernière ligne est mise en vert. */
  lines: string[];
  footer?: string;
};

export async function renderOg({ eyebrow, lines, footer = "Agence web & mobile · Abidjan, Côte d'Ivoire" }: Props) {
  const [font, mark, word] = await assets;
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
  const wordSrc = `data:image/png;base64,${word.toString("base64")}`;
  const longest = Math.max(...lines.map((l) => l.length));
  const fontSize = longest > 22 ? 56 : longest > 16 ? 64 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#5b3df5",
          color: "#efeee9",
          padding: "64px 72px",
          fontFamily: "Archivo Black",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <img src={markSrc} width={110} height={88} alt="" />
            <img src={wordSrc} width={240} height={40} alt="" />
          </div>
          {eyebrow && (
            <span style={{ fontSize: 22, color: "#c8f03d", textTransform: "uppercase", letterSpacing: 1 }}>
              {eyebrow}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize, lineHeight: 1, letterSpacing: -2 }}>
          {lines.map((l, i) => (
            <span key={i} style={{ color: i === lines.length - 1 ? "#c8f03d" : "#efeee9", textTransform: "uppercase" }}>
              {l}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
          <span>{footer}</span>
          <span style={{ background: "#c8f03d", color: "#141218", padding: "8px 24px", borderRadius: 999 }}>
            codexworld.site
          </span>
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Archivo Black", data: font, style: "normal", weight: 400 }] },
  );
}

/** Coupe un titre en lignes d'environ `max` caractères, sans couper les mots. */
export function splitLines(text: string, max = 20, maxLines = 4) {
  const out: string[] = [];
  for (const w of text.split(/\s+/)) {
    const last = out[out.length - 1];
    if (last && (last + " " + w).length <= max) out[out.length - 1] = last + " " + w;
    else out.push(w);
  }
  if (out.length > maxLines) {
    const head = out.slice(0, maxLines - 1);
    return [...head, out.slice(maxLines - 1).join(" ")];
  }
  return out;
}
