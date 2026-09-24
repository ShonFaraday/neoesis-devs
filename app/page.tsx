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
        <div className="nx-section-alt">
          <Pricing
            plans={planes}
            title="Planes de servicio y mantenimiento"
            description={
              "Mantén tu página siempre al día, con soporte directo por WhatsApp.\nElige el plan que mejor se adapte a tu negocio."
            }
          />
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
