import { Component, ElementRef, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  @ViewChild('search') searchBar!: ElementRef<HTMLInputElement>;
  @ViewChild('searchPanel') searchArea!: ElementRef<HTMLElement>;

  isQuerying: boolean = false;
  queryString!: string;
  pokemon: Pokemon[] = [];

  pagesToShowSequence!: number[];
  viewConstant: number = 14;
  searchItemHeight: number = 63;

  constructor(private pokemonSearch: PokemonService) {}

  ngAfterViewInit() {
    document.addEventListener("selectionchange", () => {      
      this.queryString = this.searchBar.nativeElement.value;

      if (!this.isQuerying) {
        this.query();
      }
    });
  }

  updatePagination() {
    let pagesToShow = Math.ceil(this.pokemon.length / this.viewConstant);

    // Add one so that the numbers are shown like normal.
    this.pagesToShowSequence = Array.from(Array(pagesToShow).keys()).map(x => x = x + 1);
  }

  query() {
    this.isQuerying = true;

    if (this.queryString == "Search for a Pokemon here!" || this.queryString == ""
      || this.queryString.length < 2
    ) {
      // Return empty array on the case that there is no good query
      this.isQuerying = false;
      this.pokemon = new Array<Pokemon>();
    } else {
      this.pokemonSearch.getPokemonByQuery(this.queryString).subscribe({
        next: (result) => {
          this.isQuerying = false;

          this.pokemon = result;

          this.updatePagination();
        },
        error: (error: Error) => {
          throw new Error(error.message);
        }
      });

      // Return empty array on the case that something breaks
      this.pokemon = new Array<Pokemon>();
    }
  }
}
