import Link from "next/link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { BRAND_NAME, whatsappLink } from "@/lib/site-config";
import { FAQ_SISTEMAS, RUBROS, SEGURIDAD, SISTEMAS, mensajeSistema } from "@/lib/sistemas";

export function Sistemas() {
  return (
    <section id="sistemas" className="nx-section">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <span className="nx-eyebrow">Más que páginas web</span>
          <h2>Sistemas a medida para tu negocio</h2>
          <p>
            Cuando una página ya no alcanza, construimos la herramienta que te falta. Empieza por el
            problema que quieres resolver:
          </p>
        </div>

        {/* Rubros con los que trabajamos */}
        <ul className="nx-rubros" aria-label="Rubros con los que trabajamos">
          {RUBROS.map(({ nombre, icono: Icono }) => (
            <li key={nombre} className="nx-rubro">
              <Icono aria-hidden="true" />
              {nombre}
            </li>
          ))}
        </ul>

        {/* Un problema, un sistema */}
        <div className="nx-grid nx-sys-grid">
          {SISTEMAS.map((s) => {
            const Icono = s.icono;
            return (
              <article key={s.id} className="nx-card nx-sys-card">
                <p className="nx-sys-problema">{s.problema}</p>
                <div className="nx-sys-head">
                  <span className="nx-sys-icon">
                    <Icono aria-hidden="true" />
                  </span>
                  <h3>{s.nombre}</h3>
                </div>
                <p className="nx-sys-desc">{s.descripcion}</p>
                <ul className="nx-list">
                  {s.incluye.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a
                  className="nx-btn nx-btn-ghost nx-btn-small nx-sys-cta"
                  href={whatsappLink(mensajeSistema(s))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  Consultar este sistema
                </a>
              </article>
            );
          })}
        </div>

        <ConfianzaSistemas />

        <div className="nx-sys-actions">
          <Link href="/cotizar?paquete=sistema" className="nx-btn nx-btn-primary">
            Cotizar mi sistema <span aria-hidden="true">→</span>
          </Link>
          <Link href="/sistemas" className="nx-btn nx-btn-ghost">
            Ver precios, tiempos y detalle
          </Link>
        </div>
        <p className="nx-sys-foot">
          ¿Tu negocio necesita algo distinto?{" "}
          <a
            href={whatsappLink(`Hola ${BRAND_NAME}, quiero cotizar un sistema a medida para mi negocio`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cuéntanos qué quieres gestionar
          </a>{" "}
          y te proponemos una solución.
        </p>
      </div>
    </section>
  );
}

// Bloque de confianza y seguridad (inicio y /sistemas)
export function ConfianzaSistemas() {
  return (
    <div className="nx-sys-trust">
      <div className="nx-sys-trust-head">
        <h3>Tu información, en buenas manos</h3>
        <p>Lo que cuida cada sistema que entregamos.</p>
      </div>
      <ul className="nx-sys-trust-grid">
        {SEGURIDAD.map(({ titulo, texto, icono: Icono }) => (
          <li key={titulo}>
            <Icono aria-hidden="true" />
            <div>
              <strong>{titulo}</strong>
              <span>{texto}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FaqSistemas() {
  return (
    <section id="faq-sistemas" className="nx-section nx-section-alt">
      <div className="nx-wrap nx-faq-home">
        <div className="nx-section-head">
          <h2>Preguntas frecuentes sobre sistemas</h2>
          <p>
            Lo que más nos preguntan antes de empezar. ¿Dudas sobre páginas web? Revisa todas las{" "}
            <Link href="/preguntas-frecuentes">preguntas frecuentes</Link>.
          </p>
        </div>
        <div className="nx-faq">
          {FAQ_SISTEMAS.map((item) => (
            <details key={item.p}>
              <summary>{item.p}</summary>
              <div className="nx-faq-answer">{item.r}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
