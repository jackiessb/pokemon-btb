import { Component } from '@angular/core';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  teamMemberSelection!: Pokemon;
  ready: boolean = true;

  constructor(private pokemonService: PokemonService) {}

  ngAfterViewInit() {
    this.pokemonService.setupForQuery().subscribe({
      next: (value) => {
        this.ready = value;
      },
      error: () => {
        this.ready = false;
        throw new Error("Something went wrong on the API side");
      }
    });

    if (!this.ready) {
      throw new Error("The service is not ready! This is very bad!");
    }
  }

  setTeamMemberSelection(pokemon: Pokemon) {
    this.teamMemberSelection = pokemon;
  }
}
