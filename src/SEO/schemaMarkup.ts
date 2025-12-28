import type { AutoBodyShop, WithContext } from "schema-dts";

/**
 * JSON-LD Markup for Search Engines
 */
export const schemaData:WithContext<AutoBodyShop> = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "name": "KB's Kustomz",
    "image": "https://www.yoursite.com/images/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "13845 1650 N Ave",
      "addressLocality": "Wyanet",
      "addressRegion": "IL",
      "postalCode": "61379",
      "addressCountry": "US"
    },
    "telephone": "+1-815-751-7039",
    "priceRange": "$$",
    "areaServed": "Wyanet, IL",
    "url": "https://www.KBsKustomz.vercel.com",
    "sameAs": []
  };