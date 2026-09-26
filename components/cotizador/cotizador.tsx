"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CircleAlert, CircleCheck, Copy, Eye, Pencil, RotateCcw, Search, Send, X } from "lucide-react";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Campo, Chip, Desplegable, GrupoOpciones, deTextos } from "./controles";
import { VistaPrevia } from "./vista-previa";
import { BRAND_NAME, whatsappLink } from "@/lib/site-config";
import {
  ANTIGUEDAD, ATENCION, CATEGORIAS, COLORES, DISTRIBUCIONES, ESTADO_NEGOCIO, ESTILOS, FUNCIONES, HORARIOS, MANTENIMIENTO,
  MATERIALES, OBJETIVOS, PAQUETES_COT, PLAZOS, PRESUPUESTOS, PUBLICO, RESPUESTAS_INICIALES, RUBRO_OTRO,
  SECCIONES, TONOS, buscarRubro, mensajeWhatsapp, nombreRubro, preguntasDe, resumen, type Respuestas,
} from "@/lib/cotizador";

type PasoId =
  | "paquete" | "rubro" | "especificas" | "negocio" | "objetivos" | "secciones"
  | "funciones" | "estilo" | "materiales" | "contacto" | "resumen";

const ORDEN: PasoId[] = [
  "paquete", "rubro", "especificas", "negocio", "objetivos", "secciones",
  "funciones", "estilo", "materiales", "contacto", "resumen",
];

const META: Record<PasoId, { titulo: string; desc: string }> = {
  paquete: { titulo: "¿Qué paquete te interesa?", desc: "Si aún no lo sabes, te asesoramos sin compromiso." },
  rubro: { titulo: "¿A qué se dedica tu negocio?", desc: "Elige tu rubro. Si no está en la lista, elige “Otro” y cuéntanos." },
  especificas: { titulo: "Unos detalles de tu rubro", desc: "Así sabemos qué necesita tu página desde el inicio." },
  negocio: { titulo: "Cuéntanos de tu negocio", desc: "Con esto empezamos a darle forma a tu web." },
  objetivos: { titulo: "¿Qué quieres lograr con tu web?", desc: "Marca todas las que apliquen." },
  secciones: { titulo: "¿Qué secciones necesitas?", desc: "Mira cómo se va armando tu página en la vista previa." },
  funciones: { titulo: "¿Qué funciones quieres?", desc: "Elige todo lo que tu página debe poder hacer." },
  estilo: { titulo: "¿Cómo quieres que se vea?", desc: "Elige un estilo: la vista previa cambia al instante." },
  materiales: { titulo: "¿Con qué materiales cuentas?", desc: "Si no tienes nada, no te preocupes: te ayudamos." },
  contacto: { titulo: "Plazo, presupuesto y contacto", desc: "Solo tu nombre y tu WhatsApp son obligatorios." },
  resumen: { titulo: "Revisa tu cotización", desc: "Si todo está bien, envíala por WhatsApp con un toque." },
};

const STORAGE_KEY = "neoesis-cotizador-v1";

function cargar(): { r: Respuestas; paso: PasoId } {
  let r = RESPUESTAS_INICIALES;
  let paso: PasoId = "paquete";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if (d && typeof d === "object" && d.r) {
        r = {
          ...RESPUESTAS_INICIALES,
          ...d.r,
          especificas: d.r.especificas ?? {},
          materiales: { ...RESPUESTAS_INICIALES.materiales, ...(d.r.materiales ?? {}) },
        };
        if (ORDEN.includes(d.paso) && d.paso !== "resumen") paso = d.paso;
      }
    }
  } catch {}
  try {
    const p = new URLSearchParams(window.location.search).get("paquete");
    if (p && PAQUETES_COT.some((x) => x.id === p)) r = { ...r, paquete: p };
  } catch {}
  return { r, paso };
}

const normalizar = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const soloDigitos = (s: string) => s.replace(/\D/g, "");

function lanzarConfeti() {
  import("canvas-confetti").then(({ default: confetti }) => {
    const colors = ["#9d74ff", "#e07bff", "#f3f0fb", "#25d366"];
    confetti({ particleCount: 120, spread: 75, origin: { y: 0.65 }, colors });
    window.setTimeout(() => confetti({ particleCount: 60, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors }), 180);
    window.setTimeout(() => confetti({ particleCount: 60, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors }), 300);
  });
}

export function Cotizador() {
  const [inicio] = useState(cargar);
  const [r, setR] = useState<Respuestas>(inicio.r);
  const [paso, setPaso] = useState<PasoId>(inicio.paso);
  const [dir, setDir] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState("");
  const [previewAbierta, setPreviewAbierta] = useState(false);
  const [confirmarBorrar, setConfirmarBorrar] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  // Guarda el avance en este navegador
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ r, paso }));
    } catch {}
  }, [r, paso]);

  const pasos = useMemo(
    () => ORDEN.filter((p) => p !== "especificas" || preguntasDe(r.rubro).length > 0),
    [r.rubro]
  );
  const actual: PasoId = pasos.includes(paso) ? paso : "negocio";
  const idx = pasos.indexOf(actual);

  const upd = (patch: Partial<Respuestas>) => {
    setR((prev) => ({ ...prev, ...patch }));
    if (error) setError(null);
  };

  const irA = (destino: PasoId, direccion: number) => {
    setDir(direccion);
    setPaso(destino);
    setError(null);
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0) topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validar = (p: PasoId): string | null => {
    if (p === "rubro") {
      if (!r.rubro) return "Elige el rubro de tu negocio para continuar.";
      if (r.rubro === RUBRO_OTRO && !r.rubroOtro.trim()) return "Cuéntanos cuál es tu rubro.";
    }
    if (p === "contacto") {
      if (!r.nombre.trim()) return "Escribe tu nombre.";
      if (soloDigitos(r.whatsapp).length < 9) return "Escribe un número de WhatsApp válido (mínimo 9 dígitos).";
      if (r.correo.trim() && !/^\S+@\S+\.\S+$/.test(r.correo.trim())) return "Revisa tu correo: parece incompleto.";
      if (!r.acepta) return "Acepta la política de privacidad para continuar.";
    }
    return null;
  };

  const mensaje = useMemo(() => mensajeWhatsapp(r, BRAND_NAME), [r]);

  const enviar = () => {
    window.open(whatsappLink(mensaje), "_blank", "noopener,noreferrer");
    setEnviado(true);
    lanzarConfeti();
  };

  const siguiente = () => {
    if (actual === "resumen") return enviar();
    const e = validar(actual);
    if (e) return setError(e);
    irA(pasos[idx + 1], 1);
  };
  const atras = () => idx > 0 && irA(pasos[idx - 1], -1);

  const borrarTodo = () => {
    if (!confirmarBorrar) {
      setConfirmarBorrar(true);
      window.setTimeout(() => setConfirmarBorrar(false), 3000);
      return;
    }
    setConfirmarBorrar(false);
    setR(RESPUESTAS_INICIALES);
    setEnviado(false);
    irA("paquete", -1);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
    } catch {}
  };

  // Color del resplandor de fondo según el estilo elegido
  const acento = ESTILOS.find((e) => e.id === r.estilo)?.tema.accent ?? "#9d74ff";

  const reorganizar = () => {
    const i = DISTRIBUCIONES.findIndex((d) => d.id === r.distribucion);
    upd({ distribucion: DISTRIBUCIONES[(i + 1) % DISTRIBUCIONES.length].id });
  };

  // ---------- Contenido de cada paso ----------
  const rubroInfo = buscarRubro(r.rubro);
  const RubroIcon = rubroInfo?.rubro.icon;

  const categoriasFiltradas = useMemo(() => {
    const q = normalizar(busqueda.trim());
    if (!q) return CATEGORIAS;
    return CATEGORIAS.map((c) => ({
      ...c,
      rubros: normalizar(c.label).includes(q) ? c.rubros : c.rubros.filter((x) => normalizar(x.label).includes(q)),
    })).filter((c) => c.rubros.length > 0);
  }, [busqueda]);

  let contenido: React.ReactNode = null;

  switch (actual) {
    case "paquete":
      contenido = (
        <GrupoOpciones
          label="Paquete"
          variant="card"
          className="nx-chips-2"
          opciones={PAQUETES_COT}
          value={r.paquete}
          onChange={(v) => upd({ paquete: v })}
        />
      );
      break;

    case "rubro":
      contenido = (
        <div className="nx-cot-stack">
          <AnimatePresence mode="wait">
            {r.rubro && (
              <motion.div
                key={r.rubro}
                className="nx-cot-rubro-ok"
                initial={{ opacity: 0, y: -10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.span
                  className="nx-cot-rubro-ico"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                >
                  {RubroIcon ? <RubroIcon /> : <Pencil />}
                </motion.span>
                <div>
                  <b>{nombreRubro(r)}</b>
                  <span>
                    {preguntasDe(r.rubro).length > 0
                      ? "Genial, tenemos preguntas especiales para tu rubro."
                      : "Perfecto, lo tendremos en cuenta en tu propuesta."}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="nx-cot-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              className="nx-input"
              placeholder="Busca tu rubro: pollería, dentista, gimnasio…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              aria-label="Buscar rubro"
            />
          </div>

          <div className="nx-cot-cats" role="radiogroup" aria-label="Tipo de negocio">
            {categoriasFiltradas.map((c) => {
              const CatIcon = c.icon;
              return (
                <div key={c.id} className="nx-cot-cat">
                  <p className="nx-cot-cat-title"><CatIcon aria-hidden="true" /> {c.label}</p>
                  <div className="nx-chips">
                    {c.rubros.map((x) => (
                      <Chip
                        key={x.id}
                        label={x.label}
                        icon={x.icon}
                        multi={false}
                        selected={r.rubro === x.id}
                        onToggle={() => upd({ rubro: x.id, especificas: r.rubro === x.id ? r.especificas : {} })}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
            {categoriasFiltradas.length === 0 && (
              <p className="nx-cot-empty">No encontramos “{busqueda}”. Elige <b>Otro</b> y escríbelo.</p>
            )}
            <div className="nx-cot-cat">
              <p className="nx-cot-cat-title"><Pencil aria-hidden="true" /> ¿No está tu rubro?</p>
              <div className="nx-chips">
                <Chip
                  label="Otro"
                  icon={Pencil}
                  multi={false}
                  selected={r.rubro === RUBRO_OTRO}
                  onToggle={() =>
                    upd({ rubro: RUBRO_OTRO, especificas: {}, rubroOtro: r.rubroOtro || busqueda.trim() })
                  }
                />
              </div>
              <Desplegable abierto={r.rubro === RUBRO_OTRO}>
                <input
                  className="nx-input"
                  placeholder="Ej.: imprenta, academia de ajedrez, vivero…"
                  value={r.rubroOtro}
                  onChange={(e) => upd({ rubroOtro: e.target.value })}
                  aria-label="¿Cuál es tu rubro?"
                  autoFocus
                />
              </Desplegable>
            </div>
          </div>
        </div>
      );
      break;

    case "especificas":
      contenido = (
        <div className="nx-cot-stack">
          {preguntasDe(r.rubro).map((q) => {
            const v = r.especificas[q.id];
            const setV = (nv: string | string[]) => upd({ especificas: { ...r.especificas, [q.id]: nv } });
            return (
              <Campo key={q.id} label={q.label}>
                {q.tipo === "multi" ? (
                  <GrupoOpciones multi label={q.label} opciones={deTextos(q.opciones)} value={Array.isArray(v) ? v : []} onChange={setV} />
                ) : (
                  <GrupoOpciones label={q.label} opciones={deTextos(q.opciones)} value={typeof v === "string" ? v : ""} onChange={setV} />
                )}
              </Campo>
            );
          })}
        </div>
      );
      break;

    case "negocio":
      contenido = (
        <div className="nx-cot-stack">
          <div className="nx-cot-row">
            <Campo label="Nombre del negocio" htmlFor="c-negocio">
              <input id="c-negocio" className="nx-input" placeholder="Ej.: Pollería El Buen Sabor" value={r.negocioNombre} onChange={(e) => upd({ negocioNombre: e.target.value })} />
            </Campo>
            <Campo label="Ciudad o distrito" htmlFor="c-ubicacion">
              <input id="c-ubicacion" className="nx-input" placeholder="Ej.: Surco, Lima" value={r.ubicacion} onChange={(e) => upd({ ubicacion: e.target.value })} />
            </Campo>
          </div>
          <Campo label="¿Tu negocio es nuevo o ya funciona?">
            <GrupoOpciones label="Estado del negocio" opciones={ESTADO_NEGOCIO} value={r.estadoNegocio} onChange={(v) => upd({ estadoNegocio: v })} />
            <Desplegable abierto={r.estadoNegocio === "funciona"}>
              <GrupoOpciones label="Antigüedad" opciones={deTextos(ANTIGUEDAD)} value={r.antiguedad} onChange={(v) => upd({ antiguedad: v })} />
            </Desplegable>
          </Campo>
          <Campo label="¿Cómo atiendes?" contador={r.atencion.length}>
            <GrupoOpciones multi label="Atención" opciones={ATENCION} value={r.atencion} onChange={(v) => upd({ atencion: v })} />
          </Campo>
          <Campo label="¿Quiénes son tus clientes?" contador={r.publico.length}>
            <GrupoOpciones multi label="Público" opciones={PUBLICO} value={r.publico} onChange={(v) => upd({ publico: v })} />
          </Campo>
          <Campo label="Describe tu negocio en una frase" htmlFor="c-desc" hint={`${r.descripcion.length}/160`}>
            <textarea id="c-desc" className="nx-input nx-textarea" maxLength={160} rows={2} placeholder="Ej.: El mejor pollo a la brasa de Surco, con delivery en 30 minutos." value={r.descripcion} onChange={(e) => upd({ descripcion: e.target.value })} />
          </Campo>
        </div>
      );
      break;

    case "objetivos":
      contenido = (
        <Campo label="Tus objetivos" contador={r.objetivos.length}>
          <GrupoOpciones multi label="Objetivos" className="nx-chips-2" opciones={OBJETIVOS} value={r.objetivos} onChange={(v) => upd({ objetivos: v })} />
        </Campo>
      );
      break;

    case "secciones":
      contenido = (
        <Campo label="Secciones de tu página" contador={r.secciones.length}>
          <GrupoOpciones multi label="Secciones" opciones={SECCIONES} value={r.secciones} onChange={(v) => upd({ secciones: v })} />
        </Campo>
      );
      break;

    case "funciones":
      contenido = (
        <Campo label="Funciones" contador={r.funciones.length}>
          <GrupoOpciones multi label="Funciones" opciones={FUNCIONES} value={r.funciones} onChange={(v) => upd({ funciones: v })} />
        </Campo>
      );
      break;

    case "estilo":
      contenido = (
        <div className="nx-cot-stack">
          <Campo label="Estilo visual">
            <div className="nx-chips nx-chips-estilos" role="radiogroup" aria-label="Estilo visual">
              {ESTILOS.map((e) => (
                <Chip
                  key={e.id}
                  label={e.label}
                  desc={e.desc}
                  multi={false}
                  variant="card"
                  selected={r.estilo === e.id}
                  onToggle={() => upd({ estilo: r.estilo === e.id ? "" : e.id })}
                >
                  <span
                    className="nx-estilo-muestra"
                    style={{ background: e.tema.bg, color: e.tema.text, borderRadius: Math.min(e.tema.radius, 12), fontFamily: e.tema.serif ? "Georgia, serif" : undefined } as CSSProperties}
                    aria-hidden="true"
                  >
                    <b>Aa</b>
                    <i style={{ background: e.tema.accent }} />
                    <i style={{ background: e.tema.accent2 }} />
                    <i style={{ background: e.tema.surface }} />
                  </span>
                </Chip>
              ))}
            </div>
          </Campo>
          <Campo label="Colores">
            <GrupoOpciones label="Colores" opciones={COLORES} value={r.colores} onChange={(v) => upd({ colores: v })} />
            <Desplegable abierto={r.colores === "tengo"}>
              <div className="nx-cot-color">
                <input className="nx-input" placeholder="Ej.: morado y dorado, o #7c4dff" value={r.coloresMarca} onChange={(e) => upd({ coloresMarca: e.target.value })} aria-label="Tus colores de marca" />
                <label className="nx-cot-picker" title="Elegir un color">
                  <input
                    type="color"
                    value={r.coloresMarca.match(/#[0-9a-f]{6}\b/i)?.[0] ?? "#9d74ff"}
                    onChange={(e) => {
                      const hex = e.target.value;
                      const actualHex = r.coloresMarca.match(/#[0-9a-f]{6}\b/i)?.[0];
                      upd({ coloresMarca: actualHex ? r.coloresMarca.replace(actualHex, hex) : `${r.coloresMarca} ${hex}`.trim() });
                    }}
                    aria-label="Elegir color principal"
                  />
                </label>
              </div>
              <p className="nx-field-hint">Si eliges un color, lo verás aplicado en la vista previa.</p>
            </Desplegable>
          </Campo>
          <Campo label="Colores que NO quieres (opcional)" htmlFor="c-evitar">
            <input id="c-evitar" className="nx-input" placeholder="Ej.: rojo, verde limón" value={r.coloresEvitar} onChange={(e) => upd({ coloresEvitar: e.target.value })} />
          </Campo>
          <Campo label="Tono de los textos">
            <GrupoOpciones label="Tono" opciones={deTextos(TONOS)} value={r.tono} onChange={(v) => upd({ tono: v })} />
          </Campo>
          <Campo label="Páginas que te gustan (opcional)" htmlFor="c-ref" hint="Pega hasta 3 enlaces de referencia.">
            <textarea id="c-ref" className="nx-input nx-textarea" rows={2} placeholder="https://…" value={r.referencias} onChange={(e) => upd({ referencias: e.target.value })} />
          </Campo>
        </div>
      );
      break;

    case "materiales":
      contenido = (
        <div className="nx-cot-stack">
          {MATERIALES.map((m) => {
            const Icon = m.icon;
            return (
              <Campo key={m.id} label={<><Icon className="nx-field-ico" aria-hidden="true" /> {m.label}</>}>
                <GrupoOpciones
                  label={m.label}
                  opciones={deTextos(m.opciones)}
                  value={r.materiales[m.id]}
                  onChange={(v) => upd({ materiales: { ...r.materiales, [m.id]: v } })}
                />
              </Campo>
            );
          })}
          <div className="nx-cot-row">
            <Campo label="Tu web actual (opcional)" htmlFor="c-web">
              <input id="c-web" className="nx-input" placeholder="https://…" value={r.webActual} onChange={(e) => upd({ webActual: e.target.value })} />
            </Campo>
            <Campo label="Tus redes sociales (opcional)" htmlFor="c-redes">
              <input id="c-redes" className="nx-input" placeholder="@tunegocio o enlaces" value={r.redes} onChange={(e) => upd({ redes: e.target.value })} />
            </Campo>
          </div>
        </div>
      );
      break;

    case "contacto":
      contenido = (
        <div className="nx-cot-stack">
          <Campo label="¿Para cuándo la necesitas?">
            <GrupoOpciones label="Plazo" opciones={deTextos(PLAZOS)} value={r.plazo} onChange={(v) => upd({ plazo: v })} />
          </Campo>
          <Campo label="Presupuesto aproximado">
            <GrupoOpciones label="Presupuesto" opciones={deTextos(PRESUPUESTOS)} value={r.presupuesto} onChange={(v) => upd({ presupuesto: v })} />
          </Campo>
          <Campo label="¿Te interesa un plan de mantenimiento?">
            <GrupoOpciones label="Mantenimiento" opciones={deTextos(MANTENIMIENTO)} value={r.mantenimiento} onChange={(v) => upd({ mantenimiento: v })} />
          </Campo>
          <div className="nx-cot-row">
            <Campo label="Tu nombre *" htmlFor="c-nombre">
              <input id="c-nombre" className="nx-input" autoComplete="name" placeholder="Nombre y apellido" value={r.nombre} onChange={(e) => upd({ nombre: e.target.value })} />
            </Campo>
            <Campo label="Tu WhatsApp *" htmlFor="c-wa">
              <input id="c-wa" className="nx-input" type="tel" inputMode="tel" autoComplete="tel" placeholder="Ej.: 987 654 321" value={r.whatsapp} onChange={(e) => upd({ whatsapp: e.target.value })} />
            </Campo>
          </div>
          <Campo label="Correo (opcional)" htmlFor="c-correo">
            <input id="c-correo" className="nx-input" type="email" autoComplete="email" placeholder="tu@correo.com" value={r.correo} onChange={(e) => upd({ correo: e.target.value })} />
          </Campo>
          <Campo label="¿A qué hora prefieres que te contactemos?">
            <GrupoOpciones label="Horario" opciones={deTextos(HORARIOS)} value={r.horario} onChange={(v) => upd({ horario: v })} />
          </Campo>
          <Campo label="Comentarios adicionales (opcional)" htmlFor="c-com">
            <textarea id="c-com" className="nx-input nx-textarea" rows={3} placeholder="Cualquier detalle que quieras contarnos." value={r.comentarios} onChange={(e) => upd({ comentarios: e.target.value })} />
          </Campo>
          <label className={r.acepta ? "nx-cot-accept is-on" : "nx-cot-accept"}>
            <input type="checkbox" checked={r.acepta} onChange={(e) => upd({ acepta: e.target.checked })} />
            <span className="nx-cot-box" aria-hidden="true"><CircleCheck /></span>
            <span>
              Acepto la{" "}
              <Link href="/privacidad" target="_blank" rel="noopener noreferrer">política de privacidad</Link>{" "}
              y que me contacten por WhatsApp. *
            </span>
          </label>
        </div>
      );
      break;

    case "resumen":
      contenido = (
        <div className="nx-cot-stack">
          {resumen(r).map((g, i) => (
            <motion.div
              key={g.titulo}
              className="nx-cot-sum"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="nx-cot-sum-head">
                <b>{g.titulo}</b>
                <button type="button" onClick={() => irA(g.paso as PasoId, -1)}><Pencil aria-hidden="true" /> Editar</button>
              </div>
              <dl>
                {g.items.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
            </motion.div>
          ))}
          <p className="nx-field-hint">Al enviar se abrirá WhatsApp con este resumen listo. Solo tienes que tocar “Enviar”.</p>
        </div>
      );
      break;
  }

  const mostrarError = (
    <AnimatePresence>
      {error && (
        <motion.div
          role="alert"
          className="nx-cot-error"
          initial={{ opacity: 0, y: 8, x: 0 }}
          animate={{ opacity: 1, y: 0, x: [0, -8, 8, -5, 5, 0] }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4 }}
        >
          <CircleAlert aria-hidden="true" /> {error}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const pie = (
    <>
      <button type="button" className="nx-cot-link lg:hidden" onClick={() => setPreviewAbierta(true)}>
        <Eye aria-hidden="true" /> Vista previa
      </button>
      <button type="button" className={confirmarBorrar ? "nx-cot-link is-warn" : "nx-cot-link"} onClick={borrarTodo}>
        <RotateCcw aria-hidden="true" /> {confirmarBorrar ? "¿Seguro? Toca otra vez" : "Empezar de nuevo"}
      </button>
    </>
  );

  return (
    <div className="nx-cot" style={{ "--cot-accent": acento } as CSSProperties}>
      <div className="nx-cot-glow" aria-hidden="true" />
      <div className="nx-wrap nx-cot-grid">
        <div className="nx-cot-main" ref={topRef}>
          <div className="nx-cot-intro">
            <p className="nx-eyebrow">Cotizador</p>
            <h1>Arma la cotización de tu página web</h1>
            <p>Responde a tu ritmo: tus respuestas se guardan en este dispositivo. Al final nos llega todo por WhatsApp.</p>
          </div>

          <AnimatePresence mode="wait">
            {enviado ? (
              <motion.div
                key="ok"
                className="nx-cot-done"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
              >
                <motion.span className="nx-cot-done-ico" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 12 }}>
                  <CircleCheck />
                </motion.span>
                <h2>¡Listo{r.nombre.trim() ? `, ${r.nombre.trim().split(" ")[0]}` : ""}!</h2>
                <p>Se abrió WhatsApp con tu cotización. Envía el mensaje y te respondemos a la brevedad con una propuesta.</p>
                <div className="nx-cot-done-actions">
                  <a className="nx-btn nx-btn-whatsapp" href={whatsappLink(mensaje)} target="_blank" rel="noopener noreferrer">
                    <Send aria-hidden="true" /> Abrir WhatsApp de nuevo
                  </a>
                  <button type="button" className="nx-btn nx-btn-ghost" onClick={() => { setEnviado(false); }}>
                    Volver a mi resumen
                  </button>
                  <Link href="/" className="nx-cot-link">Ir al inicio <ArrowRight aria-hidden="true" /></Link>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <MultiStepForm
                  size="fluid"
                  className="nx-cot-card"
                  currentStep={idx + 1}
                  totalSteps={pasos.length}
                  stepKey={actual}
                  direction={dir}
                  title={META[actual].titulo}
                  description={META[actual].desc}
                  progressLabel={`Paso ${idx + 1} de ${pasos.length}`}
                  onBack={atras}
                  onNext={siguiente}
                  backButtonText="Atrás"
                  nextButtonText={
                    actual === "resumen" ? (
                      <><Send aria-hidden="true" /> Enviar por WhatsApp</>
                    ) : actual === "contacto" ? (
                      <>Ver resumen <ArrowRight aria-hidden="true" /></>
                    ) : (
                      <>Siguiente <ArrowRight aria-hidden="true" /></>
                    )
                  }
                  nextButtonClassName={actual === "resumen" ? "is-wa" : undefined}
                  footerContent={pie}
                  headerExtra={
                    actual === "resumen" ? (
                      <div className="nx-cot-copy">
                        <button type="button" className="nx-cot-link" onClick={copiar}>
                          {copiado ? <CircleCheck aria-hidden="true" /> : <Copy aria-hidden="true" />} {copiado ? "¡Copiado!" : "Copiar resumen"}
                        </button>
                      </div>
                    ) : null
                  }
                >
                  {contenido}
                  {mostrarError}
                </MultiStepForm>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="nx-cot-aside" aria-label="Vista previa de tu página">
          <div className="nx-cot-sticky">
            <VistaPrevia r={r} onReorganizar={reorganizar} />
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {previewAbierta && (
          <motion.div
            className="nx-cot-sheet lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewAbierta(false)}
          >
            <motion.div
              className="nx-cot-sheet-in"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="nx-cot-sheet-close" onClick={() => setPreviewAbierta(false)} aria-label="Cerrar vista previa">
                <X />
              </button>
              <VistaPrevia r={r} onReorganizar={reorganizar} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
