"use client";

import { useRef } from "react";

const NEGOCIOS = [
  { titulo: "Restaurantes y cafés", texto: "Menú, ubicación y reservas a un mensaje de distancia." },
  { titulo: "Tiendas y emprendimientos", texto: "Muestra tu catálogo y recibe pedidos por WhatsApp." },
  { titulo: "Profesionales independientes", texto: "Una página que respalda tu trabajo y facilita que te contraten." },
  { titulo: "Eventos y lanzamientos", texto: "Toda la información importante en un solo lugar, lista a tiempo." },
  { titulo: "Servicios locales", texto: "Que te encuentren, entiendan qué ofreces y te escriban." },
  { titulo: "Proyectos personales", texto: "Ideal para dar el primer paso de tu marca en internet." },
];

export function Negocios() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Mueve el carrusel el ancho de una tarjeta.
  const mover = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".nx-card");
    const step = card ? card.getBoundingClientRect().width + 18 : 280;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="negocios" className="nx-section">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Para el tipo de negocio que tengas</h2>
          <p>Adaptamos el diseño y el mensaje a lo que tú vendes.</p>
        </div>

        <div className="nx-carousel-wrap">
          <button type="button" className="nx-car-btn" aria-label="Anterior" onClick={() => mover(-1)}>
            ‹
          </button>
          <div className="nx-carousel" ref={trackRef}>
            {NEGOCIOS.map((n) => (
              <article key={n.titulo} className="nx-card">
                <h3>{n.titulo}</h3>
                <p>{n.texto}</p>
              </article>
            ))}
          </div>
          <button type="button" className="nx-car-btn" aria-label="Siguiente" onClick={() => mover(1)}>
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
