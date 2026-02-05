import { Pokemon } from './pokemonData';

interface MapProps {
  pokemon: Pokemon[];
  onPokemonClick: (p: Pokemon) => void;
}

export default function Map({ pokemon, onPokemonClick }: MapProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Grass patches */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`grass-${i}`}
          className="absolute rounded-full bg-green-600/30"
          style={{
            width: `${30 + Math.random() * 60}px`,
            height: `${30 + Math.random() * 60}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Trees/bushes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`tree-${i}`}
          className="absolute text-2xl md:text-3xl select-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            transform: 'translate(-50%, -50%)',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
          }}
        >
          🌳
        </div>
      ))}

      {/* Water puddles */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`water-${i}`}
          className="absolute rounded-full bg-blue-500/40 animate-pulse"
          style={{
            width: `${50 + Math.random() * 40}px`,
            height: `${30 + Math.random() * 20}px`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}

      {/* Pokemon markers */}
      {pokemon.map((p) => (
        <button
          key={p.id}
          onClick={() => onPokemonClick(p)}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-125 active:scale-110 group"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `float ${2 + Math.random()}s ease-in-out infinite`,
          }}
        >
          {/* Glow effect based on rarity */}
          <div
            className={`absolute inset-0 rounded-full blur-lg transition-opacity group-hover:opacity-100 ${
              p.rarity === 'legendary' ? 'opacity-80 bg-yellow-400' :
              p.rarity === 'rare' ? 'opacity-60 bg-purple-500' :
              'opacity-40 bg-green-400'
            }`}
            style={{ transform: 'scale(1.5)' }}
          />

          {/* Pokemon sprite */}
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <img
              src={p.sprite}
              alt={p.name}
              className="w-full h-full object-contain drop-shadow-lg pixelated"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Rarity indicator */}
          {p.rarity === 'legendary' && (
            <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full animate-ping" />
          )}
          {p.rarity === 'rare' && (
            <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-purple-500 rounded-full animate-pulse" />
          )}
        </button>
      ))}

      {/* Center marker (player) */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-500 border-4 border-white shadow-lg shadow-blue-500/50 animate-pulse flex items-center justify-center">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[8px] md:text-[10px] text-white bg-blue-600 px-2 py-1 rounded whitespace-nowrap">
          YOU
        </div>
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-8px); }
        }
      `}</style>
    </div>
  );
}
