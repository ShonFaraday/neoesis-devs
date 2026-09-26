"use client";

import { memo, useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import {
  ArrowRight, BadgeCheck, Briefcase, Calendar, Check, ChevronDown, Clock, Lock, Mail, MapPin,
  MessageCircle, Phone, Plus, Quote, ShoppingBag, Shuffle, Sparkles, Star, type LucideIcon,
} from "lucide-react";
import {
  DISTRIBUCIONES, ESTILOS, FUNCIONES, SECCIONES, buscarRubro, nombreRubro, RUBRO_OTRO, type Respuestas,
} from "@/lib/cotizador";

// Qué tanto de la web está definido (medidor de la vista previa).
export function porcentajeDefinido(r: Respuestas) {
  const checks = [
    !!r.paquete,
    !!r.rubro && (r.rubro !== RUBRO_OTRO || !!r.rubroOtro.trim()),
    !!r.negocioNombre.trim(),
    r.objetivos.length > 0,
    r.secciones.length > 2,
    r.funciones.length > 1,
    !!r.estilo,
    !!r.tono || !!r.colores,
    Object.values(r.materiales).some(Boolean),
    !!r.plazo || !!r.presupuesto,
    !!r.nombre.trim() && !!r.whatsapp.trim(),
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}

const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 24);

const FIN = ["mapa", "contacto"];
const PIE = ["reclamaciones", "legales"];

function ordenar(ids: string[], orden: string[] | null) {
  const base = SECCIONES.map((s) => s.id);
  const rank = (id: string) => {
    if (FIN.includes(id)) return 1000 + FIN.indexOf(id);
    if (orden) {
      const i = orden.indexOf(id);
      if (i >= 0) return i;
    }
    return 100 + base.indexOf(id);
  };
  return [...ids].sort((a, b) => rank(a) - rank(b));
}

// ---------- Piezas del wireframe ----------
function L({ w = 100, h = 6, o = 0.3 }: { w?: number; h?: number; o?: number }) {
  return <i className="pv-l" style={{ width: `${w}%`, height: h, opacity: o }} />;
}

function Img({ icon: Icon, className = "", children }: { icon?: LucideIcon; className?: string; children?: ReactNode }) {
  return (
    <div className={`pv-img ${className}`}>
      {Icon && <Icon className="pv-img-ico" />}
      {children}
    </div>
  );
}

function Cabecera({ eyebrow, titulo, centro = false }: { eyebrow: string; titulo: string; centro?: boolean }) {
  return (
    <div className={centro ? "pv-head is-center" : "pv-head"}>
      <span className="pv-eyebrow">{eyebrow}</span>
      <p className="pv-title">{titulo}</p>
    </div>
  );
}

const Bloque = memo(function Bloque({ id, label, icon, alt }: { id: string; label: string; icon: LucideIcon; alt: boolean }) {
  switch (id) {
    case "nosotros":
      return (
        <div className={alt ? "pv-split is-rev" : "pv-split"}>
          <div>
            <Cabecera eyebrow="Nuestra historia" titulo="Quiénes somos" />
            <L w={95} /><L w={88} /><L w={60} />
            <div className="pv-stats">
              {["+10", "4.9★", "24/7"].map((n) => <div key={n}><b>{n}</b><L w={70} h={4} /></div>)}
            </div>
          </div>
          <Img icon={icon} className="is-tall" />
        </div>
      );
    case "servicios":
      return (
        <>
          <Cabecera eyebrow="Lo que hacemos" titulo="Servicios" centro />
          <div className="pv-g3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="pv-card">
                <span className="pv-tile"><Sparkles /></span>
                <L w={70} h={7} o={0.55} /><L w={95} h={5} /><L w={75} h={5} />
                <span className="pv-more">Ver más <ArrowRight /></span>
              </div>
            ))}
          </div>
        </>
      );
    case "productos":
    case "menu":
      return (
        <>
          <Cabecera eyebrow={id === "menu" ? "Nuestra carta" : "Catálogo"} titulo={label} centro />
          <div className="pv-tabs">{["Todo", "Populares", "Nuevos"].map((t, i) => <span key={t} className={i === 0 ? "is-on" : ""}>{t}</span>)}</div>
          <div className="pv-g3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="pv-card is-flush">
                <Img icon={icon} />
                <div className="pv-card-body">
                  <L w={75} h={7} o={0.55} /><L w={55} h={5} />
                  <div className="pv-row"><b className="pv-price">{id === "menu" ? `S/ ${18 + i * 7}` : `US$ ${19 + i * 10}`}</b><span className="pv-add"><Plus /></span></div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    case "precios":
      return (
        <>
          <Cabecera eyebrow="Planes" titulo="Precios" centro />
          <div className="pv-g3 is-prices">
            {["Básico", "Popular", "Pro"].map((n, i) => (
              <div key={n} className={i === 1 ? "pv-card is-hot" : "pv-card"}>
                {i === 1 && <span className="pv-pop">Más elegido</span>}
                <span className="pv-tier">{n}</span>
                <b className="pv-big">${(i + 1) * 29}</b>
                {[0, 1, 2].map((k) => <span key={k} className="pv-check"><Check /><L w={70} h={5} /></span>)}
                <span className={i === 1 ? "pv-btn" : "pv-btn is-ghost"}>Elegir</span>
              </div>
            ))}
          </div>
        </>
      );
    case "galeria":
    case "portafolio":
      return (
        <>
          <Cabecera eyebrow={id === "galeria" ? "Galería" : "Trabajos"} titulo={label} />
          <div className="pv-masonry">
            {[0, 1, 2, 3, 4].map((i) => <Img key={i} icon={i === 0 ? icon : undefined} className={`m${i}`} />)}
          </div>
        </>
      );
    case "testimonios":
      return (
        <>
          <Cabecera eyebrow="Opiniones" titulo="Lo que dicen nuestros clientes" centro />
          <div className="pv-g2">
            {[0, 1].map((i) => (
              <div key={i} className="pv-card">
                <Quote className="pv-quote" />
                <span className="pv-stars">{[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}</span>
                <L w={95} h={5} /><L w={80} h={5} />
                <div className="pv-row is-start"><span className="pv-avatar" /><div className="pv-col"><L w={60} h={6} o={0.55} /><L w={40} h={4} /></div></div>
              </div>
            ))}
          </div>
        </>
      );
    case "equipo":
      return (
        <>
          <Cabecera eyebrow="Equipo" titulo="Conoce a nuestro equipo" centro />
          <div className="pv-g4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="pv-member"><span className="pv-avatar is-lg" /><L w={70} h={6} o={0.55} /><L w={50} h={4} /></div>
            ))}
          </div>
        </>
      );
    case "faq":
      return (
        <div className="pv-split is-faq">
          <Cabecera eyebrow="Ayuda" titulo="Preguntas frecuentes" />
          <div className="pv-faq">
            {[0, 1, 2].map((i) => (
              <div key={i} className={i === 0 ? "is-open" : ""}>
                <div className="pv-row"><L w={70} h={6} o={0.55} /><ChevronDown /></div>
                {i === 0 && <><L w={95} h={4} /><L w={70} h={4} /></>}
              </div>
            ))}
          </div>
        </div>
      );
    case "blog":
      return (
        <>
          <Cabecera eyebrow="Blog" titulo="Últimas noticias" />
          <div className="pv-g2">
            {[0, 1].map((i) => (
              <div key={i} className="pv-card is-flush">
                <Img />
                <div className="pv-card-body"><span className="pv-date"><Calendar /> 12 oct</span><L w={85} h={7} o={0.55} /><L w={95} h={4} /></div>
              </div>
            ))}
          </div>
        </>
      );
    case "promociones":
      return (
        <div className="pv-promo">
          <div><span className="pv-eyebrow is-inv">Solo esta semana</span><b>-20% en tu primera compra</b></div>
          <span className="pv-btn is-inv">Aprovechar</span>
        </div>
      );
    case "trabaja":
      return (
        <div className="pv-card pv-row is-job">
          <span className="pv-tile"><Briefcase /></span>
          <div className="pv-col"><b className="pv-small-title">Trabaja con nosotros</b><L w={80} h={5} /></div>
          <span className="pv-btn is-ghost">Postular</span>
        </div>
      );
    case "mapa":
      return (
        <div className="pv-split">
          <div className="pv-map"><span className="pv-pin" /><span className="pv-pin-ring" /></div>
          <div>
            <Cabecera eyebrow="Visítanos" titulo="Ubicación y horarios" />
            <span className="pv-check"><MapPin /><L w={80} h={5} /></span>
            <span className="pv-check"><Clock /><L w={65} h={5} /></span>
            <span className="pv-check"><Clock /><L w={55} h={5} /></span>
          </div>
        </div>
      );
    case "contacto":
      return (
        <div className="pv-contact">
          <div>
            <Cabecera eyebrow="Contacto" titulo="Hablemos" />
            <span className="pv-check"><Phone /><L w={70} h={5} /></span>
            <span className="pv-check"><Mail /><L w={80} h={5} /></span>
            <span className="pv-check"><MapPin /><L w={60} h={5} /></span>
          </div>
          <div className="pv-form">
            <i /><i /><i className="is-area" />
            <span className="pv-btn">Enviar mensaje</span>
          </div>
        </div>
      );
    default:
      return (
        <>
          <Cabecera eyebrow={label} titulo={label} />
          <L w={90} /><L w={70} />
        </>
      );
  }
});

type Props = { r: Respuestas; onReorganizar?: () => void };

// memo: solo se redibuja cuando cambian las respuestas.
export const VistaPrevia = memo(function VistaPrevia({ r, onReorganizar }: Props) {
  const estilo = ESTILOS.find((e) => e.id === r.estilo) ?? ESTILOS.find((e) => e.id === "oscuro")!;
  const t = { ...estilo.tema };
  const hex = r.colores === "tengo" ? r.coloresMarca.match(/#(?:[0-9a-f]{6}|[0-9a-f]{3})\b/i)?.[0] : undefined;
  if (hex) t.accent = hex;

  const distIdx = Math.max(0, DISTRIBUCIONES.findIndex((d) => d.id === r.distribucion));
  const dist = DISTRIBUCIONES[distIdx];

  const info = buscarRubro(r.rubro);
  const RubroIcon = info?.rubro.icon ?? Sparkles;
  const rubroTxt = nombreRubro(r);
  const nombre = r.negocioNombre.trim() || "Tu negocio";
  const dominio = `www.${slug(r.negocioNombre) || "tunegocio"}.com`;
  const ids = ordenar(r.secciones.filter((s) => s !== "inicio" && !PIE.includes(s)), dist.orden);
  const secciones = ids.map((id) => SECCIONES.find((s) => s.id === id)!).filter(Boolean);
  const pie = SECCIONES.filter((s) => r.secciones.includes(s.id) && PIE.includes(s.id));
  const funciones = FUNCIONES.filter((f) => r.funciones.includes(f.id));
  const tiene = (id: string) => r.funciones.includes(id);
  const conResenas = r.secciones.includes("testimonios") || tiene("resenas");
  const pct = porcentajeDefinido(r);

  const subtitulo =
    r.descripcion.trim() ||
    (rubroTxt ? `${rubroTxt}${r.ubicacion.trim() ? ` en ${r.ubicacion.trim()}` : ""}. Calidad, confianza y atención directa.` : "Aquí irá la frase que presenta tu negocio a tus clientes.");

  const ctaPrincipal = tiene("reservas") ? "Reservar ahora" : tiene("tienda") || tiene("pedidos") ? "Comprar ahora" : "Contáctanos";
  const navLinks = secciones.slice(0, 4).map((s) => s.label.split(" ")[0]);

  // Al agregar una sección, la pantalla se desplaza hasta ella.
  const screenRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<string[]>(r.secciones);
  useEffect(() => {
    const antes = prevRef.current;
    prevRef.current = r.secciones;
    const nueva = r.secciones.find((s) => !antes.includes(s));
    if (!nueva) return;
    const timer = window.setTimeout(() => {
      const screen = screenRef.current;
      const el = screen?.querySelector<HTMLElement>(`[data-sec="${nueva}"]`);
      if (screen && el) screen.scrollTo({ top: Math.max(0, el.offsetTop - 70), behavior: "smooth" });
    }, 380);
    return () => window.clearTimeout(timer);
  }, [r.secciones]);

  // Al reorganizar, vuelve arriba para ver el cambio de portada.
  useEffect(() => {
    screenRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [r.distribucion]);

  const vars = {
    "--pv-bg": t.bg,
    "--pv-surface": t.surface,
    "--pv-text": t.text,
    "--pv-muted": t.muted,
    "--pv-accent": t.accent,
    "--pv-accent2": t.accent2,
    "--pv-radius": `${t.radius}px`,
    "--pv-font": t.serif ? "Georgia, 'Times New Roman', serif" : "inherit",
  } as CSSProperties;

  const ctas = (
    <div className="pv-ctas">
      <span className="pv-btn">{ctaPrincipal} <ArrowRight /></span>
      {tiene("whatsapp") && <span className="pv-btn is-wa"><MessageCircle /> WhatsApp</span>}
    </div>
  );

  const trust = conResenas && (
    <div className="pv-trust">
      <span className="pv-avatars">{[0, 1, 2].map((i) => <span key={i} className="pv-avatar" />)}</span>
      <span className="pv-stars">{[0, 1, 2, 3, 4].map((k) => <Star key={k} />)}</span>
      <em>4.9 · +120 clientes</em>
    </div>
  );

  const badge = rubroTxt && (
    <span className="pv-badge"><RubroIcon /> {rubroTxt}</span>
  );

  let hero: ReactNode;
  switch (dist.hero) {
    case "dividido":
      hero = (
        <div className="pv-hero is-split">
          <div className="pv-hero-text">
            {badge}
            <h3>{nombre}</h3>
            <p>{subtitulo}</p>
            {ctas}
            {trust}
          </div>
          <div className="pv-hero-visual">
            <Img icon={RubroIcon} className="is-hero" />
            <div className="pv-float-card is-a"><BadgeCheck /> <span><b>Nuevo pedido</b><L w={80} h={4} /></span></div>
            <div className="pv-float-card is-b"><Star /> <b>4.9</b></div>
          </div>
        </div>
      );
      break;
    case "editorial":
      hero = (
        <div className="pv-hero is-editorial">
          {badge}
          <h3>{nombre}<span className="pv-underline" /></h3>
          <div className="pv-editorial-row">
            <p>{subtitulo}</p>
            {ctas}
          </div>
          <div className="pv-strip">
            <Img icon={RubroIcon} /><Img /><Img />
          </div>
        </div>
      );
      break;
    case "bento":
      hero = (
        <div className="pv-bento">
          <div className="pv-hero is-bento">
            {badge}
            <h3>{nombre}</h3>
            <p>{subtitulo}</p>
            {ctas}
          </div>
          <div className="pv-bento-tile is-icon"><RubroIcon /></div>
          <div className="pv-bento-tile">
            {conResenas ? <>{trust}</> : <><b className="pv-big">+10</b><L w={70} h={4} /></>}
          </div>
        </div>
      );
      break;
    default:
      hero = (
        <div className="pv-hero is-center">
          {badge}
          <h3>{nombre}</h3>
          <p>{subtitulo}</p>
          {ctas}
          {trust}
          <Img icon={RubroIcon} className="is-wide">
            <div className="pv-float-card is-c"><ShoppingBag /> <L w={60} h={4} /></div>
          </Img>
        </div>
      );
  }

  return (
    <div className="nx-pv-wrap">
      <div className="nx-pv-meter">
        <div className="nx-pv-meter-top">
          <span>Vista previa de tu web</span>
          <b>{pct}% definida</b>
        </div>
        <div className="nx-pv-meter-bar"><motion.i animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} /></div>
        {onReorganizar && (
          <div className="nx-pv-tools">
            <span>
              Distribución: <b>{dist.label}</b> <em>({distIdx + 1}/{DISTRIBUCIONES.length})</em>
            </span>
            <motion.button type="button" className="nx-pv-shuffle" onClick={onReorganizar} whileTap={{ scale: 0.94 }}>
              <motion.span key={dist.id} initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
                <Shuffle aria-hidden="true" />
              </motion.span>
              Reorganizar
            </motion.button>
          </div>
        )}
      </div>

      <div className="nx-pv" style={vars}>
        <div className="nx-pv-bar">
          <span /><span /><span />
          <div className="nx-pv-url"><Lock aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.em key={dominio} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}>{dominio}</motion.em>
            </AnimatePresence>
          </div>
        </div>

        <div className="nx-pv-screen" ref={screenRef} aria-hidden="true">
          <div className="pv-page">
            <header className="pv-nav">
              <motion.span key={r.rubro || "none"} className="pv-logo" initial={{ scale: 0, rotate: -120 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 300, damping: 16 }}>
                <RubroIcon />
              </motion.span>
              <strong>{nombre}</strong>
              <nav>{navLinks.map((l, i) => <span key={`${l}-${i}`}>{l}</span>)}</nav>
              <span className="pv-btn is-sm">{tiene("reservas") ? "Reservar" : tiene("tienda") ? "Comprar" : "Escríbenos"}</span>
            </header>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={dist.hero} initial={{ opacity: 0, y: 14, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(6px)" }} transition={{ duration: 0.35 }}>
                {hero}
              </motion.div>
            </AnimatePresence>

            {funciones.length > 0 && (
              <div className="pv-feats">
                <AnimatePresence initial={false}>
                  {funciones.slice(0, 8).map((f) => {
                    const Icon = f.icon!;
                    return (
                      <motion.span layout key={f.id} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}>
                        <Icon /> {f.label.split(" (")[0]}
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            <LayoutGroup>
              <AnimatePresence initial={false}>
                {secciones.map((s, i) => (
                  <motion.section
                    layout
                    key={s.id}
                    data-sec={s.id}
                    className={i % 2 === 0 ? "pv-block is-band" : "pv-block"}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 26 }}
                  >
                    <div className="pv-block-in"><Bloque id={s.id} label={s.label} icon={RubroIcon} alt={i % 2 === 1} /></div>
                  </motion.section>
                ))}
              </AnimatePresence>
            </LayoutGroup>

            <footer className="pv-foot">
              <div className="pv-foot-cols">
                <div className="pv-col"><div className="pv-row is-start"><span className="pv-logo is-sm"><RubroIcon /></span><b>{nombre}</b></div><L w={90} h={4} /><L w={70} h={4} /></div>
                <div className="pv-col"><L w={50} h={5} o={0.55} /><L w={70} h={4} /><L w={60} h={4} /><L w={65} h={4} /></div>
                <div className="pv-col"><L w={50} h={5} o={0.55} /><div className="pv-socials"><span /><span /><span /></div></div>
              </div>
              <div className="pv-foot-bottom">
                <span>© {new Date().getFullYear()} {nombre}</span>
                <span className="pv-foot-links">{pie.map((p) => <em key={p.id}>{p.label}</em>)}</span>
              </div>
            </footer>
          </div>
        </div>

        <AnimatePresence>
          {tiene("whatsapp") && (
            <motion.span className="nx-pv-float" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}>
              <MessageCircle />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
