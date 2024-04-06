import { Component } from '@angular/core';
import { Pokemon } from 'pokenode-ts';
import { PokemonService } from './services/pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  slots: Pokemon[] = [];
  ready: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.setupForQuery().subscribe({
      next: (value) => {
        this.ready = value;
      },
      error: () => {
        throw new Error("Something went wrong on the API side");
      }
    });

    if (!this.ready) {
      throw new Error("The service is not ready! This is very bad!");
    } else {
      console.log("Service is live and ready!");
    }
  }
}
