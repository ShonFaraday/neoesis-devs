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

  // Guarda la posición del cursor en variables CSS
  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const card = cardRef.current;
      if (!card) return;
      card.style.setProperty("--x", e.clientX.toFixed(2));
      card.style.setProperty("--xp", (e.clientX / window.innerWidth).toFixed(2));
      card.style.setProperty("--y", e.clientY.toFixed(2));
      card.style.setProperty("--yp", (e.clientY / window.innerHeight).toFixed(2));
    };

    document.addEventListener("pointermove", syncPointer);
    return () => document.removeEventListener("pointermove", syncPointer);
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
      calc(var(--x, 0) * 1px)
      calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.1)), transparent
    )`,
    backgroundColor: "var(--backdrop, transparent)",
    backgroundSize: "calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))",
    backgroundPosition: "50% 50%",
    backgroundAttachment: "fixed",
    border: "var(--border-size) solid var(--backup-border)",
    position: "relative",
    ...(width !== undefined && { width: typeof width === "number" ? `${width}px` : width }),
    ...(height !== undefined && { height: typeof height === "number" ? `${height}px` : height }),
    ...style,
  } as CSSProperties;

  const classes = [
    customSize ? "" : `${sizeMap[size]} aspect-[3/4]`,
    "relative rounded-[14px] shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px]",
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
