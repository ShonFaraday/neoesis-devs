import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, ShieldCheck, Wallet } from "lucide-react";
import { SITE_URL } from "@/lib/seo";
import { BRAND_NAME, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site-config";
import {
  CONDICIONES_SISTEMAS, PASOS_SISTEMA, PRECIO_DESDE_SISTEMA, PRECIOS_SISTEMAS, RUBROS, SISTEMAS,
  TIEMPO_SISTEMA, mensajeSistema,
} from "@/lib/sistemas";
import { SiteTopBar } from "@/components/site/top-bar";
import { Footer } from "@/components/site/footer";
import { Proceso } from "@/components/site/proceso";
import { ConfianzaSistemas, FaqSistemas } from "@/components/site/sistemas";
import { MetodosPago } from "@/components/site/metodos-pago";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";
import { GlowCard } from "@/components/ui/spotlight-card";

const titulo = "CRM y sistemas a medida en Lima";
const descripcion =
  "CRM, intranets, control de inventario, citas, portales de clientes y tiendas online a medida para negocios en Lima. Desde US$ 1,000, listos en 3 a 8 semanas.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/sistemas" },
  openGraph: {
    title: `${titulo} | ${BRAND_NAME}`,
    description: descripcion,
    url: "/sistemas",
  },
};

// Datos estructurados del servicio (precio mínimo y zona de atención)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sistemas a medida",
  serviceType: "Desarrollo de CRM, intranets y sistemas de gestión",
  description: descripcion,
  url: `${SITE_URL}/sistemas`,
  areaServed: { "@type": "City", name: "Lima" },
  provider: { "@type": "ProfessionalService", name: "Neoesis DEVS", url: SITE_URL },
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    priceSpecification: { "@type": "PriceSpecification", minPrice: 1000, priceCurrency: "USD" },
  },
};

const DATOS = [
  { icono: Wallet, titulo: `Desde ${PRECIO_DESDE_SISTEMA}`, texto: "Pago por etapas" },
  { icono: CalendarClock, titulo: "3 a 8 semanas", texto: "Según el alcance" },
  { icono: ShieldCheck, titulo: "30 días de garantía", texto: "Tras la entrega" },
];

export default function SistemasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteTopBar />
      <main>
        {/* Presentación */}
        <section className="nx-section nx-sys-hero">
          <div className="nx-wrap">
            <div className="nx-section-head">
              <span className="nx-eyebrow">Sistemas a medida</span>
              <h1>El sistema que tu negocio necesita para dejar el Excel y el cuaderno</h1>
              <p>
                Construimos CRM, intranets, inventarios, agendas y tiendas online pensados para cómo
                trabajas tú. Sin programas genéricos ni funciones que no vas a usar.
              </p>
            </div>

            <ul className="nx-sys-datos">
              {DATOS.map(({ icono: Icono, titulo, texto }) => (
                <li key={titulo}>
                  <Icono aria-hidden="true" />
                  <div>
                    <strong>{titulo}</strong>
                    <span>{texto}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="nx-sys-actions is-left">
              <Link href="/cotizar?paquete=sistema" className="nx-btn nx-btn-primary">
                Cotizar mi sistema <span aria-hidden="true">→</span>
              </Link>
              <a href="#precios" className="nx-btn nx-btn-ghost">
                Ver precios
              </a>
            </div>

            <ul className="nx-rubros nx-rubros-hero" aria-label="Rubros con los que trabajamos">
              {RUBROS.map(({ nombre, icono: Icono }) => (
                <li key={nombre} className="nx-rubro">
                  <Icono aria-hidden="true" />
                  {nombre}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cada tipo de sistema en detalle */}
        <section id="tipos" className="nx-section nx-section-alt">
          <div className="nx-wrap">
            <div className="nx-section-head">
              <h2>¿Qué problema quieres resolver?</h2>
              <p>Estos son los sistemas que más nos piden. Podemos combinarlos en uno solo.</p>
            </div>

            <div className="nx-sys-detalle">
              {SISTEMAS.map((s) => {
                const Icono = s.icono;
                return (
                  <article key={s.id} id={s.id} className="nx-card nx-sys-det">
                    <div className="nx-sys-det-intro">
                      <p className="nx-sys-problema">{s.problema}</p>
                      <div className="nx-sys-head">
                        <span className="nx-sys-icon">
                          <Icono aria-hidden="true" />
                        </span>
                        <h3>{s.nombre}</h3>
                      </div>
                      <p>{s.descripcion}</p>
                      <p className="nx-sys-ideal">{s.ideal}</p>
                    </div>
                    <div className="nx-sys-det-list">
                      <ul className="nx-list">
                        {s.detalle.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                      <a
                        className="nx-btn nx-btn-ghost nx-btn-small"
                        href={whatsappLink(mensajeSistema(s))}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon />
                        Consultar este sistema
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Precios */}
        <section id="precios" className="nx-section">
          <div className="nx-wrap">
            <div className="nx-section-head">
              <h2>Precios de referencia</h2>
              <p>
                El precio depende de la complejidad del sistema y del volumen de datos de tu empresa.
                Te enviamos el monto exacto en una cotización por escrito.
              </p>
            </div>

            <div className="nx-grid nx-pack-grid">
              {PRECIOS_SISTEMAS.map((p) => (
                <GlowCard
                  key={p.nombre}
                  customSize
                  glowColor="violeta"
                  className={p.destacado ? "nx-pack nx-pack-highlight" : "nx-pack"}
                  style={
                    p.destacado
                      ? ({ "--backup-border": "rgba(157, 116, 255, 0.55)" } as CSSProperties)
                      : undefined
                  }
                >
                  {p.destacado && <div className="nx-badge">Recomendado</div>}
                  <h3>{p.nombre}</h3>
                  <p className="nx-plan-price">{p.precio}</p>
                  <p className="nx-plan-price-note">{p.nota}</p>
                  <p className="nx-plan-desc">{p.descripcion}</p>
                  <ul className="nx-list">
                    {p.incluye.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/cotizar?paquete=sistema" className="nx-btn nx-btn-ghost nx-pack-cta">
                    Cotizar mi sistema <span aria-hidden="true">→</span>
                  </Link>
                </GlowCard>
              ))}
            </div>

            <ul className="nx-sys-condiciones">
              {CONDICIONES_SISTEMAS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <MetodosPago />
          </div>
        </section>

        <Proceso
          id="proceso-sistemas"
          titulo="Cómo trabajamos tu sistema"
          descripcion="Construimos contigo, por etapas, para que veas avances desde las primeras semanas."
          pasos={PASOS_SISTEMA}
          nota={
            <>
              Tiempo aproximado: <strong>{TIEMPO_SISTEMA.toLowerCase()}</strong>.
            </>
          }
        />

        <section className="nx-section">
          <div className="nx-wrap">
            <ConfianzaSistemas />
          </div>
        </section>

        <FaqSistemas />

        <section className="nx-cta">
          <div className="nx-wrap">
            <h2>¿Listo para ordenar tu negocio?</h2>
            <p>Cuéntanos cómo trabajas hoy y te proponemos el sistema que necesitas. El diagnóstico es gratis.</p>
            <div className="nx-sys-actions">
              <Link href="/cotizar?paquete=sistema" className="nx-btn nx-btn-primary nx-btn-lg">
                Cotizar mi sistema <span aria-hidden="true">→</span>
              </Link>
              <a
                className="nx-btn nx-btn-whatsapp nx-btn-lg"
                href={whatsappLink(`Hola ${BRAND_NAME}, quiero cotizar un sistema a medida para mi negocio`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
