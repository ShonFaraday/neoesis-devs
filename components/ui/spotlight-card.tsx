"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Tarjeta con luz que sigue al cursor (spotlight) sobre el fondo y el borde.
// Los estilos de los bordes brillantes están en app/neoesis.css ([data-glow]).

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
  // Colores de la marca: pasa de violeta a orquídea según la posición del cursor
  violeta: { base: 255, spread: 40 },
  // Tono cian/azul para el portafolio
  cian: { base: 185, spread: 60 },
};

const sizeMap = {
  sm: "w-48 h-64",
  md: "w-64 h-80",
  lg: "w-80 h-96",
};

// ------------------------------------------------------------------
// OPTIMIZACIÓN: un solo "escucha" del cursor para todas las tarjetas,
// actualizado como máximo una vez por fotograma. Las coordenadas se
// calculan relativas a cada tarjeta (antes se usaba background-attachment:
// fixed, que obliga a repintar las tarjetas en cada scroll).
// ------------------------------------------------------------------
const cards = new Set<HTMLElement>();
let pointer: { x: number; y: number } | null = null;
let frame = 0;

function paint() {
  frame = 0;
  if (!pointer) return;
  const { x, y } = pointer;
  const vh = window.innerHeight;
  const xp = (x / window.innerWidth).toFixed(2);
  const yp = (y / vh).toFixed(2);

  // Primero se leen todas las posiciones y luego se escriben (evita recálculos extra)
  const updates: [HTMLElement, number, number][] = [];
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.bottom < -400 || rect.top > vh + 400) return; // fuera de pantalla
    updates.push([card, x - rect.left, y - rect.top]);
  });
  updates.forEach(([card, lx, ly]) => {
    card.style.setProperty("--x", lx.toFixed(1));
    card.style.setProperty("--y", ly.toFixed(1));
    card.style.setProperty("--xp", xp);
    card.style.setProperty("--yp", yp);
  });
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(paint);
}

function onPointerMove(e: PointerEvent) {
  pointer = { x: e.clientX, y: e.clientY };
  schedule();
}

function register(card: HTMLElement) {
  if (cards.size === 0) {
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true });
  }
  cards.add(card);
  schedule();
  return () => {
    cards.delete(card);
    if (cards.size === 0) {
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", schedule);
    }
  };
}

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: keyof typeof glowColorMap;
  size?: keyof typeof sizeMap;
  width?: string | number;
  height?: string | number;
  /** Si es true, ignora "size" y usa width/height o className */
  customSize?: boolean;
  /** Estilos extra (por ejemplo, variables CSS como --backup-border) */
  style?: CSSProperties;
}

export function GlowCard({
  children,
  className = "",
  glowColor = "violeta",
  size = "md",
  width,
  height,
  customSize = false,
  style,
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    return register(card);
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const baseStyles = {
    "--base": base,
    "--spread": spread,
    "--radius": "14",
    "--border": "2",
    "--backdrop": "hsl(260 45% 10% / 0.65)",
    "--backup-border": "var(--nx-border)",
    "--size": "220",
    "--outer": "1",
    "--border-size": "calc(var(--border, 2) * 1px)",
    "--spotlight-size": "calc(var(--size, 150) * 1px)",
    "--hue": "calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))",
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, -9999) * 1px)
      calc(var(--y, -9999) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundOrigin: "border-box",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === "number" ? `${height}px` : height }),
    ...style,
  } as CSSProperties;

  const classes = [
    customSize ? "" : `${sizeMap[size]} aspect-[3/4]`,
    "relative rounded-[14px] shadow-[0_1rem_2rem_-1rem_black]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={cardRef} data-glow style={baseStyles} className={classes}>
      <div data-glow aria-hidden="true" />
      {children}
    </div>
  );
}
