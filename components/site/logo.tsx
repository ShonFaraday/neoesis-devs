// Logo de Neoesis DEVS®: una "N" formada por una red de puntos conectados,
// con un nodo luminoso arriba a la derecha.

// Coordenadas de la red (en un lienzo de 100 x 100)
export const NODES = {
  L1: [18, 18],
  L2: [18, 50],
  L3: [18, 82],
  D1: [40, 40],
  D2: [60, 61],
  R1: [82, 18], // nodo luminoso
  R2: [82, 50],
  R3: [82, 82],
} as const;

export type NodeId = keyof typeof NODES;

// Conexiones, en el orden en que se dibujan en la animación
export const EDGES: [NodeId, NodeId][] = [
  ["L3", "L2"],
  ["L2", "L1"],
  ["L1", "D1"],
  ["L2", "D1"],
  ["D1", "D2"],
  ["D2", "R3"],
  ["D2", "R2"],
  ["R3", "R2"],
  ["R2", "R1"],
];

export const BRAND_VIOLET = "#9d74ff";
export const BRAND_ORCHID = "#e07bff";
export const BRAND_LIGHT = "#f3f0fb";

type LogoMarkProps = {
  /** Debe ser único si el logo aparece varias veces en la página. */
  gradientId?: string;
  className?: string;
};

// Versión estática (menú, pie de página)
export function LogoMark({ gradientId = "nx-logo-grad", className = "nx-logo-mark" }: LogoMarkProps) {
  return (
    <svg viewBox="4 4 92 92" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="18" y1="0" x2="82" y2="0">
          <stop offset="0" stopColor={BRAND_VIOLET} />
          <stop offset="1" stopColor={BRAND_ORCHID} />
        </linearGradient>
      </defs>
      <g stroke={`url(#${gradientId})`} strokeWidth="5.5" strokeLinecap="round">
        {EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={NODES[a][0]}
            y1={NODES[a][1]}
            x2={NODES[b][0]}
            y2={NODES[b][1]}
          />
        ))}
      </g>
      <g fill={`url(#${gradientId})`}>
        {(Object.keys(NODES) as NodeId[])
          .filter((id) => id !== "R1")
          .map((id) => (
            <circle key={id} cx={NODES[id][0]} cy={NODES[id][1]} r="7" />
          ))}
      </g>
      <circle cx={NODES.R1[0]} cy={NODES.R1[1]} r="9" fill={BRAND_LIGHT} />
    </svg>
  );
}

type LogoProps = {
  gradientId?: string;
};

// Símbolo + nombre (menú y pie de página)
export function Logo({ gradientId }: LogoProps) {
  return (
    <>
      <LogoMark gradientId={gradientId} />
      <span>
        Neoesis <span className="nx-logo-devs">DEVS</span>
        <sup>®</sup>
      </span>
    </>
  );
}
