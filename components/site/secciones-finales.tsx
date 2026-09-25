import { WhatsAppIcon } from "./whatsapp-icon";
import { AboutVisual } from "./about-visual";
import { MetodosPago } from "./metodos-pago";
import { WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site-config";

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="nx-section nx-section-alt">
      <div className="nx-wrap nx-about">
        <div>
          <div className="nx-section-head">
            <h2>Quiénes somos</h2>
          </div>
          <p className="nx-lead">
            Neoesis DEVS® nace de una idea simple: cualquier negocio, sin importar su tamaño,
            merece una presencia en internet clara y bien pensada.
          </p>
          <p className="nx-lead">
            Somos José Sanoja y Angel Figueroa, cofundadores y diseñadores de cada proyecto.
            Diseñamos, construimos y publicamos cada página nosotros mismos, de principio a fin,
            para que tú solo te preocupes de atender a los clientes que te escriban.
          </p>
        </div>
        <AboutVisual />
      </div>
    </section>
  );
}

export function CtaFinal() {
  return (
    <section className="nx-cta">
      <div className="nx-wrap">
        <h2>¿Lista tu idea para tener su página web?</h2>
        <p>Cuéntanos de tu negocio por WhatsApp y te ayudamos a definir cómo se vería.</p>
        <a
          className="nx-btn nx-btn-whatsapp nx-btn-lg"
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          {WHATSAPP_DISPLAY}
        </a>
        <MetodosPago centrado />
      </div>
    </section>
  );
}

const EQUIPO = [
  {
    iniciales: "JS",
    nombre: "José Sanoja",
    rol: "Cofundador y diseñador",
    texto: "Convierte ideas en páginas limpias, rápidas y fáciles de usar.",
    alt: false,
  },
  {
    iniciales: "AF",
    nombre: "Angel Figueroa",
    rol: "Cofundador y diseñador",
    texto: "Diseña cada página desde la mirada de quien la visita por primera vez.",
    alt: true,
  },
];

export function Colaboradores() {
  return (
    <section id="colaboradores" className="nx-section nx-section-alt">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Colaboradores</h2>
          <p>Dos personas, un mismo objetivo: que tu negocio se vea bien en internet.</p>
        </div>

        <div className="nx-grid">
          {EQUIPO.map((m) => (
            <article key={m.nombre} className="nx-card">
              <div className={m.alt ? "nx-avatar nx-avatar-alt" : "nx-avatar"} aria-hidden="true">
                {m.iniciales}
              </div>
              <h3 className="nx-team-name">{m.nombre}</h3>
              <p className="nx-role">{m.rol}</p>
              <p>{m.texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
