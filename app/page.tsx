import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/seo";
import { WHATSAPP_DISPLAY } from "@/lib/site-config";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { VideoDemo } from "@/components/site/video-demo";
import { Paquetes } from "@/components/site/paquetes";
import { Portafolio } from "@/components/site/portafolio";
import { Proceso } from "@/components/site/proceso";
import { Negocios } from "@/components/site/negocios";
import { QuienesSomos, CtaFinal, Colaboradores } from "@/components/site/secciones-finales";
import { Footer } from "@/components/site/footer";
import { Pricing } from "@/components/ui/pricing";
import { planes } from "@/lib/planes";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Neoesis DEVS®",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  },
};

// Datos estructurados para Google (tipo de negocio, contacto y zona de atención)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Neoesis DEVS",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image.png`,
  description: SITE_DESCRIPTION,
  telephone: WHATSAPP_DISPLAY.replace(/\s/g, ""),
  address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
  areaServed: { "@type": "City", name: "Lima" },
  priceRange: "US$ 190 - US$ 310+",
  currenciesAccepted: "USD, PEN",
  paymentAccepted: "Yape, Plin, transferencia bancaria",
  founder: [
    { "@type": "Person", name: "José Sanoja" },
    { "@type": "Person", name: "Angel Figueroa" },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <VideoDemo />
        <Paquetes />
        <div className="nx-section-alt nx-planes-bg">
          <div className="nx-planes-bg-layer" aria-hidden="true" />
          <div className="relative z-10">
            <Pricing
              plans={planes}
              title="¿Ya adquiriste un sitio web con nosotros?"
              description={
                "¡Selecciona un plan de mantenimiento!\nMantén tu página siempre al día, con soporte directo por WhatsApp."
              }
            />
          </div>
        </div>
        <Portafolio />
        <Proceso />
        <Negocios />
        <QuienesSomos />
        <CtaFinal />
        <Colaboradores />
      </main>
      <Footer />
    </>
  );
}
