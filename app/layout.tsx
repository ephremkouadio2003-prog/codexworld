import type { Metadata } from "next";
import { Archivo_Black, Inter } from "next/font/google";
import { founders, site } from "@/content/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo_Black({
  variable: "--font-archivo",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
  keywords: [
    "agence de développement",
    "création de site web",
    "application mobile",
    "SaaS",
    "e-commerce",
    "UI/UX design",
    "Codexworld",
  ],
  authors: founders.map((f) => ({ name: f.name })),
  openGraph: {
    siteName: site.name,
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
