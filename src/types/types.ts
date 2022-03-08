interface IPokemonData {
  name: string;
  sprite: string;
  id: string;
  type?: Array<string>;
  hp?: string;
  attack?: string;
  defense?: string;
  specialAttack?: string;
  specialDefense?: string;
  speed?: string;
  color?: string;
}

interface IPokemonCompleteData {
  originalPokemon?: IPokemonData;
  evolutionChain?: {
    pokemons: Array<IPokemonData>;
  };
}

export { IPokemonData, IPokemonCompleteData };
