import { Component, Input } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.sass']
})
export class SearchResultPageComponent {
  @Input() pokemon: Pokemon[] = [];
  @Input() page!: number;

  viewConstant: number = 14;
  pokemonToDisplay: Pokemon[] = [];

  ngAfterViewInit() {
    this.calculateRangeAndPokemon();

    console.log(this.pokemonToDisplay);
  }

  calculateRangeAndPokemon() {
    let rangeMax = this.page * this.viewConstant;
    let rangeMin = rangeMax - this.viewConstant;

    if (rangeMax > this.pokemon.length) {
      rangeMax = this.pokemon.length;
    }

    while (rangeMin < rangeMax) {
      let mon = this.pokemon.at(rangeMin);

      if (mon != undefined) {
        this.pokemonToDisplay.push(mon);
      }

      rangeMin++;
    }
  }
}
