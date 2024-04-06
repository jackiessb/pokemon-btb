import { Component, ElementRef, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  @ViewChild('search') searchBar!: ElementRef<HTMLInputElement>;

  constructor(private pokemonSearch: PokemonService) {}

  ngAfterViewInit() {
    document.addEventListener("selectionchange", () => {
      this.query(this.searchBar.nativeElement.value);
    });
  }

  query(query: string) {
    if (query == "Search for a Pokemon here!" || query == "") {
      return;
    } else {
      this.pokemonSearch.getPokemonByQuery(query).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error: Error) => {
          throw new Error(error.message);
        }
      });
    }
  }
}
