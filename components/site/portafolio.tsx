export function Portafolio() {
  return (
    <section id="portafolio" className="nx-section">
      <div className="nx-wrap">
        <div className="nx-section-head">
          <h2>Nuestro portafolio</h2>
          <p>
            Este es nuestro primer proyecto. A partir de aquí iremos sumando cada página que
            construyamos.
          </p>
        </div>

        <div className="nx-grid">
          <article className="nx-card">
            <div className="nx-tag">Proyecto 01</div>
            <h3>Neoesis DEVS®</h3>
            <p>La página que estás viendo ahora mismo: nuestra propia carta de presentación.</p>
            <a href="#inicio" className="nx-work-link">
              Ver la página ↑
            </a>
          </article>

          <article className="nx-card nx-card-placeholder">
            <div className="nx-tag nx-tag-muted">Proyecto 02</div>
            <h3>Próximamente</h3>
            <p>Estamos trabajando en el siguiente proyecto. Vuelve pronto para verlo aquí.</p>
          </article>

          <article className="nx-card nx-card-placeholder">
            <div className="nx-tag nx-tag-muted">Proyecto 03</div>
            <h3>Próximamente</h3>
            <p>Cada página que publiquemos para un cliente se sumará a esta lista.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
