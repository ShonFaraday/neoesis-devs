import Link from "next/link";
import { Logo } from "./logo";
import { WhatsAppIcon } from "./whatsapp-icon";
import { CITY, CONTACT_EMAIL, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/site-config";

// Los enlaces usan "/#seccion" para que también funcionen desde las páginas legales.
const SECCIONES = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#paquetes", label: "Paquetes" },
  { href: "/#planes", label: "Planes de mantenimiento" },
  { href: "/#portafolio", label: "Portafolio" },
  { href: "/#proceso", label: "Cómo trabajamos" },
  { href: "/#negocios", label: "Tipos de negocio" },
  { href: "/#quienes-somos", label: "Quiénes somos" },
  { href: "/#colaboradores", label: "Colaboradores" },
];

const INFO = [
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/privacidad", label: "Política de privacidad" },
];

export function Footer() {
  return (
    <footer className="nx-footer">
      <div className="nx-wrap nx-footer-grid">
        <div className="nx-footer-brand">
          <Link href="/#inicio" className="nx-logo" aria-label="Neoesis DEVS®, ir al inicio">
            <Logo gradientId="nx-grad-footer" />
          </Link>
          <p>
            Diseñamos y publicamos páginas web claras y rápidas, para que tu negocio reciba
            clientes directo por WhatsApp.
          </p>
          <a
            className="nx-btn nx-btn-whatsapp nx-btn-small"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Escríbenos
          </a>
        </div>

        <nav className="nx-footer-col" aria-label="Secciones">
          <h3>Secciones</h3>
          <ul>
            {SECCIONES.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="nx-footer-col" aria-label="Información">
          <h3>Información</h3>
          <ul>
            {INFO.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nx-footer-col">
          <h3>Contacto</h3>
          <ul>
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                WhatsApp: {WHATSAPP_DISPLAY}
              </a>
            </li>
            {CONTACT_EMAIL && (
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              </li>
            )}
            <li>{CITY}</li>
            <li>Pagos con Yape, Plin y transferencia bancaria</li>
          </ul>
        </div>
      </div>

      <div className="nx-wrap nx-footer-bottom">
        <p>© {new Date().getFullYear()} Neoesis DEVS®. Todos los derechos reservados.</p>
        <p>Hecho en {CITY}</p>
      </div>
    </footer>
  );
}
