"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";

// --- Configuración ---

const PHYSICS = {
  slow: { damping: 40, stiffness: 150, mass: 1.2 },
  cursor: { damping: 25, stiffness: 250, mass: 0.5 },
  warp: { damping: 15, stiffness: 300, mass: 0.2 },
};

// Textura de ruido en base64 (sin dependencias externas)
const NOISE_TEXTURE = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E`;

const WARP_MS = 2000;
// Tiempo extra para que las capas del warp terminen de desvanecerse antes de quitarlas
const WARP_FADE_MS = 700;

export type WarpApi = {
  /** Activa el efecto "warp". Devuelve false si ya estaba activo. */
  warp: () => boolean;
  isWarping: boolean;
};

interface MovingGridProps {
  gridSize?: number;
  scrollSpeed?: number;
  maskRadius?: number;
  className?: string;
  /** Contenido del hero. Puede ser una función para acceder al efecto warp. */
  children?: React.ReactNode | ((api: WarpApi) => React.ReactNode);
}

// OPTIMIZACIÓN: la entrada (aparición del fondo y la cuadrícula) ahora es CSS
// (clases nx-hero-fade y nx-grid-intro), así el inicio se ve sin esperar al JavaScript.
const MovingGrid: React.FC<MovingGridProps> = ({
  gridSize = 100,
  scrollSpeed = 0.4,
  maskRadius = 400,
  className = "",
  children,
}) => {
  const [isWarping, setIsWarping] = useState(false);
  const [warpLayers, setWarpLayers] = useState(false);
  const [size, setSize] = useState({ w: 1920, h: 1080 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inViewRef = useRef(true);
  const reduceMotion = useReducedMotion();

  // --- Valores de movimiento ---
  const gridX = useMotionValue(0);
  const gridY = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);

  const prevMouseX = useRef(0);
  const prevMouseY = useRef(0);

  // Ajusta tamaños al montar y al cambiar el tamaño de la ventana
  useEffect(() => {
    const el = containerRef.current;
    const measure = () => {
      const rect = el?.getBoundingClientRect();
      setSize({ w: rect?.width ?? window.innerWidth, h: rect?.height ?? window.innerHeight });
    };
    measure();
    const rect = el?.getBoundingClientRect();
    const cx = (rect?.width ?? window.innerWidth) / 2;
    const cy = (rect?.height ?? window.innerHeight) / 2;
    mouseX.set(cx);
    mouseY.set(cy);
    prevMouseX.current = cx;
    prevMouseY.current = cy;

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mouseX, mouseY]);

  // OPTIMIZACIÓN: la cuadrícula deja de animarse cuando el inicio no está en pantalla
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // --- Física ---
  const warpSignal = useSpring(0, PHYSICS.warp);

  const lagX = useSpring(mouseX, PHYSICS.cursor);
  const lagY = useSpring(mouseY, PHYSICS.cursor);

  const sprungVelX = useSpring(velocityX, PHYSICS.slow);
  const sprungVelY = useSpring(velocityY, PHYSICS.slow);

  // Inclinación 3D según la posición del mouse
  const rotateXBase = useTransform(mouseY, [0, size.h], [8, -8]);
  const rotateYBase = useTransform(mouseX, [0, size.w], [-8, 8]);

  const finalRotateX = useTransform(
    [rotateXBase, warpSignal],
    ([r, w]) => (r as number) * (1 + (w as number) * 2)
  );
  const finalRotateY = useTransform(
    [rotateYBase, warpSignal],
    ([r, w]) => (r as number) * (1 + (w as number) * 2)
  );

  const sprungRotateX = useSpring(finalRotateX, PHYSICS.slow);
  const sprungRotateY = useSpring(finalRotateY, PHYSICS.slow);

  const animatedGridSize = useTransform(warpSignal, [0, 1], [gridSize, gridSize * 0.8]);
  const contentScale = useTransform(warpSignal, [0, 1], [1, 0.92]);

  // Filtros y capas del efecto warp
  const orbHue = useTransform(warpSignal, [0, 1], [0, 40]);
  const orbSaturate = useTransform(warpSignal, [0, 1], [1, 1.5]);
  const orbFilter = useMotionTemplate`hue-rotate(${orbHue}deg) saturate(${orbSaturate})`;
  const flashOpacity = useTransform(warpSignal, [0, 0.1, 1], [0, 0.4, 0]);
  const tintOpacity = useTransform(warpSignal, [0, 0.2, 0.8], [0, 0.3, 0]);

  // --- Bucle de animación ---
  useAnimationFrame((_, delta) => {
    if (reduceMotion || !inViewRef.current) return;
    const safeDelta = Math.min(delta, 100);

    const normalizedVX = Math.max(-2, Math.min(2, sprungVelX.get() / 100));
    const normalizedVY = Math.max(-2, Math.min(2, sprungVelY.get() / 100));

    const speedMultiplier = 1 + warpSignal.get() * 24;
    const baseForwardDrift = -0.3 * speedMultiplier;
    const cellSize = animatedGridSize.get();

    const moveX = normalizedVX * scrollSpeed * speedMultiplier * (safeDelta / 16);
    const moveY =
      (normalizedVY + baseForwardDrift) * scrollSpeed * speedMultiplier * (safeDelta / 16);

    gridX.set((gridX.get() + moveX) % cellSize);
    gridY.set((gridY.get() + moveY) % cellSize);
  });

  // --- Eventos ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const x = e.clientX - (rect?.left ?? 0);
    const y = e.clientY - (rect?.top ?? 0);

    velocityX.set(x - prevMouseX.current);
    velocityY.set(y - prevMouseY.current);
    mouseX.set(x);
    mouseY.set(y);

    prevMouseX.current = x;
    prevMouseY.current = y;
  };

  const warp = () => {
    if (isWarping) return false;
    setIsWarping(true);
    setWarpLayers(true);
    warpSignal.set(1);
    setTimeout(() => {
      warpSignal.set(0);
      setIsWarping(false);
      // OPTIMIZACIÓN: las capas del warp solo existen mientras se usan
      setTimeout(() => setWarpLayers(false), WARP_FADE_MS);
    }, WARP_MS);
    return true;
  };

  // --- Máscara que ilumina la cuadrícula alrededor del cursor ---
  const maskIntensity = useTransform(warpSignal, [0, 1], [0, 200]);
  const currentMaskRadius = useTransform(warpSignal, [0, 1], [maskRadius, maskRadius * 1.5]);
  const maskImage = useMotionTemplate`radial-gradient(${currentMaskRadius}px circle at ${lagX}px ${lagY}px, rgb(${maskIntensity},${maskIntensity},${maskIntensity}), transparent)`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`nx-hero-fade relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#0c0915] font-sans perspective-distant ${className}`}
    >
      {/* Ruido de fondo */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay"
        style={{ backgroundImage: `url("${NOISE_TEXTURE}")`, backgroundRepeat: "repeat" }}
      />

      {/* Orbes de luz morada (degradados en lugar de desenfoque: mismo aspecto, mucho más livianos) */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ filter: orbFilter }}
        aria-hidden="true"
      >
        <div className="nx-orb nx-orb-violet absolute top-[-35%] left-[-25%] h-[100%] w-[100%]" />
        <div className="nx-orb nx-orb-orchid nx-orb-delay absolute right-[-25%] bottom-[-35%] h-[100%] w-[100%]" />
      </motion.div>

      {/* Cuadrícula 3D (la entrada es CSS; la inclinación la maneja el mouse) */}
      <div className="nx-grid-intro pointer-events-none absolute inset-0 z-10 perspective-distant" aria-hidden="true">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{
            rotateX: sprungRotateX,
            rotateY: sprungRotateY,
            transformOrigin: "center bottom",
          }}
        >
          <GridLayer gridSize={animatedGridSize} x={gridX} y={gridY} strokeColor="rgba(255,255,255,0.03)" />

          <motion.div className="absolute inset-0" style={{ maskImage, WebkitMaskImage: maskImage }}>
            <GridLayer
              gridSize={animatedGridSize}
              x={gridX}
              y={gridY}
              strokeColor="rgba(196,170,255,0.22)"
              strokeWidth={1}
            />
            {warpLayers && (
              <motion.div style={{ opacity: warpSignal }}>
                <GridLayer
                  gridSize={animatedGridSize}
                  x={gridX}
                  y={gridY}
                  strokeColor="rgba(224,123,255,0.85)"
                  strokeWidth={2}
                />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Destellos del warp (solo existen durante el efecto) */}
      {warpLayers && (
        <>
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 bg-white mix-blend-overlay"
            style={{ opacity: flashOpacity }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 bg-[#7c4dff] mix-blend-color-dodge"
            style={{ opacity: tintOpacity }}
            aria-hidden="true"
          />
        </>
      )}

      {/* Contenido */}
      <motion.div
        className="pointer-events-auto relative z-40 mx-auto max-w-5xl space-y-8 px-4 text-center"
        style={{ scale: contentScale }}
      >
        {typeof children === "function" ? children({ warp, isWarping }) : children}
      </motion.div>
    </div>
  );
};

export default MovingGrid;

// ------------------------------------------------------------------
// Capa de cuadrícula SVG
// ------------------------------------------------------------------

interface GridLayerProps {
  gridSize: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  strokeColor: string;
  strokeWidth?: number;
}

const GridLayer = React.memo(function GridLayer({
  gridSize,
  x,
  y,
  strokeColor,
  strokeWidth = 1,
}: GridLayerProps) {
  // Limpia el id para que funcione dentro de url(#...) en cualquier navegador
  const patternId = `nx-grid-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const pathD = useTransform(gridSize, (s) => `M ${s} 0 L 0 0 0 ${s}`);

  return (
    <div className="pointer-events-none absolute inset-0 h-full w-full select-none">
      <svg className="h-full w-full bg-transparent">
        <defs>
          <motion.pattern
            id={patternId}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <motion.path
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              shapeRendering="geometricPrecision"
            />
          </motion.pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
});
