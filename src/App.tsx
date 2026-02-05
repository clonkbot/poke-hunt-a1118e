import { useState, useEffect, useCallback } from 'react';
import Map from './components/Map';
import PokemonCard from './components/PokemonCard';
import CatchModal from './components/CatchModal';
import Pokeball from './components/Pokeball';
import { Pokemon, generateRandomPokemon } from './components/pokemonData';

function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [caughtPokemon, setCaughtPokemon] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showPokedex, setShowPokedex] = useState(false);
  const [catchResult, setCatchResult] = useState<'success' | 'fail' | null>(null);

  useEffect(() => {
    const initialPokemon = Array.from({ length: 8 }, () => generateRandomPokemon());
    setPokemon(initialPokemon);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPokemon(prev => {
        if (prev.length < 12) {
          return [...prev, generateRandomPokemon()];
        }
        return prev;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePokemonClick = useCallback((p: Pokemon) => {
    setSelectedPokemon(p);
    setCatchResult(null);
  }, []);

  const attemptCatch = useCallback(() => {
    if (!selectedPokemon) return;

    const catchChance = Math.random();
    const threshold = 0.4 + (selectedPokemon.rarity === 'legendary' ? 0.4 : selectedPokemon.rarity === 'rare' ? 0.2 : 0);

    if (catchChance > threshold) {
      setCatchResult('success');
      setCaughtPokemon(prev => [...prev, selectedPokemon]);
      setPokemon(prev => prev.filter(p => p.id !== selectedPokemon.id));
      setTimeout(() => {
        setSelectedPokemon(null);
        setCatchResult(null);
      }, 1500);
    } else {
      setCatchResult('fail');
      setTimeout(() => setCatchResult(null), 1000);
    }
  }, [selectedPokemon]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white overflow-hidden relative">
      {/* Pixel noise overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Animated stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between border-b-4 border-yellow-400/30">
        <div className="flex items-center gap-3 md:gap-4">
          <Pokeball size={32} className="animate-bounce md:w-10 md:h-10" />
          <h1 className="font-pixel text-lg md:text-2xl text-yellow-400 tracking-wider drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
            POKÉ HUNT
          </h1>
        </div>
        <button
          onClick={() => setShowPokedex(!showPokedex)}
          className="relative px-3 py-2 md:px-4 md:py-2 bg-red-600 hover:bg-red-500 rounded-lg font-pixel text-xs md:text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-900/50 border-b-4 border-red-800 hover:border-red-700"
        >
          POKÉDEX
          {caughtPokemon.length > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-yellow-400 text-indigo-950 rounded-full text-[10px] md:text-xs flex items-center justify-center font-bold animate-pulse">
              {caughtPokemon.length}
            </span>
          )}
        </button>
      </header>

      {/* Main content */}
      <main className="relative z-10 p-4 md:p-8 flex flex-col lg:flex-row gap-4 md:gap-6 h-[calc(100vh-120px)] md:h-[calc(100vh-140px)]">
        {/* Map section */}
        <div className="flex-1 min-h-[300px] md:min-h-0 relative rounded-2xl overflow-hidden border-4 border-indigo-500/50 shadow-2xl shadow-indigo-900/50">
          <Map pokemon={pokemon} onPokemonClick={handlePokemonClick} />
          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 bg-indigo-950/90 backdrop-blur px-3 py-2 md:px-4 md:py-2 rounded-lg border-2 border-indigo-500/50">
            <p className="font-pixel text-[10px] md:text-xs text-indigo-300">
              <span className="text-green-400 animate-pulse">●</span> {pokemon.length} WILD POKÉMON NEARBY
            </p>
          </div>
        </div>

        {/* Sidebar - Pokedex on mobile overlay */}
        {showPokedex && (
          <div className="fixed lg:relative inset-0 lg:inset-auto z-40 lg:z-auto bg-indigo-950/95 lg:bg-transparent lg:w-80 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 lg:hidden border-b-2 border-indigo-500/30">
              <h2 className="font-pixel text-lg text-yellow-400">POKÉDEX</h2>
              <button onClick={() => setShowPokedex(false)} className="p-2 text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 lg:p-0">
              <div className="hidden lg:block mb-4">
                <h2 className="font-pixel text-base text-yellow-400">CAUGHT</h2>
              </div>
              {caughtPokemon.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="font-body text-indigo-400 text-center px-4">
                    No Pokémon caught yet!<br />
                    <span className="text-sm opacity-70">Tap on a Pokémon on the map to catch it.</span>
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                  {caughtPokemon.map((p, i) => (
                    <PokemonCard key={`${p.id}-${i}`} pokemon={p} caught />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Desktop sidebar always visible */}
        <div className="hidden lg:flex w-80 flex-col bg-indigo-950/50 rounded-2xl border-4 border-indigo-500/30 p-4 overflow-hidden">
          <h2 className="font-pixel text-base text-yellow-400 mb-4">CAUGHT POKÉMON</h2>
          {caughtPokemon.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-body text-indigo-400 text-center">
                No Pokémon caught yet!<br />
                <span className="text-sm opacity-70">Click on a Pokémon to catch it.</span>
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto grid grid-cols-2 gap-3 content-start">
              {caughtPokemon.map((p, i) => (
                <PokemonCard key={`${p.id}-${i}`} pokemon={p} caught />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Catch Modal */}
      {selectedPokemon && (
        <CatchModal
          pokemon={selectedPokemon}
          onClose={() => {
            setSelectedPokemon(null);
            setCatchResult(null);
          }}
          onCatch={attemptCatch}
          catchResult={catchResult}
        />
      )}

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 py-2 px-4 text-center">
        <p className="font-body text-[10px] md:text-xs text-indigo-400/50">
          Requested by <a href="https://twitter.com/0xPaulius" className="hover:text-indigo-300 transition-colors">@0xPaulius</a> · Built by <a href="https://twitter.com/clonkbot" className="hover:text-indigo-300 transition-colors">@clonkbot</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
