"use client";

import { useEffect, useState } from "react";
import { Logo } from "./logo";
import { whatsappLink } from "@/lib/site-config";

const NAV = [
  { id: "paquetes", label: "Paquetes" },
  { id: "planes", label: "Planes" },
  { id: "portafolio", label: "Portafolio" },
  { id: "proceso", label: "Cómo trabajamos" },
  { id: "quienes-somos", label: "Quiénes somos" },
  { id: "colaboradores", label: "Colaboradores" },
];

export function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // En computadora, el menú se oculta en el inicio y aparece al bajar.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Resalta la sección que se está viendo (scrollspy).
  useEffect(() => {
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Cierra el menú del celular con la tecla Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const cerrarMenu = () => setMenuOpen(false);

  const clases = ["nx-header", visible && "is-visible", menuOpen && "is-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={clases}>
      <div className="nx-wrap nx-header-wrap">
        <div className="nx-header-pill">
          <a href="#inicio" className="nx-logo" aria-label="Neoesis DEVS®, ir al inicio" onClick={cerrarMenu}>
            <Logo gradientId="nx-grad-header" />
          </a>

          <nav className="nx-nav" aria-label="Principal">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nx-header-actions">
            <a
              className="nx-btn nx-btn-whatsapp nx-btn-small nx-header-cta"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Quiero mi web
            </a>

            {/* Botón de menú (solo en celulares y tablets) */}
            <button
              type="button"
              className="nx-menu-btn"
              aria-expanded={menuOpen}
              aria-controls="nx-mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="nx-menu-icon" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {/* Menú desplegable del celular */}
        <nav
          id="nx-mobile-menu"
          className={menuOpen ? "nx-mobile-menu is-open" : "nx-mobile-menu"}
          aria-label="Menú del celular"
          inert={!menuOpen}
        >
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "nx-mobile-link is-active" : "nx-mobile-link"}
              onClick={cerrarMenu}
            >
              {item.label}
            </a>
          ))}
          <a href="/preguntas-frecuentes" className="nx-mobile-link" onClick={cerrarMenu}>
            Preguntas frecuentes
          </a>
          <a
            className="nx-btn nx-btn-whatsapp"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={cerrarMenu}
          >
            Quiero mi web
          </a>
        </nav>
      </div>
    </header>
  );
}
