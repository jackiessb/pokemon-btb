import { Component, ElementRef, EventEmitter, Output, SimpleChanges, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from 'pokenode-ts';
import { SearchResultPageComponent } from '../search-result-page/search-result-page.component';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  @ViewChild('search') searchBar!: ElementRef<HTMLInputElement>;

  queryString!: string;
  pokemon: Pokemon[] = [];
  page!: number;
  pagesToShowSequence!: number[];  
  viewConstant: number = 11; // How many Pokemon will be displayed each page.
  searchItemHeight: number = 63;

  constructor(private pokemonSearch: PokemonService) {}

  ngAfterViewInit() {
    this.searchBar.nativeElement.addEventListener("keyup", () => {    
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
      return;
    } else {  
      let currentEntries = this.getCurrentPageEntriesHTML();
      if (currentEntries != undefined) {
        this.removeCurrentPageEntries(currentEntries);
      }

      this.page = page;
    }
  }

  getCurrentPageEntriesHTML() {
    if (document.getElementsByTagName('app-search-result-page') != undefined) {
      // If we arrive here, this means that elements exist on the page.
      return Array.from(document.getElementsByClassName('pokemon-result'));
    } else {
      return;
    }
  }

  checkSearchPageEntries(newEntries: Pokemon[]) {
    let currentEntries = this.getCurrentPageEntriesHTML();

    if (currentEntries != undefined) {
      if (currentEntries.length == 0) {
        this.page = 1;
      }
    }

    if (this.pokemon.length != 0) {
      // If newEntries contain duplicates, prune them 
      // and add unique entries
    }
  }

  removeCurrentPageEntries(entries: globalThis.Element[]) {
    Array.from(entries).forEach(x => {
      x.remove();
    });
  }

  query() {
    if (this.queryString == "Search for a Pokemon here!" || this.queryString == ""
      || this.queryString.length < 2
    ) {
      // Return empty array on the case that there is no good query
      let currentEntries = this.getCurrentPageEntriesHTML();
      if (currentEntries != undefined) {
        this.removeCurrentPageEntries(currentEntries);
      }

      this.pokemon = new Array<Pokemon>();
      return;
    } else {
      this.pokemonSearch.getPokemonByQuery(this.queryString).subscribe({
        next: (result) => {
          // Housekeeping
          this.checkSearchPageEntries(result);
          this.pokemon = result;

          // Update page details when query is done
          this.updatePaginationSequence();

          return;
        },
        error: (error: Error) => {
          throw new Error(error.message);
        }
      });
    }
  }
}
