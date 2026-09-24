"use client";

import { useMemo, type MouseEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useReducedMotion } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

type Negocio = {
  titulo: string;
  texto: string;
  icono: LucideIcon;
  ancho?: boolean; // tarjeta más ancha, para dar ritmo al carrusel
};

const NEGOCIOS: Negocio[] = [
  { titulo: "Restaurantes y cafés", texto: "Menú, ubicación y reservas a un mensaje de distancia.", icono: UtensilsCrossed },
  { titulo: "Tiendas y emprendimientos", texto: "Muestra tu catálogo y recibe pedidos por WhatsApp.", icono: ShoppingBag, ancho: true },
  { titulo: "Profesionales independientes", texto: "Una página que respalda tu trabajo y facilita que te contraten.", icono: Briefcase },
  { titulo: "Eventos y lanzamientos", texto: "Toda la información importante en un solo lugar, lista a tiempo.", icono: CalendarDays, ancho: true },
  { titulo: "Servicios locales", texto: "Que te encuentren, entiendan qué ofreces y te escriban.", icono: MapPin },
  { titulo: "Proyectos personales", texto: "Ideal para dar el primer paso de tu marca en internet.", icono: Sparkles, ancho: true },
];

// Se repite la lista para que el carrusel infinito funcione en pantallas muy anchas.
const SLIDES = [...NEGOCIOS, ...NEGOCIOS];

export function Negocios() {
  const reduceMotion = useReducedMotion();

  const plugins = useMemo(
    () =>
      reduceMotion
        ? []
        : [
            AutoScroll({
              speed: 1,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              startDelay: 100,
            }),
          ],
    [reduceMotion]
  );

  const [emblaRef] = useEmblaCarousel({ loop: true, dragFree: true }, plugins);

  // Posición del cursor dentro de la tarjeta, para la luz
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <section id="negocios" className="nx-section">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Para el tipo de negocio que tengas</h2>
          <p>Adaptamos el diseño y el mensaje a lo que tú vendes.</p>
        </div>
      </div>

      <div className="nx-marquee" ref={emblaRef}>
        <div className="nx-marquee-track">
          {SLIDES.map(({ titulo, texto, icono: Icono, ancho }, i) => (
            <article
              key={`${titulo}-${i}`}
              className={ancho ? "nx-slide nx-slide-wide" : "nx-slide"}
              onMouseMove={handleMouseMove}
              aria-hidden={i >= NEGOCIOS.length ? true : undefined}
            >
              <div className="nx-slide-icon">
                <Icono aria-hidden="true" />
              </div>
              <h3>{titulo}</h3>
              <p>{texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
