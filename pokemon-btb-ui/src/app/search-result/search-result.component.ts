import { Component, Input } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent {
  @Input() pokemon!: Pokemon;
  pokemonArtFile!: string;

  ngOnInit() {
    this.pokemonArtFile = "/assets/pokemon-images/" + this.pokemon.name + ".png";
  }
}
