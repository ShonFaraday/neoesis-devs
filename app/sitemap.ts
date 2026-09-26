import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Mapa del sitio para Google: se publica en /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/cotizar`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/preguntas-frecuentes`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/terminos`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacidad`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
