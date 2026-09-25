import Link from "next/link";
import { Logo } from "./logo";

// Barra superior simple para las páginas internas (FAQ, legales y 404).
export function SiteTopBar() {
  return (
    <header className="nx-legal-top">
      <div className="nx-wrap nx-legal-top-inner">
        <Link href="/" className="nx-logo" aria-label="Neoesis DEVS®, ir al inicio">
          <Logo gradientId="nx-grad-topbar" />
        </Link>
        <Link href="/" className="nx-btn nx-btn-ghost nx-btn-small">
          ← Volver al inicio
        </Link>
      </div>
    </header>
  );
}
