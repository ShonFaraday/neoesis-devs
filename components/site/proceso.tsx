const PASOS = [
  { titulo: "Nos cuentas tu negocio", texto: "Por WhatsApp, así de simple: qué vendes y qué necesitas." },
  { titulo: "Diseñamos tu página", texto: "Armamos una propuesta a partir de lo que nos contaste." },
  { titulo: "La revisamos juntos", texto: "Ajustamos textos, colores o secciones hasta que quede como quieres." },
  { titulo: "La publicamos", texto: "Queda en línea y lista para recibir a tus clientes." },
];

export function Proceso() {
  return (
    <section id="proceso" className="nx-section nx-section-alt">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Cómo trabajamos</h2>
          <p>Cuatro pasos, sin vueltas, desde que nos escribes hasta que tu página está en línea.</p>
        </div>

        <ol className="nx-process">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo}>
              <span className="nx-process-num">{i + 1}</span>
              <h3>{paso.titulo}</h3>
              <p>{paso.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
