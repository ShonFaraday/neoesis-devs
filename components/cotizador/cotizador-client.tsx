"use client";

import dynamic from "next/dynamic";

// El cuestionario se carga solo en el navegador (usa el guardado local).
export const CotizadorClient = dynamic(() => import("./cotizador").then((m) => m.Cotizador), {
  ssr: false,
  loading: () => (
    <div className="nx-wrap nx-cot-loading" aria-busy="true">
      <div className="nx-cot-skel" />
    </div>
  ),
});
