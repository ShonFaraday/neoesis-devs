import type { CSSProperties } from "react";
import Image from "next/image";
import { GlowCard } from "@/components/ui/spotlight-card";

// Sitio publicado de Mi Mecánico (proyecto de cliente)
const MI_MECANICO_URL = "https://mimecaino.vercel.app/";

// Variante del efecto de luz para el portafolio: tono cian, luz más amplia
// y un interior más iluminado. Las tarjetas "Próximamente" llevan borde punteado.
const ESTILO_BASE = {
  "--size": "300",
  "--bg-spot-opacity": "0.16",
  "--lightness": "62",
  "--backdrop": "hsl(235 40% 10% / 0.6)",
} as CSSProperties;

const ESTILO_PROXIMAMENTE = {
  ...ESTILO_BASE,
  border: "var(--border-size) dashed var(--backup-border)",
} as CSSProperties;

export function Portafolio() {
  return (
    <section id="portafolio" className="nx-section">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Nuestro portafolio</h2>
          <p>
            Proyectos reales, publicados y funcionando. Cada página que construyamos se sumará
            a esta lista.
          </p>
        </div>

        <div className="nx-grid">
          <GlowCard customSize glowColor="cian" className="nx-pack nx-work" style={ESTILO_BASE}>
            <div className="nx-tag nx-tag-cyan">Proyecto 01</div>
            <h3>Neoesis DEVS®</h3>
            <p>La página que estás viendo ahora mismo: nuestra propia carta de presentación.</p>
            <a href="#inicio" className="nx-work-link">
              Ver la página ↑
            </a>
          </GlowCard>

          <GlowCard customSize glowColor="cian" className="nx-pack nx-work nx-work-client" style={ESTILO_BASE}>
            <a
              href={MI_MECANICO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nx-work-cover"
              aria-label="Abrir el sitio de Mi Mecánico en una pestaña nueva"
            >
              <Image
                src="/portafolio/mi-mecanico.jpg"
                alt="Portada del sitio de Mi Mecánico: tu mecánico llega a donde estés"
                width={1200}
                height={630}
                sizes="(max-width: 720px) 100vw, 360px"
              />
              <span className="nx-work-scan" aria-hidden="true" />
              <span className="nx-work-live">
                <span className="nx-work-live-dot" aria-hidden="true" />
                En línea
              </span>
            </a>
            <div className="nx-tag nx-tag-cyan">Proyecto 02 · Cliente</div>
            <h3>Mi Mecánico</h3>
            <p>
              Servicio automotriz multimarca a domicilio o en taller en Lima. Página rápida con
              pedido por WhatsApp, preguntas frecuentes y formulario de servicio.
            </p>
            <a href={MI_MECANICO_URL} target="_blank" rel="noopener noreferrer" className="nx-work-link">
              Visitar el sitio <span aria-hidden="true">↗</span>
            </a>
          </GlowCard>

          <GlowCard
            customSize
            glowColor="cian"
            className="nx-pack nx-work nx-work-soon"
            style={ESTILO_PROXIMAMENTE}
          >
            <div className="nx-tag nx-tag-muted">Proyecto 03</div>
            <h3>Próximamente</h3>
            <p>Cada página que publiquemos para un cliente se sumará a esta lista.</p>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
