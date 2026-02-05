interface PokeballProps {
  size?: number;
  className?: string;
}

export default function Pokeball({ size = 40, className = '' }: PokeballProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }}
    >
      {/* Top half - Red */}
      <path
        d="M50 5 A45 45 0 0 1 95 50 L5 50 A45 45 0 0 1 50 5"
        fill="#EF4444"
        stroke="#1E293B"
        strokeWidth="3"
      />

      {/* Bottom half - White */}
      <path
        d="M5 50 A45 45 0 0 0 95 50 L5 50"
        fill="#F8FAFC"
        stroke="#1E293B"
        strokeWidth="3"
      />

      {/* Center band */}
      <rect x="5" y="46" width="90" height="8" fill="#1E293B" />

      {/* Center button outer ring */}
      <circle cx="50" cy="50" r="15" fill="#F8FAFC" stroke="#1E293B" strokeWidth="4" />

      {/* Center button inner */}
      <circle cx="50" cy="50" r="8" fill="#1E293B" />

      {/* Highlight */}
      <ellipse cx="35" cy="25" rx="8" ry="5" fill="rgba(255,255,255,0.4)" transform="rotate(-30 35 25)" />
    </svg>
  );
}
