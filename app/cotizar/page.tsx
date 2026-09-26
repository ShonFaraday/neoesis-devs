import type { Metadata } from "next";
import { SiteTopBar } from "@/components/site/top-bar";
import { Footer } from "@/components/site/footer";
import { CotizadorClient } from "@/components/cotizador/cotizador-client";

const descripcion =
  "Responde unas preguntas sobre tu negocio y recibe una cotización a medida para tu página web. Rápido, gratis y sin compromiso.";

export const metadata: Metadata = {
  title: "Cotiza tu página web",
  description: descripcion,
  alternates: { canonical: "/cotizar" },
  openGraph: {
    title: "Cotiza tu página web | Neoesis DEVS®",
    description: descripcion,
    url: "/cotizar",
  },
};

export default function CotizarPage() {
  return (
    <>
      <SiteTopBar />
      <main>
        <CotizadorClient />
      </main>
      <Footer />
    </>
  );
}
