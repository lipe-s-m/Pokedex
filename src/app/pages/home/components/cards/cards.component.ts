import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../services/pokemon.service';
import { PokemonData } from '../../../../models/PokemonData';
import { PokemonDataList } from '../../../../models/pokemonDataList';
import { SearchService } from '../../../../services/search.service';

@Component({
    selector: 'app-cards',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cards.component.html',
    styleUrls: ['./cards.component.css', './cards.component.responsive.css'],
})
export class CardsComponent implements OnInit {
    // public namePokemon: string = '';
    // public idPokemon: string = '';
    // public imagePokemon: string = '';
    // public atributosPokemon: string[] = [];

    public pokemon: PokemonData;
    public listaPokemons: PokemonData[];
    private listaRegiaoPokemons: PokemonDataList;

    constructor(
        private pokemonService: PokemonService,
        private searchService: SearchService
    ) {
        this.pokemon = {
            id: '',
            name: 'res.name',
            sprites: {
                front_default: '',
            },
            types: [],
        };
        this.listaRegiaoPokemons = {
            region: '',
            quantidadePokemons: 0,
            pokemon_entries: [],
        };
        this.listaPokemons = [];
    }
    ngOnInit(): void {
        this.getAllPokemonsFromRegion('kanto');
        this.searchService.inputSearch$.subscribe((search) => {
            if (search) {
                this.getPokemonByName(search);
            }
        });
        this.searchService.regionSearch$.subscribe((region) => {
            if (region) {
                this.getAllPokemonsFromRegion(region);
            }
        });
    }

    getPokemonByName(namePokemon: string): void {
        this.pokemonService.getPokemonByName(namePokemon).subscribe({
            next: (res) => {
                this.pokemon = {
                    id: res.id,
                    name: res.name,
                    sprites: res.sprites,
                    types: res.types,
                };
                this.listaPokemons.push(this.pokemon);
                console.log(this.listaPokemons);

                this.listaPokemons.sort((a, b) => Number(a.id) - Number(b.id));
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
    getAllPokemonsFromRegion(regionPokemon: string): void {
        this.listaPokemons = [];

        this.pokemonService.getAllPokemonsFromRegion(regionPokemon).subscribe({
            next: (pokemon) => {
                this.listaRegiaoPokemons = {
                    region: regionPokemon,
                    quantidadePokemons: 20,
                    pokemon_entries: pokemon.pokemon_entries,
                };

                let i = 0;
                this.listaRegiaoPokemons.pokemon_entries.forEach((poke) => {
                    ++i;
                    if (i >= 31) return;
                    this.getPokemonByName(poke.pokemon_species.name);
                });
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
