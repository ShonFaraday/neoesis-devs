// Configuración de SEO. Solo se usa en el servidor (metadatos, sitemap, robots).

// Dirección pública del sitio. En Vercel se detecta sola (usa tu dominio propio
// cuando lo conectes). Si quieres fijarla a mano, crea la variable de entorno
// NEXT_PUBLIC_SITE_URL en Vercel, por ejemplo: https://neoesis.pe
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_TITLE = "Neoesis DEVS® | Páginas web y sistemas a medida en Lima, Perú";

export const SITE_DESCRIPTION =
  "Páginas web y sistemas a medida en Lima, Perú: landing pages desde US$ 190, CRM, intranets, inventario, citas y tiendas online para tu negocio. Escríbenos por WhatsApp.";

// Código de verificación de Google Search Console (método "Etiqueta HTML").
// Pega aquí solo el valor de content="...", por ejemplo: "abc123XYZ".
export const GOOGLE_SITE_VERIFICATION = "H6FgnTvAR-00JxkDDKuEJoIyePIm39Omc5KpMhEGthU";
