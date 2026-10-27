import type { NextConfig } from "next";

// --- Sécurité : en-têtes HTTP ---------------------------------------------
// Next.js injecte des scripts d'hydratation inline dans les pages statiques.
// Un nonce imposerait un rendu dynamique et casserait le prerendering partiel :
// on garde cette seule exception pour les éléments <script>, mais on interdit
// les gestionnaires HTML inline et les URL javascript:. La barre Vercel et son
// websocket ne sont autorisés que sur les déploiements de prévisualisation.
const isVercelPreview = process.env.VERCEL_ENV === "preview";
const isDevelopment = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}${isVercelPreview ? " https://vercel.live" : ""}`,
  "script-src-attr 'none'",
  `style-src 'self' 'unsafe-inline'${isVercelPreview ? " https://vercel.live" : ""}`,
  `img-src 'self' data:${isVercelPreview ? " blob: https://vercel.live https://vercel.com" : ""}`,
  `font-src 'self'${isVercelPreview ? " https://vercel.live https://assets.vercel.com" : ""}`,
  `connect-src 'self'${isVercelPreview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}`,
  `frame-src ${isVercelPreview ? "'self' https://vercel.live" : "'none'"}`,
  `frame-ancestors ${isVercelPreview ? "'self'" : "'none'"}`,
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: isVercelPreview ? "SAMEORIGIN" : "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// Hors production (preview Vercel, dev), on empêche l'indexation par les moteurs.
const isProduction = process.env.VERCEL_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  // N'expose pas la techno via l'en-tête X-Powered-By.
  poweredByHeader: false,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Mise à jour de sécurité appliquée via `next upgrade --agent=security`.
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    const headers = [...securityHeaders];
    if (!isProduction) {
      headers.push({
        key: "X-Robots-Tag",
        value: "noindex, nofollow",
      });
    }
    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
};

export default nextConfig;
