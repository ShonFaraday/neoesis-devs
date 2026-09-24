import type { CSSProperties } from "react";
import { GlowCard } from "@/components/ui/spotlight-card";

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
            Este es nuestro primer proyecto. A partir de aquí iremos sumando cada página que
            construyamos.
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

          <GlowCard
            customSize
            glowColor="cian"
            className="nx-pack nx-work nx-work-soon"
            style={ESTILO_PROXIMAMENTE}
          >
            <div className="nx-tag nx-tag-muted">Proyecto 02</div>
            <h3>Próximamente</h3>
            <p>Estamos trabajando en el siguiente proyecto. Vuelve pronto para verlo aquí.</p>
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
