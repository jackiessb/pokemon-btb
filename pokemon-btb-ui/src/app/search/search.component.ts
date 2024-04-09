import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  @ViewChild('search') searchBar!: ElementRef<HTMLInputElement>;
  @Output() clickedForTeam: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();
  
  queryString!: string;
  queryStringLimit: number = 2; // This is mainly for dev purposes.
  page!: number;
  preivousPage!: number;
  isLoading: boolean = false;

  pokemon: Pokemon[] = [];
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

    if (pagesToShow > 12) {
      pagesToShow = 12; // The greatest we will show at a time is 12.
    }

    // Add one so that the numbers are shown like normal.
    this.pagesToShowSequence = Array.from(Array(pagesToShow).keys()).map(x => x = x + 1);
  }

  updatePage(page: number) {
    if (this.page == page) {
      return;
    } else {
      this.preivousPage = this.page;

      let currentEntries = this.getCurrentPageEntriesHTML();
      if (currentEntries != undefined) {
        this.removeCurrentPageEntries(currentEntries);
      }

      this.page = page;

      this.updatePageNavButton();
    }
  }
  
  updatePageNavButton() {
    let previousPage = 'page' + this.preivousPage;
    let pageToFind = 'page' + this.page;
    let pageNavButton = document.getElementById(pageToFind);
    let prevPageNavButton = document.getElementById(previousPage);

    if (pageNavButton != undefined && prevPageNavButton != undefined) {
      pageNavButton.className += "page-item active";
      prevPageNavButton.className = "page-item"
    }
  }

  getCurrentPageEntriesHTML() {
    if (document.getElementsByTagName('app-search-result-page') != undefined) {
      return Array.from(document.getElementsByClassName('pokemon-result'));
    } else {
      return;
    }
  }

  checkSearchPageEntries() {
    let currentEntries = this.getCurrentPageEntriesHTML();

    if (currentEntries != undefined) {
      if (currentEntries.length == 0) {
        this.page = 1;
      }
    }
  }

  removeCurrentPageEntries(entries: globalThis.Element[]) {
    Array.from(entries).forEach(x => {
      x.remove();
    });
  }

  clickedForTeamCall(pokemon: Pokemon) {
    this.clickedForTeam.emit(pokemon);
  }

  query() {
    this.isLoading = true;

    if (this.queryString == "Search for a Pokemon here!" || this.queryString == ""
      || this.queryString.length < this.queryStringLimit
    ) {

      let currentEntries = this.getCurrentPageEntriesHTML();
      if (currentEntries != undefined) {
        this.removeCurrentPageEntries(currentEntries);
      }

      this.pokemon = new Array<Pokemon>();
      this.isLoading = false;

      return;
    } else {
      this.pokemonSearch.getPokemonByQuery(this.queryString).subscribe({
        next: (result) => {
          this.isLoading = false;
          this.checkSearchPageEntries();
          this.pokemon = result;

          this.updatePaginationSequence();

          return;
        },
        error: (error: Error) => {
          this.isLoading = false;
          throw new Error(error.message);
        }
      });
    }
  }
}
