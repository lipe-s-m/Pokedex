import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../../../services/pokemon.service';
import { PokemonData } from '../../../../models/PokemonData';
import { PokemonDataList } from '../../../../models/pokemonDataList';
import { SearchService } from '../../../../services/search.service';
import { myPokedex } from '../../../../data/datafake';

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
    public pokedexIsActive: boolean = false;

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

    getMyPokedex(pokemon: PokemonData | null) {
        this.searchService.regionSearch$.subscribe({
            next: (res) => {
                if (pokemon && !myPokedex.includes(pokemon)) {
                    myPokedex.push(pokemon);
                }
                this.listaPokemons = [];
                this.listaPokemons = [...myPokedex];
                console.log(myPokedex);
                console.log(this.listaPokemons);
            },
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
                if (this.pokedexIsActive) {
                    this.getMyPokedex(this.pokemon);
                    console.log('myPokedex');
                    return;
                }
                this.listaPokemons.push(this.pokemon);
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
                if (regionPokemon === 'myPokedex') {
                    this.pokedexIsActive = true;
                    console.log('sou a miois', this.pokedexIsActive);
                    this.listaPokemons = [...myPokedex];
                    return;
                }

                this.pokedexIsActive = false;
                this.listaRegiaoPokemons = {
                    region: regionPokemon,
                    quantidadePokemons: 20,
                    pokemon_entries: pokemon.pokemon_entries,
                };
                console.log(regionPokemon);

                console.log(this.pokedexIsActive);

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
