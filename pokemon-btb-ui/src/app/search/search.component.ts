import { Component, ElementRef, EventEmitter, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from 'pokenode-ts';
import { SearchResultPageComponent } from '../search-result-page/search-result-page.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  @ViewChild('search') searchBar!: ElementRef<HTMLInputElement>;
  @ViewChild(SearchResultPageComponent) searchPage!: ElementRef<HTMLCollection>;

  queryString!: string;
  pokemon: Pokemon[] = [];
  page!: number;
  pagesToShowSequence!: number[];  
  viewConstant: number = 14;
  searchItemHeight: number = 63;

  constructor(private pokemonSearch: PokemonService) {}

  ngAfterViewInit() {
    document.addEventListener("keyup", () => {    
      this.queryString = this.searchBar.nativeElement.value;
      this.query();
    });
  }

  updatePaginationSequence() {
    let pagesToShow = Math.ceil(this.pokemon.length / this.viewConstant);

    // Add one so that the numbers are shown like normal.
    this.pagesToShowSequence = Array.from(Array(pagesToShow).keys()).map(x => x = x + 1);
  }

  updatePage(page: number) {
    if (this.page == page) {
      return
    } else {
      if (document.getElementsByTagName('app-search-result-page') != undefined) {
        // If we arrive here, this means that elements exist on the page.
        let entries = document.getElementsByClassName('pokemon-result');
  
        Array.from(entries).forEach(x => {
          x.remove();
        });
      }
  
      this.page = page; 
    }
  }

  catchFinishPopulate(finished: boolean) {
    console.log(finished);
  }

  checkSearchPageEntries() {
    if (this.searchPage.nativeElement == undefined) {
      this.page = 1;
    } else {
      // We would want to cover a few cases here:
      // - New entries show up from an API call
      // - A search query is completely removed (ie--the search bar is blank)
    }
  }

  query() {
    if (this.queryString == "Search for a Pokemon here!" || this.queryString == ""
      || this.queryString.length < 2
    ) {
      // Return empty array on the case that there is no good query
      this.pokemon = new Array<Pokemon>();
    } else {
      this.pokemonSearch.getPokemonByQuery(this.queryString).subscribe({
        next: (result) => {
          // Housekeeping
          this.checkSearchPageEntries();
          this.pokemon = result;

          // Update page details when query is done
          this.updatePaginationSequence();
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
