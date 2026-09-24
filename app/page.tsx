import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Paquetes } from "@/components/site/paquetes";
import { Portafolio } from "@/components/site/portafolio";
import { Proceso } from "@/components/site/proceso";
import { Negocios } from "@/components/site/negocios";
import {
  QuienesSomos,
  CtaFinal,
  Colaboradores,
  Footer,
} from "@/components/site/secciones-finales";
import { Pricing } from "@/components/ui/pricing";
import { planes } from "@/lib/planes";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
