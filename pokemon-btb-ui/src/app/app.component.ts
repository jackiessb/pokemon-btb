import { Component, ElementRef, ViewChild } from '@angular/core';
import { PokemonQueryService } from './services/pokemon-query.service';
import { Pokemon } from 'pokenode-ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  slots: Pokemon[] = [];

  constructor(private pokemonQueryService: PokemonQueryService) {}

  ngOnInit() {
    this.setPokemonDebug();
  }

  setPokemonDebug() {
    for (let amount = 1; amount < 7; amount++) {
      this.pokemonQueryService.getPokemonByID(amount).subscribe({
        next: (pokemon) => {
          this.slots.push(pokemon);
        },
        error: () => {
          throw new Error("Something happened while calling the PokemonQueryService!");
        }
      })
    }
  }
}
