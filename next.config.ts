import type { NextConfig } from "next";

// --- Sécurité : en-têtes HTTP ---------------------------------------------
// Politique de sécurité du contenu (CSP). 'unsafe-inline' sur script/style est
// nécessaire tant que Next.js injecte des scripts/styles inline sans nonce ;
// le site étant statique, le risque XSS résiduel est faible. On autorise
// vercel.live (barre de feedback) et son websocket Pusher pour ne pas casser
// les déploiements de prévisualisation.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://vercel.live",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://vercel.live wss://ws-us3.pusher.com",
  "frame-src 'self' https://vercel.live",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
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
