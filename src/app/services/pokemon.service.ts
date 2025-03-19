import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonData } from '../models/PokemonData';
import { PokemonDataList } from '../models/pokemonDataList';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiBaseUrl: string = '';
  private apiKantoUrl: string = '';
  private apiAlolaUrl: string = '';
  private apiUnovaUrl: string = '';
  private pokemonData: any;

  constructor(private httpClient: HttpClient) {
    this.apiBaseUrl = environment.pokeApiPokemon;
    this.apiKantoUrl = environment.pokeApiPokemonListKanto;
    this.apiAlolaUrl = environment.pokeApiPokemonListAlola;
    this.apiUnovaUrl = environment.pokeApiPokemonListUnova;
  }

  getPokemonByName(pokemonName: string): Observable<PokemonData> {
    this.pokemonData = this.httpClient.get<PokemonData>(
      `${this.apiBaseUrl}/${pokemonName}`
    );
    return this.pokemonData;
  }
  getAllPokemonsFromRegion(region: string): Observable<PokemonDataList> {
    switch (region) {
      case 'kanto':
        return this.httpClient.get<PokemonDataList>(`${this.apiKantoUrl}`);

      case 'alola':
        return this.httpClient.get<PokemonDataList>(`${this.apiAlolaUrl}`);
      case 'unova':
        return this.httpClient.get<PokemonDataList>(`${this.apiUnovaUrl}`);
      default:
        return this.httpClient.get<PokemonDataList>(`${this.apiBaseUrl}`);
    }
  }
}
