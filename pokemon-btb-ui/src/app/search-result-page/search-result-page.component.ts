import { Component, ElementRef, EventEmitter, Input, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-search-result-page',
  templateUrl: './search-result-page.component.html',
  styleUrls: ['./search-result-page.component.sass']
})
export class SearchResultPageComponent {
  @Input() pokemon: Pokemon[] = [];
  @Input() page!: number;
  @Output() finishedPopulate: EventEmitter<boolean> = new EventEmitter();

  pokemonToDisplay: Pokemon[] = [];
  viewConstant: number = 14;
  rangeMin!: number;
  rangeMax!: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['page'] && this.pokemon.length > 0) {
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
