import { Component, Input } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-team-slot',
  templateUrl: './team-slot.component.html',
  styleUrls: ['./team-slot.component.sass']
})
export class TeamSlotComponent {
  @Input() pokemon!: Pokemon;
  pokemonArtFile!: string;

  ngOnInit() {
    this.pokemonArtFile = "/assets/pokemon-images/" + this.pokemon.name + ".png";
  }
}
