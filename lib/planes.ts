import type { PricingPlan } from "@/components/ui/pricing";

// Planes de servicio y mantenimiento mensual.
// Para cambiar precios o textos, edita solo este archivo.
export const planes: PricingPlan[] = [
  {
    name: "ECO",
    monthlyPrice: 70,
    yearlyPrice: 504,
    features: [
      "Hasta 4 horas de trabajo por semana, las 4 semanas del mes",
      "Actualización de datos",
      "Cambios de tono y color",
      "Atención a tus peticiones dentro del diseño actual",
    ],
    description:
      "No incluye rediseño, cambios totales ni nuevas secciones fuera del formato ya creado.",
    buttonText: "Elegir plan ECO",
    isPopular: false,
  },
  {
    name: "PREMIUM",
    monthlyPrice: 140,
    yearlyPrice: 1008,
    features: [
      "Hasta 6 horas de trabajo por semana, las 4 semanas del mes",
      "Todo lo incluido en el plan ECO",
      "Rediseño de tu página",
      "Nuevas secciones y funcionalidades",
      "Cambios más radicales a pedido",
    ],
    description:
      "Los cambios de mayor complejidad tienen un costo adicional según el pedido.",
    buttonText: "Elegir plan PREMIUM",
    isPopular: true,
  },
  {
    name: "CUSTOMIZADO",
    monthlyPrice: null,
    yearlyPrice: null,
    priceLabel: "A medida",
    features: [
      "Sistemas de facturación",
      "Tiendas online (e-commerce)",
      "Paneles de administración y base de datos",
      "Control de inventario y pedidos",
      "Desarrollos específicos para tu negocio",
    ],
    description: "El presupuesto depende del alcance de tu proyecto.",
    buttonText: "Cotiza ahora",
    isPopular: false,
  },
];
