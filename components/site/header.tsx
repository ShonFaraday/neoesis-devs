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

  // Resalta en el menú la sección que se está viendo (scrollspy).
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

  return (
    <header className="nx-header">
      <div className="nx-wrap nx-header-wrap">
        <div className="nx-header-pill">
          <a href="#inicio" className="nx-logo" aria-label="Neoesis DEVS®, ir al inicio">
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

          <a
            className="nx-btn nx-btn-whatsapp nx-btn-small"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            Quiero mi web
          </a>
        </div>
      </div>
    </header>
  );
}
