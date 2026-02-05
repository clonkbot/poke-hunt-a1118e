import { useState } from 'react';
import { Pokemon } from './pokemonData';
import Pokeball from './Pokeball';

interface CatchModalProps {
  pokemon: Pokemon;
  onClose: () => void;
  onCatch: () => void;
  catchResult: 'success' | 'fail' | null;
}

export default function CatchModal({ pokemon, onClose, onCatch, catchResult }: CatchModalProps) {
  const [throwing, setThrowing] = useState(false);

  const handleThrow = () => {
    if (throwing || catchResult === 'success') return;
    setThrowing(true);
    setTimeout(() => {
      onCatch();
      setThrowing(false);
    }, 800);
  };

  const rarityLabel = pokemon.rarity === 'legendary' ? 'LEGENDARY' : pokemon.rarity === 'rare' ? 'RARE' : 'COMMON';
  const rarityColor = pokemon.rarity === 'legendary' ? 'text-yellow-400' : pokemon.rarity === 'rare' ? 'text-purple-400' : 'text-green-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full max-w-sm bg-gradient-to-b from-indigo-900 to-slate-900 rounded-2xl border-4 border-indigo-500 shadow-2xl shadow-indigo-500/30 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="pt-6 pb-2 text-center">
          <span className={`font-pixel text-xs ${rarityColor}`}>{rarityLabel}</span>
          <h2 className="font-pixel text-xl md:text-2xl text-white mt-1">{pokemon.name}</h2>
          <p className="font-body text-indigo-300 text-sm mt-1">CP {pokemon.cp}</p>
        </div>

        {/* Pokemon display area */}
        <div className="relative h-48 md:h-56 flex items-center justify-center">
          {/* Background glow */}
          <div
            className={`absolute w-32 h-32 md:w-40 md:h-40 rounded-full blur-3xl opacity-50 ${
              pokemon.rarity === 'legendary' ? 'bg-yellow-500' :
              pokemon.rarity === 'rare' ? 'bg-purple-500' : 'bg-green-500'
            }`}
          />

          {/* Pokemon sprite */}
          <div
            className={`relative transition-all duration-500 ${
              catchResult === 'success' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            <img
              src={pokemon.sprite}
              alt={pokemon.name}
              className="w-32 h-32 md:w-40 md:h-40 object-contain animate-bounce-slow"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Throwing pokeball animation */}
          {throwing && (
            <div className="absolute animate-throw">
              <Pokeball size={48} />
            </div>
          )}

          {/* Success animation */}
          {catchResult === 'success' && (
            <div className="absolute flex flex-col items-center animate-success">
              <Pokeball size={64} />
              <span className="font-pixel text-yellow-400 text-sm mt-4 animate-pulse">GOTCHA!</span>
            </div>
          )}

          {/* Fail animation */}
          {catchResult === 'fail' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-pixel text-red-400 text-lg animate-shake">ESCAPED!</span>
            </div>
          )}
        </div>

        {/* Type badge */}
        <div className="flex justify-center mb-4">
          <span
            className="px-4 py-1 rounded-full font-body text-sm font-semibold"
            style={{ backgroundColor: `${pokemon.typeColor}40`, color: pokemon.typeColor }}
          >
            {pokemon.type}
          </span>
        </div>

        {/* Catch button */}
        <div className="p-4 md:p-6 bg-indigo-950/50">
          <button
            onClick={handleThrow}
            disabled={throwing || catchResult === 'success'}
            className={`w-full py-3 md:py-4 rounded-xl font-pixel text-sm md:text-base transition-all ${
              throwing || catchResult === 'success'
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/50 border-b-4 border-red-800 hover:border-red-700 active:border-b-0 active:translate-y-1'
            }`}
          >
            {catchResult === 'success' ? 'CAUGHT!' : throwing ? 'THROWING...' : 'THROW POKÉBALL'}
          </button>

          {pokemon.rarity !== 'common' && catchResult !== 'success' && (
            <p className="text-center mt-3 font-body text-xs text-indigo-400">
              {pokemon.rarity === 'legendary' ? 'Very hard to catch!' : 'Harder to catch than normal'}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes throw {
          0% { transform: translateY(100px) scale(0.5); opacity: 1; }
          50% { transform: translateY(-20px) scale(1); opacity: 1; }
          100% { transform: translateY(0) scale(0.8); opacity: 1; }
        }
        .animate-throw {
          animation: throw 0.6s ease-out forwards;
        }

        @keyframes success {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-success {
          animation: success 0.5s ease-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out 2;
        }
      `}</style>
    </div>
  );
}
