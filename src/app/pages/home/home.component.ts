import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';
import { CardsComponent } from './components/cards/cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchComponent, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
