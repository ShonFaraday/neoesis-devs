"use client";

import { memo, useCallback, useLayoutEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Opcion } from "@/lib/cotizador";

type ChipProps = {
  id: string;
  label: string;
  icon?: LucideIcon;
  desc?: string;
  selected: boolean;
  onToggle: (id: string) => void;
  multi?: boolean;
  variant?: "chip" | "card";
  style?: CSSProperties;
  children?: ReactNode;
};

// Casilla seleccionable. Las animaciones son 100% CSS (más livianas que JS):
// el ícono hace un pequeño giro y el check aparece con rebote al marcar.
export const Chip = memo(function Chip({ id, label, icon: Icon, desc, selected, onToggle, multi = true, variant = "chip", style, children }: ChipProps) {
  return (
    <button
      type="button"
      role={multi ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={() => onToggle(id)}
      className={cn("nx-chip", variant === "card" && "nx-chip-card", selected && "is-on")}
      style={style}
    >
      {children}
      {Icon && (
        <span className="nx-chip-ico">
          <Icon aria-hidden="true" />
        </span>
      )}
      <span className="nx-chip-text">
        <span className="nx-chip-label">{label}</span>
        {desc && <span className="nx-chip-desc">{desc}</span>}
      </span>
      <span className="nx-chip-check" aria-hidden="true">
        <span className="nx-chip-check-in">
          <Check />
        </span>
      </span>
    </button>
  );
});

type GrupoProps = {
  opciones: Opcion[];
  label: string;
  className?: string;
  variant?: "chip" | "card";
} & (
  | { multi: true; value: string[]; onChange: (v: string[]) => void }
  | { multi?: false; value: string; onChange: (v: string) => void }
);

export function GrupoOpciones(props: GrupoProps) {
  const { opciones, label, className, variant } = props;
  // Guarda la versión más reciente de las props para que el onToggle sea
  // estable y memo evite re-renderizar las casillas que no cambian.
  const ultimo = useRef(props);
  useLayoutEffect(() => {
    ultimo.current = props;
  });
  const toggle = useCallback((id: string) => {
    const p = ultimo.current;
    if (p.multi) {
      p.onChange(p.value.includes(id) ? p.value.filter((v) => v !== id) : [...p.value, id]);
    } else {
      p.onChange(p.value === id ? "" : id);
    }
  }, []);

  return (
    <div role={props.multi ? "group" : "radiogroup"} aria-label={label} className={cn("nx-chips", className)}>
      {opciones.map((o) => (
        <Chip
          key={o.id}
          label={o.label}
          icon={o.icon}
          desc={o.desc}
          selected={props.multi ? props.value.includes(o.id) : props.value === o.id}
          id={o.id}
          onToggle={toggle}
          multi={!!props.multi}
          variant={variant}
        />
      ))}
    </div>
  );
}

// Convierte una lista de textos en opciones (id = texto).
export const deTextos = (lista: string[]): Opcion[] => lista.map((t) => ({ id: t, label: t }));

type CampoProps = { label: ReactNode; hint?: ReactNode; htmlFor?: string; children: ReactNode; className?: string; contador?: number };

export function Campo({ label, hint, htmlFor, children, className, contador }: CampoProps) {
  return (
    <div className={cn("nx-field", className)}>
      <div className="nx-field-head">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="nx-field-label">{label}</label>
        ) : (
          <span className="nx-field-label">{label}</span>
        )}
        <AnimatePresence>
          {!!contador && (
            <motion.span
              key={contador}
              className="nx-field-count"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {contador} {contador === 1 ? "elegida" : "elegidas"}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {hint && <p className="nx-field-hint">{hint}</p>}
      {children}
    </div>
  );
}

// Aparece / desaparece con altura animada.
export function Desplegable({ abierto, children }: { abierto: boolean; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      {abierto && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ overflow: "hidden" }}
        >
          <div className="nx-desplegable">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
