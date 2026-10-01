"use client";

import { memo, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, House, Lock, Receipt, Search, Sparkles, Users } from "lucide-react";
import { MODULOS_SISTEMA, buscarRubro, type Respuestas } from "@/lib/cotizador";

// Qué tanto del sistema está definido (medidor de la vista previa).
function porcentaje(r: Respuestas) {
  const checks = [
    !!r.rubro,
    r.sistemaModulos.length > 0,
    !!r.sistemaUsuarios,
    r.sistemaHoy.length > 0,
    !!r.sistemaFacturacion,
    !!r.negocioNombre.trim(),
    !!r.plazo || !!r.presupuesto,
    !!r.nombre.trim() && !!r.whatsapp.trim(),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24);

// Indicadores de ejemplo para cada módulo
const KPI: Record<string, { label: string; valor: string }> = {
  crm: { label: "Clientes", valor: "128" },
  intranet: { label: "Documentos", valor: "56" },
  inventario: { label: "Productos en stock", valor: "342" },
  citas: { label: "Citas de hoy", valor: "9" },
  portal: { label: "Pedidos en curso", valor: "17" },
  ecommerce: { label: "Ventas del mes", valor: "S/ 8,450" },
  reportes: { label: "Crecimiento", valor: "+12%" },
};

// Columnas de la tabla de ejemplo según el primer módulo
const TABLA: Record<string, string[]> = {
  crm: ["Cliente", "Etapa", "Seguimiento"],
  intranet: ["Documento", "Área", "Actualizado"],
  inventario: ["Producto", "Stock", "Estado"],
  citas: ["Hora", "Cliente", "Servicio"],
  portal: ["Pedido", "Cliente", "Estado"],
  ecommerce: ["Pedido", "Total", "Estado"],
  reportes: ["Indicador", "Mes", "Variación"],
};

const ESTADOS = ["Al día", "Pendiente", "Listo", "En curso"];

export const VistaSistema = memo(function VistaSistema({ r }: { r: Respuestas }) {
  const nombre = r.negocioNombre.trim() || "Tu negocio";
  const RubroIcon = buscarRubro(r.rubro)?.rubro.icon ?? Sparkles;
  const modulos = MODULOS_SISTEMA.filter((m) => r.sistemaModulos.includes(m.id));
  const conKpi = modulos.filter((m) => KPI[m.id]);
  const kpis = conKpi.length > 0 ? conKpi.slice(0, 3) : [];
  const principal = modulos.find((m) => TABLA[m.id]);
  const columnas = principal ? TABLA[principal.id] : ["Registro", "Detalle", "Estado"];
  const facturacion = r.sistemaFacturacion.startsWith("Sí");
  const pct = porcentaje(r);

  const vars = {
    "--pv-bg": "#0c0915",
    "--pv-surface": "#1b1530",
    "--pv-text": "#f3f0fb",
    "--pv-muted": "#a8a1c4",
    "--pv-accent": "#9d74ff",
    "--pv-accent2": "#e07bff",
    "--pv-radius": "10px",
  } as CSSProperties;

  return (
    <div className="nx-pv-wrap">
      <div className="nx-pv-meter">
        <div className="nx-pv-meter-top">
          <span>Vista previa de tu sistema</span>
          <b>{pct}% definido</b>
        </div>
        <div className="nx-pv-meter-bar">
          <motion.i animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
        </div>
      </div>

      <div className="nx-pv" style={vars}>
        <div className="nx-pv-bar">
          <span /><span /><span />
          <div className="nx-pv-url">
            <Lock aria-hidden="true" />
            <em>app.{slug(r.negocioNombre) || "tunegocio"}.com</em>
          </div>
        </div>

        <div className="nx-pv-screen" aria-hidden="true">
          <div className="ps-app">
            {/* Menú lateral con los módulos elegidos */}
            <aside className="ps-side">
              <div className="ps-brand">
                <span className="ps-logo"><RubroIcon /></span>
                <b>{nombre}</b>
              </div>
              <nav>
                <span className="is-on"><House /> Inicio</span>
                <AnimatePresence initial={false}>
                  {modulos.map((m) => {
                    const Icon = m.icon!;
                    return (
                      <motion.span
                        key={m.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                      >
                        <Icon /> {m.label.split(" (")[0]}
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
                {facturacion && (
                  <span><Receipt /> Facturación</span>
                )}
              </nav>
            </aside>

            {/* Contenido principal */}
            <div className="ps-main">
              <header className="ps-top">
                <div className="ps-search"><Search /> Buscar…</div>
                <div className="ps-top-right">
                  <Bell />
                  <span className="ps-user"><Users /> {r.sistemaUsuarios || "Usuarios"}</span>
                </div>
              </header>

              <p className="ps-hello">Hola, {r.nombre.trim().split(" ")[0] || "equipo"}</p>
              <p className="ps-sub">Así se ve tu negocio hoy.</p>

              <div className="ps-kpis">
                {kpis.length > 0
                  ? kpis.map((m) => (
                      <motion.div key={m.id} className="ps-kpi" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                        <span>{KPI[m.id].label}</span>
                        <b>{KPI[m.id].valor}</b>
                      </motion.div>
                    ))
                  : [0, 1, 2].map((i) => (
                      <div key={i} className="ps-kpi is-empty">
                        <i /><i />
                      </div>
                    ))}
              </div>

              <div className="ps-card">
                <div className="ps-card-head">
                  <b>{principal ? principal.label.split(" (")[0] : "Elige qué quieres gestionar"}</b>
                  <span className="ps-btn">+ Nuevo</span>
                </div>
                <div className="ps-table">
                  <div className="ps-row is-head">
                    {columnas.map((c) => <span key={c}>{c}</span>)}
                  </div>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="ps-row">
                      <span><i style={{ width: `${70 - i * 7}%` }} /></span>
                      <span><i style={{ width: `${45 + i * 6}%` }} /></span>
                      <span><em className={`ps-tag t${i % 4}`}>{ESTADOS[i % 4]}</em></span>
                    </div>
                  ))}
                </div>
              </div>

              {facturacion && (
                <div className="ps-note"><Receipt /> Conectado con tu proveedor de facturación electrónica</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
