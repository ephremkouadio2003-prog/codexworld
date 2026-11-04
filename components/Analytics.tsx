import { GoogleTagManager } from "@next/third-parties/google";

// Mesure d'audience : conteneur Google Tag Manager (qui charge la balise GA4).
// - Chargé uniquement en production Vercel, pour ne pas polluer les
//   statistiques avec le développement local et les prévisualisations.
// - Google Consent Mode v2 : pour les visiteurs de l'UE/EEE, du Royaume-Uni et
//   de la Suisse, les cookies de mesure et de publicité sont refusés par défaut
//   (GA4 reçoit alors des signaux anonymes sans cookie) ; ailleurs, la mesure
//   d'audience est active et la publicité reste refusée.
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-K34LKWB8";
export const ANALYTICS_ENABLED =
  process.env.VERCEL_ENV === "production" || process.env.NEXT_PUBLIC_ANALYTICS === "1";

// Pays soumis au RGPD / UK GDPR / LPD suisse (codes ISO 3166-1 alpha-2).
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "IS", "LI", "NO", "GB", "CH",
];

const consentScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500,region:${JSON.stringify(CONSENT_REGIONS)}});
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'granted'});
`.trim();

export default function Analytics() {
  if (!ANALYTICS_ENABLED) return null;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: consentScript }} />
      <GoogleTagManager gtmId={GTM_ID} />
    </>
  );
}
