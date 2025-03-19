import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}
  private inputSearch = new BehaviorSubject<string>('');
  inputSearch$ = this.inputSearch.asObservable();

  private regionSearch = new BehaviorSubject<string>('');
  regionSearch$ = this.regionSearch.asObservable();

  updateInputSearch(search: string): void {
    this.inputSearch.next(search);
  }
  updateRegionSearch(region: string): void {
    this.regionSearch.next(region);
  }
}
