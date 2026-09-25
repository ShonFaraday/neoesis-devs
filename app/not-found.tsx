import Link from "next/link";
import { SiteTopBar } from "@/components/site/top-bar";
import { Footer } from "@/components/site/footer";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { NODES, EDGES, BRAND_VIOLET, BRAND_ORCHID, BRAND_LIGHT } from "@/components/site/logo";
import { whatsappLink } from "@/lib/site-config";

// Página 404: la red del logo con su último nodo "desconectado".
const CONEXIONES_ROTAS = EDGES.filter(([a, b]) => !(a === "R2" && b === "R1"));

export default function NotFound() {
  return (
    <>
      <SiteTopBar />

      <main className="nx-404">
        <div className="nx-404-glow" aria-hidden="true" />

        <div className="nx-wrap nx-404-inner">
          <svg viewBox="0 -10 110 110" className="nx-404-net" aria-hidden="true">
            <defs>
              <linearGradient id="nx-404-grad" gradientUnits="userSpaceOnUse" x1="18" y1="0" x2="82" y2="0">
                <stop offset="0" stopColor={BRAND_VIOLET} />
                <stop offset="1" stopColor={BRAND_ORCHID} />
              </linearGradient>
            </defs>

            <g stroke="url(#nx-404-grad)" strokeWidth="3.4" strokeLinecap="round">
              {CONEXIONES_ROTAS.map(([a, b]) => (
                <line
                  key={`${a}-${b}`}
                  x1={NODES[a][0]}
                  y1={NODES[a][1]}
                  x2={NODES[b][0]}
                  y2={NODES[b][1]}
                />
              ))}
            </g>

            {/* Conexión rota que parpadea */}
            <line
              className="nx-404-spark"
              x1={NODES.R2[0]}
              y1={NODES.R2[1]}
              x2={NODES.R2[0] + 6}
              y2={NODES.R2[1] - 14}
              stroke={BRAND_ORCHID}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="2 4"
            />

            <g fill="url(#nx-404-grad)">
              {(Object.keys(NODES) as (keyof typeof NODES)[])
                .filter((id) => id !== "R1")
                .map((id) => (
                  <circle key={id} cx={NODES[id][0]} cy={NODES[id][1]} r="5" />
                ))}
            </g>

            {/* Nodo luminoso que se alejó de la red */}
            <g className="nx-404-lost">
              <circle cx={NODES.R1[0] + 14} cy={NODES.R1[1] - 8} r="7" fill={BRAND_LIGHT} />
            </g>
          </svg>

          <p className="nx-404-code">404</p>
          <h1>Esta página se desconectó de la red</h1>
          <p className="nx-404-text">
            La dirección que buscas no existe o fue movida. Vuelve al inicio o escríbenos si
            necesitas ayuda.
          </p>

          <div className="nx-404-actions">
            <Link href="/" className="nx-btn nx-btn-ghost">
              Volver al inicio
            </Link>
            <a
              className="nx-btn nx-btn-whatsapp"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
