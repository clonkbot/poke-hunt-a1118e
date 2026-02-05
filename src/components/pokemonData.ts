export interface Pokemon {
  id: string;
  name: string;
  sprite: string;
  type: string;
  typeColor: string;
  rarity: 'common' | 'rare' | 'legendary';
  cp: number;
  x: number;
  y: number;
}

const pokemonList = [
  { name: 'Pikachu', type: 'Electric', typeColor: '#F7D02C', rarity: 'rare' as const },
  { name: 'Bulbasaur', type: 'Grass', typeColor: '#7AC74C', rarity: 'common' as const },
  { name: 'Charmander', type: 'Fire', typeColor: '#EE8130', rarity: 'common' as const },
  { name: 'Squirtle', type: 'Water', typeColor: '#6390F0', rarity: 'common' as const },
  { name: 'Eevee', type: 'Normal', typeColor: '#A8A77A', rarity: 'common' as const },
  { name: 'Jigglypuff', type: 'Fairy', typeColor: '#D685AD', rarity: 'common' as const },
  { name: 'Meowth', type: 'Normal', typeColor: '#A8A77A', rarity: 'common' as const },
  { name: 'Psyduck', type: 'Water', typeColor: '#6390F0', rarity: 'common' as const },
  { name: 'Geodude', type: 'Rock', typeColor: '#B6A136', rarity: 'common' as const },
  { name: 'Gastly', type: 'Ghost', typeColor: '#735797', rarity: 'rare' as const },
  { name: 'Dratini', type: 'Dragon', typeColor: '#6F35FC', rarity: 'rare' as const },
  { name: 'Mewtwo', type: 'Psychic', typeColor: '#F95587', rarity: 'legendary' as const },
  { name: 'Mew', type: 'Psychic', typeColor: '#F95587', rarity: 'legendary' as const },
  { name: 'Snorlax', type: 'Normal', typeColor: '#A8A77A', rarity: 'rare' as const },
  { name: 'Gengar', type: 'Ghost', typeColor: '#735797', rarity: 'rare' as const },
  { name: 'Magikarp', type: 'Water', typeColor: '#6390F0', rarity: 'common' as const },
  { name: 'Gyarados', type: 'Water', typeColor: '#6390F0', rarity: 'rare' as const },
  { name: 'Lapras', type: 'Ice', typeColor: '#96D9D6', rarity: 'rare' as const },
  { name: 'Articuno', type: 'Ice', typeColor: '#96D9D6', rarity: 'legendary' as const },
  { name: 'Zapdos', type: 'Electric', typeColor: '#F7D02C', rarity: 'legendary' as const },
  { name: 'Moltres', type: 'Fire', typeColor: '#EE8130', rarity: 'legendary' as const },
];

const spriteMap: Record<string, string> = {
  'Pikachu': '25',
  'Bulbasaur': '1',
  'Charmander': '4',
  'Squirtle': '7',
  'Eevee': '133',
  'Jigglypuff': '39',
  'Meowth': '52',
  'Psyduck': '54',
  'Geodude': '74',
  'Gastly': '92',
  'Dratini': '147',
  'Mewtwo': '150',
  'Mew': '151',
  'Snorlax': '143',
  'Gengar': '94',
  'Magikarp': '129',
  'Gyarados': '130',
  'Lapras': '131',
  'Articuno': '144',
  'Zapdos': '145',
  'Moltres': '146',
};

export function generateRandomPokemon(): Pokemon {
  const rarityRoll = Math.random();
  let filteredList = pokemonList;

  if (rarityRoll < 0.6) {
    filteredList = pokemonList.filter(p => p.rarity === 'common');
  } else if (rarityRoll < 0.9) {
    filteredList = pokemonList.filter(p => p.rarity === 'rare');
  } else {
    filteredList = pokemonList.filter(p => p.rarity === 'legendary');
  }

  const selected = filteredList[Math.floor(Math.random() * filteredList.length)];
  const spriteId = spriteMap[selected.name];

  const baseCp = selected.rarity === 'legendary' ? 2000 : selected.rarity === 'rare' ? 800 : 200;
  const cp = baseCp + Math.floor(Math.random() * baseCp);

  return {
    id: `${selected.name}-${Date.now()}-${Math.random()}`,
    name: selected.name,
    sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${spriteId}.png`,
    type: selected.type,
    typeColor: selected.typeColor,
    rarity: selected.rarity,
    cp,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
  };
}
