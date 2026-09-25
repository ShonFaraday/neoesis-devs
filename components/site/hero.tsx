"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import MovingGrid from "@/components/ui/hyper-grid";
import { AnimatedLogo } from "./animated-logo";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappLink } from "@/lib/site-config";

export function Hero() {
  const reduceMotion = useReducedMotion();

  // Lleva a la sección de paquetes (con el efecto warp si está permitido).
  const irAPaquetes = (warp: () => boolean) => {
    const destino = () =>
      document.getElementById("paquetes")?.scrollIntoView({ behavior: "smooth" });

    if (reduceMotion) {
      destino();
      return;
    }
    if (warp()) setTimeout(destino, 1100);
  };

  return (
    <section id="inicio">
      <MovingGrid className="min-h-[100svh] py-24">
        {({ warp, isWarping }) => (
          <>
            {/* Logo con iluminación */}
            <div className="nx-rise flex flex-col items-center" style={{ "--d": "0.5s" } as CSSProperties}>
              <div className="nx-hero-logo-wrap">
                <div className="nx-hero-logo-halo" aria-hidden="true" />
                <AnimatedLogo />
              </div>

              <div className="mt-10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#e07bff] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#9d74ff]" />
                </span>
                <span className="text-xs font-semibold tracking-wide text-[#e6dcff]">
                  Aceptando nuevos proyectos
                </span>
              </div>

              <h1 className="pb-2 text-5xl font-semibold tracking-tighter drop-shadow-2xl sm:text-7xl lg:text-8xl">
                <span className="bg-gradient-to-b from-white to-[#d9ccff] bg-clip-text text-transparent">
                  Neoesis
                </span>{" "}
                <span className="nx-gradient-text">DEVS</span>
                <sup className="text-[0.3em] text-[#a8a1c4]">®</sup>
              </h1>
            </div>

            <p
              className="nx-rise mx-auto max-w-2xl text-lg leading-relaxed text-[#a8a1c4] md:text-xl"
              style={{ "--d": "0.7s" } as CSSProperties}
            >
              Diseñamos y publicamos páginas web rápidas y claras, hechas para que quien las visita
              entienda tu negocio en segundos y te escriba directo por WhatsApp.
            </p>

            <div
              className="nx-rise flex flex-wrap items-center justify-center gap-4 pt-6"
              style={{ "--d": "0.9s" } as CSSProperties}
            >
              {/* Botón principal con efecto warp */}
              <button
                type="button"
                onClick={() => irAPaquetes(warp)}
                disabled={isWarping}
                className="group relative inline-flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d74ff]"
              >
                <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-r from-[#7c4dff] to-[#e07bff] opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60" />
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-[#0c0915]/70 px-8 py-4 shadow-2xl backdrop-blur-xl"
                >
                  <span className="relative z-10 text-lg font-semibold tracking-tight text-white">
                    Ver paquetes
                  </span>
                  <svg
                    className="relative z-10 h-5 w-5 text-[#c9b3ff] transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 z-0 -translate-x-full animate-[nx-shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </motion.div>
              </button>

              <a
                className="nx-btn nx-btn-whatsapp nx-btn-lg"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Escríbenos por WhatsApp
              </a>
            </div>

            <p className="nx-rise text-sm text-[#a8a1c4]/80" style={{ "--d": "1.1s" } as CSSProperties}>
              Esta misma página es un ejemplo de lo que podemos construir para ti.
            </p>
          </>
        )}
      </MovingGrid>
    </section>
  );
}
