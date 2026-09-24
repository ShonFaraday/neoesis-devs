// Logo de Neoesis DEVS®: una "N" de trazo continuo con un destello,
// sobre un fondo degradado violeta. gradientId debe ser único por uso.

type LogoMarkProps = {
  gradientId?: string;
  className?: string;
};

export function LogoMark({ gradientId = "nx-logo-grad", className = "nx-logo-mark" }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9d74ff" />
          <stop offset="1" stopColor="#e07bff" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${gradientId})`} />
      <path
        d="M12 28V12l16 16V12"
        fill="none"
        stroke="#140b2b"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="8.5" r="2.4" fill="#f3f0fb" />
    </svg>
  );
}

type LogoProps = {
  gradientId?: string;
};

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
