"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import NumberFlow from "@number-flow/react";

import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { BRAND_NAME, whatsappLink } from "@/lib/site-config";

export interface PricingPlan {
  name: string;
  /** Precio mensual en soles. null = plan a cotizar. */
  monthlyPrice: number | null;
  /** Precio anual en soles. null = plan a cotizar. */
  yearlyPrice: number | null;
  /** Texto que reemplaza al precio en planes a cotizar. */
  priceLabel?: string;
  features: string[];
  description: string;
  buttonText: string;
  isPopular: boolean;
}

interface PricingProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

// Arma el mensaje automático de WhatsApp según el plan y la modalidad elegida.
function buildWhatsappMessage(plan: PricingPlan, isMonthly: boolean) {
  const lista = plan.features.map((f) => `• ${f}`).join("\n");

  if (plan.monthlyPrice === null || plan.yearlyPrice === null) {
    return (
      `Hola ${BRAND_NAME}, quiero cotizar el plan ${plan.name}.\n\n` +
      `Me interesa un desarrollo a medida:\n${lista}\n\n` +
      `Les cuento brevemente lo que necesito: `
    );
  }

  const modalidad = isMonthly
    ? `pago mensual (S/ ${plan.monthlyPrice} al mes)`
    : `pago anual (S/ ${plan.yearlyPrice} al año)`;

  return (
    `Hola ${BRAND_NAME}, me interesa contratar el plan ${plan.name} con ${modalidad}.\n\n` +
    `Incluye:\n${lista}\n\n` +
    `¿Me brindan más información para empezar?`
  );
}

export function Pricing({
  plans,
  title = "Planes de servicio y mantenimiento",
  description = "Mantén tu página siempre al día.",
}: PricingProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (checked: boolean) => {
    setIsMonthly(!checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      // OPTIMIZACIÓN: la librería del confeti se descarga solo al activar el pago anual
      import("canvas-confetti").then(({ default: confetti }) => confetti({
        particleCount: 50,
        spread: 60,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: ["#9d74ff", "#e07bff", "#5b3fd6", "#f3f0fb"],
        ticks: 200,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
        shapes: ["circle"],
        disableForReducedMotion: true,
      }));
    }
  };

  return (
    <section id="planes" className="mx-auto max-w-[1120px] px-6 py-24">
      <div className="mb-12 space-y-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
        <p className="text-base whitespace-pre-line text-muted-foreground sm:text-lg">
          {description}
        </p>
      </div>

      {/* Selector mensual / anual */}
      <div className="mb-10 flex items-center justify-center gap-3">
        <span
          className={cn(
            "text-sm font-semibold",
            isMonthly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Mensual
        </span>
        <Switch
          id="pago-anual"
          ref={switchRef}
          checked={!isMonthly}
          onCheckedChange={handleToggle}
        />
        <Label
          htmlFor="pago-anual"
          className={cn(
            "cursor-pointer text-sm font-semibold",
            !isMonthly ? "text-foreground" : "text-muted-foreground"
          )}
        >
          Anual <span className="text-primary">(ahorra 40%)</span>
        </Label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan, index) => {
          const price = isMonthly ? plan.monthlyPrice : plan.yearlyPrice;
          const ahorro =
            plan.monthlyPrice !== null && plan.yearlyPrice !== null
              ? plan.monthlyPrice * 12 - plan.yearlyPrice
              : 0;

          return (
            <motion.div
              key={plan.name}
              initial={{ y: 50, opacity: 1 }}
              whileInView={
                isDesktop
                  ? {
                      y: plan.isPopular ? -20 : 0,
                      opacity: 1,
                      x: index === 2 ? -30 : index === 0 ? 30 : 0,
                      scale: index === 0 || index === 2 ? 0.94 : 1.0,
                    }
                  : { y: 0 }
              }
              viewport={{ once: true }}
              transition={{
                duration: 1.6,
                type: "spring",
                stiffness: 100,
                damping: 30,
                delay: 0.4,
                opacity: { duration: 0.5 },
              }}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-background p-6 text-center",
                plan.isPopular
                  ? "z-10 border-2 border-primary"
                  : "z-0 mt-5 border-border",
                index === 0 && "origin-right",
                index === 2 && "origin-left"
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 flex items-center rounded-tr-xl rounded-bl-xl bg-primary px-2 py-0.5">
                  <Star className="h-4 w-4 fill-current text-primary-foreground" />
                  <span className="ml-1 font-semibold text-primary-foreground">
                    Más popular
                  </span>
                </div>
              )}

              <div className="flex flex-1 flex-col">
                <p className="text-base font-semibold text-muted-foreground">
                  {plan.name}
                </p>

                {/* Precio */}
                <div className="mt-6 flex min-h-[3.5rem] items-center justify-center gap-x-2">
                  {price === null ? (
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {plan.priceLabel ?? "A cotizar"}
                    </span>
                  ) : (
                    <>
                      <span className="text-5xl font-bold tracking-tight text-foreground">
                        <NumberFlow
                          value={price}
                          prefix="S/ "
                          locales="es-PE"
                          format={{ maximumFractionDigits: 0 }}
                          transformTiming={{ duration: 500, easing: "ease-out" }}
                          willChange
                          className="tabular-nums"
                        />
                      </span>
                      <span className="text-sm leading-6 font-semibold tracking-wide text-muted-foreground">
                        / {isMonthly ? "mes" : "año"}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  {price === null
                    ? "Presupuesto según tu proyecto"
                    : isMonthly
                      ? "Facturación mensual"
                      : `Pago anual: ahorras S/ ${ahorro}`}
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>

                <hr className="my-4 w-full" />

                <a
                  href={whatsappLink(buildWhatsappMessage(plan, isMonthly))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "group relative mt-auto w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter",
                    "transform-gpu transition-all duration-300 ease-out hover:bg-primary hover:text-primary-foreground hover:ring-2 hover:ring-primary hover:ring-offset-1",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground"
                  )}
                >
                  {plan.buttonText}
                </a>

                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  {plan.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
