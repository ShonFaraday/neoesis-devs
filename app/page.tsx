import { Pricing } from "@/components/ui/pricing";
import { planes } from "@/lib/planes";

// Página temporal: por ahora solo muestra la sección de planes para probarla.
// En los siguientes pasos iremos agregando el resto del sitio.
export default function Home() {
  return (
    <main>
      <Pricing
        plans={planes}
        title="Planes de servicio y mantenimiento"
        description={
          "Mantén tu página siempre al día, con soporte directo por WhatsApp.\nElige el plan que mejor se adapte a tu negocio."
        }
      />
    </main>
  );
}
