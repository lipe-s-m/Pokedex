export type PokemonData = {
  sprites: {
    front_default: string;
  };
  id: string;
  name: string;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};
