// Paquetes de diseño de páginas (pago único por el diseño).
const PAQUETES = [
  {
    nombre: "Landing sencilla",
    precio: "S/ 500 – 600",
    nota: "Pago único por el diseño",
    descripcion: "Ideal para empezar con una presencia simple y directa en internet.",
    incluye: [
      "Una página, diseño a medida",
      "Botón directo a WhatsApp",
      "Se ve bien en cualquier pantalla",
      "Publicación incluida",
    ],
    destacado: false,
  },
  {
    nombre: "Landing profesional",
    precio: "Desde S/ 800",
    nota: "Según lo que necesite tu negocio",
    descripcion: "Un diseño moderno, más completo y organizado.",
    incluye: [
      "Todo lo de la landing sencilla",
      "Estructura en varias secciones",
      "Detalles animados e interactivos",
      "Mantenimiento mensual opcional",
    ],
    destacado: true,
  },
  {
    nombre: "Sistemas a tu medida",
    precio: "A cotizar",
    nota: "Según el alcance del proyecto",
    descripcion: "Para negocios que necesitan algo más que una landing page.",
    incluye: [
      "Panel de administración",
      "Base de datos propia",
      "Control de inventario y pedidos",
      "Pensado para negocios en crecimiento",
    ],
    destacado: false,
  },
];

export function Paquetes() {
  return (
    <section id="paquetes" className="nx-section">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Nuestros paquetes</h2>
          <p>
            Elige según el tamaño de tu negocio; siempre puedes empezar simple y crecer después.
          </p>
        </div>

        <div className="nx-grid">
          {PAQUETES.map((p) => (
            <article
              key={p.nombre}
              className={p.destacado ? "nx-card nx-plan-highlight" : "nx-card"}
            >
              {p.destacado && <div className="nx-badge">Premium</div>}
              <h3>{p.nombre}</h3>
              <p className="nx-plan-price">{p.precio}</p>
              <p className="nx-plan-price-note">{p.nota}</p>
              <p className="nx-plan-desc">{p.descripcion}</p>
              <ul className="nx-list">
                {p.incluye.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
