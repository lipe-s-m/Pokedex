import { Component, Input } from '@angular/core';
import { SearchService } from '../../../../services/search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css', './search.component.responsive.css'],
})
export class SearchComponent {
    @Input()
    public inputSearch: string = '';

    constructor(private searchService: SearchService) {}

    public obterPokemon(): void {
        this.searchService.updateInputSearch(this.inputSearch);
        alert('Pokemon Adicionado na Pokedéx!');
    }
    public getPokemonFromRegion(region: string) {
        this.searchService.updateRegionSearch(region);
    }
}
