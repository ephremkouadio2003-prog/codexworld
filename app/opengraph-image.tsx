import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Image affichée quand le lien du site est partagé (WhatsApp, LinkedIn, X…).
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const archivo = await readFile(join(process.cwd(), "assets/ArchivoBlack-Regular.ttf"));
const mark = await readFile(join(process.cwd(), "public/img/logo-mark-white.png"));
const word = await readFile(join(process.cwd(), "public/img/logo-word-white.png"));
const markSrc = `data:image/png;base64,${mark.toString("base64")}`;
const wordSrc = `data:image/png;base64,${word.toString("base64")}`;

export default async function Image() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={markSrc} width={134} height={107} alt="" />
          <img src={wordSrc} width={290} height={48} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, lineHeight: 1, letterSpacing: -2 }}>
          <span>SITES WEB,</span>
          <span>APPLIS MOBILES</span>
          <span style={{ color: "#c8f03d" }}>& PLATEFORMES SAAS</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
          <span>Agence de développement sur mesure</span>
          <span style={{ background: "#c8f03d", color: "#141218", padding: "8px 24px", borderRadius: 999 }}>
            Parlons de votre projet →
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Archivo Black", data: archivo, style: "normal", weight: 400 }],
    },
  );
}
