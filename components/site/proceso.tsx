"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const PASOS = [
  { titulo: "Nos cuentas tu negocio", texto: "Por WhatsApp, así de simple: qué vendes y qué necesitas." },
  { titulo: "Diseñamos tu página", texto: "Armamos una propuesta a partir de lo que nos contaste." },
  { titulo: "La revisamos juntos", texto: "Ajustamos textos, colores o secciones hasta que quede como quieres." },
  { titulo: "La publicamos", texto: "Queda en línea y lista para recibir a tus clientes." },
];

const ULTIMO = PASOS.length - 1;

const puedeHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

export function Proceso() {
  // active: último paso iluminado. base: el anterior, para encadenar la animación.
  const [estado, setEstado] = useState({ active: -1, base: -1 });
  const listRef = useRef<HTMLOListElement>(null);

  const iluminarHasta = (n: number) =>
    setEstado((prev) => (prev.active === n ? prev : { active: n, base: prev.active }));

  // En celulares (sin cursor) se ilumina solo al aparecer en pantalla.
  useEffect(() => {
    if (puedeHover()) return;
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEstado((prev) => ({ active: ULTIMO, base: prev.active }));
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proceso" className="nx-section nx-section-alt">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Cómo trabajamos</h2>
          <p>Cuatro pasos, sin vueltas, desde que nos escribes hasta que tu página está en línea.</p>
        </div>

        <ol
          ref={listRef}
          className="nx-flow"
          style={{ "--base": estado.base } as CSSProperties}
          onMouseLeave={() => puedeHover() && iluminarHasta(-1)}
        >
          {PASOS.map((paso, i) => {
            const clases = [
              "nx-flow-step",
              i <= estado.active && "node-lit",
              i < estado.active && "line-lit",
              i === ULTIMO && "is-final",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <li
                key={paso.titulo}
                className={clases}
                style={{ "--i": i } as CSSProperties}
                onMouseEnter={() => puedeHover() && iluminarHasta(i)}
              >
                {i < ULTIMO && (
                  <span className="nx-flow-line" aria-hidden="true">
                    <span className="nx-flow-pulse" />
                  </span>
                )}
                <span className="nx-flow-node">{i + 1}</span>
                <h3>{paso.titulo}</h3>
                <p>{paso.texto}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
