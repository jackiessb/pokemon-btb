import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent {
  @Output() clickedForTeam: EventEmitter<Pokemon> = new EventEmitter<Pokemon>()
  @Input() pokemon!: Pokemon;

  pokemonNameDisplay!: string;
  pokemonArtFile!: string;

  // Gonna leave this here JIK
  constructor(private pokemonElement: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.pokemonElement.nativeElement.addEventListener('mouseup', (event) => {
      this.clickedForTeam.emit(this.pokemon);
    })
  }

  ngOnInit() {
    // Replace pokemon first name with Captial letter and get rid of dashes
    let nameChar = this.pokemon.name;
    if (nameChar.includes('-')) {
      let newName = "";
      let pieces = nameChar.split('-');

      pieces.map(piece => {
        piece = piece.at(0)?.toLocaleUpperCase() + piece.slice(1);
        newName += piece + " ";
      });

      newName.trimEnd();
      this.pokemonNameDisplay = newName;
    } else {
      let capNameChar = nameChar.at(0)?.toLocaleUpperCase() + nameChar.slice(1);

      this.pokemonNameDisplay = capNameChar;
    }

    this.pokemonArtFile = "/assets/pokemon-images/" + this.pokemon.name + ".png";
  }
}
