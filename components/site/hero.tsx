"use client";

import { useRef, type MouseEvent } from "react";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappLink } from "@/lib/site-config";

// Hero migrado de la versión HTML. Se reemplazará por el nuevo diseño de inicio.
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Brillo que sigue al mouse (solo en dispositivos con mouse).
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <section id="inicio" ref={ref} className="nx-hero" onMouseMove={handleMouseMove}>
      <div className="nx-hero-glow" aria-hidden="true" />
      <div className="nx-hero-cursor-glow" aria-hidden="true" />

      <div className="nx-wrap">
        <div className="nx-hero-inner">
          <p className="nx-eyebrow">Diseño y publicación de páginas web</p>
          <h1 className="nx-hero-title">Tu negocio, en una sola página que sí convierte.</h1>
          <p className="nx-hero-sub">
            Diseñamos y publicamos páginas rápidas y claras, hechas para que quien la visita
            entienda tu negocio en segundos y te escriba directo por WhatsApp.
          </p>

          <div className="nx-hero-cta">
            <a
              className="nx-btn nx-btn-whatsapp"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Escríbenos por WhatsApp
            </a>
            <a className="nx-btn nx-btn-ghost" href="#paquetes">
              Ver qué hacemos
            </a>
          </div>

          <p className="nx-hero-note">
            Esta misma página es un ejemplo de lo que podemos construir para ti.
          </p>
        </div>
      </div>
    </section>
  );
}
