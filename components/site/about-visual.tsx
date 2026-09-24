"use client";

import { useEffect, useRef } from "react";
import { NODES, EDGES, BRAND_ORCHID, BRAND_LIGHT, BRAND_VIOLET, type NodeId } from "./logo";

// Logo "vivo" para Quiénes somos: los puntos llegan desde distintos lados,
// se ensamblan en la "N", flotan suavemente y siguen al cursor en profundidad.

const IDS = Object.keys(NODES) as NodeId[];

// Parámetros fijos por punto (para que el movimiento sea siempre igual)
const PARAMS = IDS.map((_, i) => ({
  phase: i * 1.7,
  speed: 0.6 + (i % 3) * 0.18,
  amp: 1.4 + (i % 2) * 0.9,
  depth: 0.5 + ((i * 37) % 10) / 10,
  scatterX: Math.cos(i * 2.3) * 70,
  scatterY: Math.sin(i * 2.3) * 70,
}));

const ASSEMBLE_SECONDS = 1.6;

export function AboutVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const glowRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const positions = IDS.map((id) => [NODES[id][0], NODES[id][1]] as [number, number]);
    const indexOf = (id: NodeId) => IDS.indexOf(id);

    const apply = () => {
      IDS.forEach((id, i) => {
        const [x, y] = positions[i];
        const targets = id === "R1" ? glowRefs.current : [nodeRefs.current[i]];
        targets.forEach((c) => {
          c?.setAttribute("cx", x.toFixed(2));
          c?.setAttribute("cy", y.toFixed(2));
        });
      });
      EDGES.forEach(([a, b], j) => {
        const line = lineRefs.current[j];
        if (!line) return;
        const [x1, y1] = positions[indexOf(a)];
        const [x2, y2] = positions[indexOf(b)];
        line.setAttribute("x1", x1.toFixed(2));
        line.setAttribute("y1", y1.toFixed(2));
        line.setAttribute("x2", x2.toFixed(2));
        line.setAttribute("y2", y2.toFixed(2));
      });
    };

    // Sin animaciones si el usuario lo prefiere
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      wrap.classList.add("is-ready");
      return;
    }

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    let start: number | null = null;
    let raf = 0;
    let visible = false;

    const tick = (now: number) => {
      if (start === null) {
        start = now;
        wrap.classList.add("is-ready");
      }
      const t = (now - start) / 1000;
      const progress = Math.min(t / ASSEMBLE_SECONDS, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;

      IDS.forEach((id, i) => {
        const p = PARAMS[i];
        const [fx, fy] = NODES[id];
        positions[i][0] =
          fx +
          p.scatterX * (1 - ease) +
          Math.sin(t * p.speed + p.phase) * p.amp * ease +
          mouse.x * p.depth * 10;
        positions[i][1] =
          fy +
          p.scatterY * (1 - ease) +
          Math.cos(t * p.speed * 0.9 + p.phase) * p.amp * ease +
          mouse.y * p.depth * 10;
      });

      apply();
      if (visible) raf = requestAnimationFrame(tick);
    };

    // Solo anima mientras la sección está en pantalla
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
      },
      { threshold: 0.2 }
    );
    observer.observe(wrap);

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.ty = (e.clientY - rect.top) / rect.height - 0.5;
    };
    const onLeave = () => {
      mouse.tx = 0;
      mouse.ty = 0;
    };
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="nx-about-visual" aria-hidden="true">
      <div className="nx-about-glow" />
      <svg viewBox="-22 -22 144 144" className="nx-about-svg">
        <defs>
          <linearGradient id="nx-about-grad" gradientUnits="userSpaceOnUse" x1="18" y1="0" x2="82" y2="0">
            <stop offset="0" stopColor={BRAND_VIOLET} />
            <stop offset="1" stopColor={BRAND_ORCHID} />
          </linearGradient>
          <filter id="nx-about-blur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Órbitas con satélites */}
        <g className="nx-orbit nx-orbit-a">
          <circle cx="50" cy="50" r="64" fill="none" stroke="rgba(157,116,255,0.28)" strokeWidth="0.5" strokeDasharray="1 3" />
          <circle cx="114" cy="50" r="2" fill={BRAND_ORCHID} filter="url(#nx-about-blur)" />
        </g>
        <g className="nx-orbit nx-orbit-b">
          <circle cx="50" cy="50" r="54" fill="none" stroke="rgba(224,123,255,0.18)" strokeWidth="0.4" strokeDasharray="0.6 2.4" />
          <circle cx="50" cy="-4" r="1.4" fill={BRAND_LIGHT} filter="url(#nx-about-blur)" />
        </g>

        {/* Red de la "N" */}
        <g className="nx-about-net">
          <g stroke="url(#nx-about-grad)" strokeWidth="3.2" strokeLinecap="round">
            {EDGES.map(([a, b], j) => (
              <line
                key={`${a}-${b}`}
                ref={(el) => {
                  lineRefs.current[j] = el;
                }}
                x1={NODES[a][0]}
                y1={NODES[a][1]}
                x2={NODES[b][0]}
                y2={NODES[b][1]}
              />
            ))}
          </g>
          <g fill="url(#nx-about-grad)">
            {IDS.map((id, i) =>
              id === "R1" ? null : (
                <circle
                  key={id}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  cx={NODES[id][0]}
                  cy={NODES[id][1]}
                  r="4.6"
                />
              )
            )}
          </g>
          <circle
            ref={(el) => {
              glowRefs.current[0] = el;
            }}
            className="nx-node-pulse"
            cx={NODES.R1[0]}
            cy={NODES.R1[1]}
            r="6.4"
            fill={BRAND_ORCHID}
          />
          <circle
            ref={(el) => {
              glowRefs.current[1] = el;
            }}
            cx={NODES.R1[0]}
            cy={NODES.R1[1]}
            r="6.4"
            fill={BRAND_LIGHT}
            filter="url(#nx-about-blur)"
          />
        </g>
      </svg>
    </div>
  );
}
