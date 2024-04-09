import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Pokemon } from 'pokenode-ts';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.sass']
})
export class SearchResultPageComponent {
  @Input() pokemon: Pokemon[] = [];
  @Input() page!: number;
  @Input() viewConstant!: number;
  @Output() clickedForTeam: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  searchCompRef!: SearchComponent;
  pokemonToDisplay: Pokemon[] = [];
  rangeMin!: number;
  rangeMax!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page'] || changes['pokemon']) {
      this.pokemonToDisplay = [];

      this.calculateRange();
      this.populatePokemon();
    }
  }

  calculateRange() {
    this.rangeMax = this.page * this.viewConstant;
    this.rangeMin = this.rangeMax - this.viewConstant;

    if (this.rangeMax > this.pokemon.length) {
      this.rangeMax = this.pokemon.length;
    }
  }

  clickedForTeamCall(pokemon: Pokemon) {
    this.clickedForTeam.emit(pokemon);
  }

  populatePokemon() {
    while (this.rangeMin < this.rangeMax) {
      let mon = this.pokemon.at(this.rangeMin);

      if (mon != undefined) {
        this.pokemonToDisplay.push(mon);
      }

      this.rangeMin++;
    }
  }
}