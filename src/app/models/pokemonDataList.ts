import { PokemonData } from './PokemonData';

export type PokemonDataList = {
  region: string;
  quantidadePokemons?: number;
  pokemon_entries: {
    entry_number: number;
    pokemon_species: {
      name: string;
      url: string;
    };
  }[];
};
