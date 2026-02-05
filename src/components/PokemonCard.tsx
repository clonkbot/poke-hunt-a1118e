import { Pokemon } from './pokemonData';

interface PokemonCardProps {
  pokemon: Pokemon;
  caught?: boolean;
}

export default function PokemonCard({ pokemon, caught }: PokemonCardProps) {
  const rarityBorder = pokemon.rarity === 'legendary'
    ? 'border-yellow-400 shadow-yellow-400/30'
    : pokemon.rarity === 'rare'
    ? 'border-purple-500 shadow-purple-500/30'
    : 'border-indigo-500/50 shadow-indigo-500/20';

  const rarityBg = pokemon.rarity === 'legendary'
    ? 'bg-gradient-to-br from-yellow-900/50 to-orange-900/50'
    : pokemon.rarity === 'rare'
    ? 'bg-gradient-to-br from-purple-900/50 to-indigo-900/50'
    : 'bg-gradient-to-br from-indigo-900/50 to-slate-900/50';

  return (
    <div
      className={`relative rounded-xl border-2 ${rarityBorder} ${rarityBg} p-2 md:p-3 shadow-lg transition-all hover:scale-105 cursor-pointer overflow-hidden`}
    >
      {/* Shine effect for rare/legendary */}
      {pokemon.rarity !== 'common' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shimmer" />
      )}

      {/* Caught stamp */}
      {caught && (
        <div className="absolute top-1 right-1 w-5 h-5 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Pokemon sprite */}
      <div className="w-full aspect-square flex items-center justify-center mb-1 md:mb-2">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-12 h-12 md:w-14 md:h-14 object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Name */}
      <p className="font-pixel text-[8px] md:text-[10px] text-white text-center truncate mb-1">
        {pokemon.name}
      </p>

      {/* Type badge */}
      <div
        className="text-center py-0.5 md:py-1 rounded text-[8px] md:text-[10px] font-body font-semibold"
        style={{ backgroundColor: `${pokemon.typeColor}40`, color: pokemon.typeColor }}
      >
        {pokemon.type}
      </div>

      {/* CP */}
      <div className="mt-1 md:mt-2 text-center">
        <span className="font-pixel text-[8px] md:text-[10px] text-yellow-400">CP {pokemon.cp}</span>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
}
