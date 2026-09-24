"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NODES, EDGES, BRAND_VIOLET, BRAND_ORCHID, BRAND_LIGHT, type NodeId } from "./logo";

// Orden en que aparecen los puntos (siguiendo el trazo de la "N")
const NODE_ORDER: NodeId[] = ["L3", "L2", "L1", "D1", "D2", "R3", "R2", "R1"];

// Recorrido completo de la "N" para los pulsos de luz
const N_PATH = "M18 82 L18 18 L82 82 L82 18";

const BASE_DELAY = 0.5; // espera a que aparezca el inicio
const NODE_STEP = 0.12;
const EDGE_START = BASE_DELAY + 0.35;
const EDGE_STEP = 0.1;
const GLOW_DELAY = EDGE_START + EDGES.length * EDGE_STEP + 0.4;

export function AnimatedLogo() {
  const reduce = useReducedMotion();
  const others = NODE_ORDER.filter((id) => id !== "R1");

  return (
    <svg
      viewBox="0 0 100 100"
      className="nx-hero-logo"
      role="img"
      aria-label="Neoesis DEVS®"
    >
      <defs>
        <linearGradient id="nx-hero-grad" gradientUnits="userSpaceOnUse" x1="18" y1="0" x2="82" y2="0">
          <stop offset="0" stopColor={BRAND_VIOLET} />
          <stop offset="1" stopColor={BRAND_ORCHID} />
        </linearGradient>
        <filter id="nx-hero-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Conexiones que se dibujan */}
      <g stroke="url(#nx-hero-grad)" strokeWidth="3.8" strokeLinecap="round" fill="none">
        {EDGES.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: EDGE_START + i * EDGE_STEP, ease: "easeOut" }}
          />
        ))}
      </g>

      {/* 2. Puntos que aparecen con un rebote */}
      <g fill="url(#nx-hero-grad)">
        {others.map((id, i) => (
          <motion.circle
            key={id}
            cx={NODES[id][0]}
            cy={NODES[id][1]}
            r="5.4"
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: BASE_DELAY + i * NODE_STEP,
              type: "spring",
              stiffness: 320,
              damping: 14,
            }}
          />
        ))}
      </g>

      {/* 3. Nodo luminoso que se enciende y late */}
      <motion.g
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: GLOW_DELAY, type: "spring", stiffness: 260, damping: 12 }}
      >
        <circle
          className="nx-node-pulse"
          cx={NODES.R1[0]}
          cy={NODES.R1[1]}
          r="7.4"
          fill={BRAND_ORCHID}
        />
        <circle
          cx={NODES.R1[0]}
          cy={NODES.R1[1]}
          r="7.4"
          fill={BRAND_LIGHT}
          filter="url(#nx-hero-glow)"
        />
      </motion.g>

      {/* 4. Pulsos de luz que recorren la red */}
      {!reduce &&
        [0, 1.6].map((offset) => (
          <circle key={offset} r="2.4" fill={BRAND_LIGHT} opacity="0" filter="url(#nx-hero-glow)">
            <animateMotion
              path={N_PATH}
              dur="3.2s"
              begin={`${GLOW_DELAY + 0.6 + offset}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.1;0.85;1"
              dur="3.2s"
              begin={`${GLOW_DELAY + 0.6 + offset}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
    </svg>
  );
}
