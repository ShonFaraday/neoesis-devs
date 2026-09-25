import type { ReactNode } from "react";
import { SiteTopBar } from "./top-bar";
import { Footer } from "./footer";
import { LEGAL_UPDATED } from "@/lib/site-config";

type LegalPageProps = {
  titulo: string;
  intro: string;
  /** Muestra la fecha de última actualización (páginas legales). */
  mostrarFecha?: boolean;
  children: ReactNode;
};

// Estructura común para las páginas internas: FAQ, términos y privacidad.
export function LegalPage({ titulo, intro, mostrarFecha = true, children }: LegalPageProps) {
  return (
    <>
      <SiteTopBar />

      <main className="nx-legal">
        <div className="nx-wrap">
          <div className="nx-legal-inner">
            <h1>{titulo}</h1>
            {mostrarFecha && (
              <p className="nx-legal-date">Última actualización: {LEGAL_UPDATED}</p>
            )}
            <p className="nx-legal-intro">{intro}</p>
            <div className="nx-legal-body">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
