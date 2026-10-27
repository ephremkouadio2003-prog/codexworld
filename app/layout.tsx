import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  themeColor: "#141218",
  width: "device-width",
  initialScale: 1,
};

// Titre de l'accueil : mot-clé principal + ville, sous 70 caractères.
const homeTitle = `${site.name} · Agence web à Abidjan — Sites internet, applis & SaaS`;

// Code de vérification Google Search Console (balise <meta name="google-site-verification">).
// À définir sur Vercel : NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxx (voir README).
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    // Les pages enfants (services, zones, mentions légales) reçoivent le suffixe.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: {
    canonical: "/",
    languages: {
      // Site en français, destiné à la Côte d'Ivoire, à l'Afrique francophone
      // et à l'international : une seule version, déclarée comme défaut.
      fr: "/",
      "fr-CI": "/",
      "x-default": "/",
    },
  },
  keywords: [
    "agence web Abidjan",
    "agence web Côte d'Ivoire",
    "agence digitale Abidjan",
    "création site internet Abidjan",
    "création site web Côte d'Ivoire",
    "développement application mobile Abidjan",
    "développement application mobile Afrique",
    "agence développement web Afrique francophone",
    "site e-commerce Mobile Money",
    "plateforme SaaS Afrique",
    "développeur Next.js React Native Abidjan",
    "agence web francophone international",
    "UI/UX design",
    "Peace Agency",
    "Codexworld",
  ],
  authors: founders.map((f) => ({ name: f.name, url: site.url })),
  creator: site.name,
  publisher: site.name,
  category: "technology",
  classification: "Agence de développement web et mobile",
  formatDetection: { telephone: true, email: true, address: true },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    siteName: site.name,
    url: "/",
    title: homeTitle,
    description: site.description,
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["fr_CI", "fr_SN", "fr_CM", "fr_BE", "fr_CA", "en_US"],
    countryName: site.address.country,
    emails: [site.email],
    phoneNumbers: [site.phone],
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: site.description,
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
  other: {
    // Balises de géolocalisation (référencement local).
    "geo.region": `${site.address.countryCode}-AB`,
    "geo.placename": site.address.locality,
    "geo.position": `${site.address.lat};${site.address.lng}`,
    ICBM: `${site.address.lat}, ${site.address.lng}`,
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
